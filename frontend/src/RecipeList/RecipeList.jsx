import { useState, useEffect  } from "react";
import './RecipeList.css';
import RecipeCard from "../RecipeCard/RecipeCard";
import Modal from "../Modal/Modal";
import missingImage from "../assets/placeholder_img.jpeg";

const RecipeList = () =>{
    const [popular, setPopular] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [pickedRecipe, setPickedRecipe] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [page, setPage] = useState(1);


    const MAX_RECIPES = 419;
    const fetchRecipes = async (pageNumber) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?number=60&apiKey=${import.meta.env.VITE_API_KEY}`);
            if (!response.ok) {
                throw new Error('Failed to get recipes');
            }
            const data = await response.json();
            saveToLocalStorage(data.recipes);
            return data.recipes;
            } catch (error) {
            console.error('Error fetching recipes:', error.message);
            return [];
            }
        };

        const saveToLocalStorage = (recipes) => {
            const existingRecipes = JSON.parse(localStorage.getItem('allRecipes') || '[]');
            const updatedRecipes = [...existingRecipes, ...recipes];
            const trimmedRecipes = updatedRecipes.slice(-MAX_RECIPES);
            try {
                localStorage.setItem('allRecipes', JSON.stringify(trimmedRecipes));
                } catch (e) {
                console.error('localStorage is full, clearing all recipes');
                localStorage.removeItem('allRecipes');
                localStorage.setItem('allRecipes', JSON.stringify(recipes));
                }
            };
            useEffect(() => {
                const loadInitialRecipes = async () => {
                    const storedRecipes = JSON.parse(localStorage.getItem('allRecipes') || '[]');
                    if (storedRecipes.length > 0) {
                        setPopular(storedRecipes);
                    } else {
                        const initialRecipes = await fetchRecipes(1);
                        setPopular(initialRecipes);
                    }
                    };
                    loadInitialRecipes();
                    checkAuthStatus();
                }, []);

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    };


    const handleAuthError = (message) => {
        console.log(message);
    };

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        const newRecipes = await fetchRecipes(nextPage);
        setPopular(prevRecipes => {
            const uniqueRecipes = [...prevRecipes, ...newRecipes].filter(
                (recipe, index, self) =>
                index === self.findIndex((t) => t.id === recipe.id)
                );
                return uniqueRecipes.slice(-MAX_RECIPES);
            });
            setPage(nextPage);
            };


    const handlePickedRecipe = (id) => {
        const recipe = popular.find(recipe => recipe.id === id);
        setPickedRecipe(recipe);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenModal = (recipe) => {
        setModalOpen(!modalOpen)
        setPickedRecipe(recipe)
    }

        return (

            <>
        {modalOpen && pickedRecipe && <Modal showModal={handleOpenModal} pickedRecipe={pickedRecipe} closeModal={handleCloseModal}/>}
            <div className="recipe-list">
                {popular.map((recipe,index) => (
                    <RecipeCard
                        key={`${recipe.id}-${index}`}
                        recipeId={recipe.id}
                        id={recipe.spoonacularId}
                        setPickedRecipe={setPickedRecipe}
                        title={recipe.title}
                        image={recipe.image || missingImage}
                        cuisines={recipe.cuisines}
                        handlePickedRecipe={() => handlePickedRecipe(recipe.id)}
                        setModalOpen={setModalOpen}
                        isAuthenticated={isAuthenticated}
                        onAuthError={handleAuthError}
                    />
                    ))}

            </div>
            <button onClick={handleLoadMore} className="loadMoreButton">More Meals</button>

            </>
        );


}
export default RecipeList;
