import { useState, useEffect  } from "react";
import './RecipeList.css';
import RecipeCard from "../RecipeCard/RecipeCard";
import Modal from "../Modal/Modal";
import missingImage from "../assets/placeholder_img.jpeg";

const RecipeList = () =>{
    const [popular, setPopular] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [pickedRecipe, setPickedRecipe] = useState(null);
    const [sortBy, setSortBy] = useState('Popular');
    const [search, setSearch] = useState("");
    const [url, setUrl] = useState('')
    const [offset, setOffset] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


        const fetchRecipes = async (offsetValue) => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=60&apiKey=${import.meta.env.VITE_API_KEY}`) ;
                if (!response.ok) {
                    throw new Error('Failed to get recipes');
                }
                const data = await response.json();
                return data.recipes;

            } catch (error) {
                console.error('Error fetching recipes:', error.message);
                return [];
            }
        };

    useEffect(() => {
        const loadInitialRecipes = async () => {
        const initialRecipes = await fetchRecipes(0);
        setPopular(initialRecipes);
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
        const newOffset = offset + 60;
        const newRecipes = await fetchRecipes(newOffset);
        setPopular(prevRecipes => [...prevRecipes, ...newRecipes]);
        setOffset(newOffset);
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
                {popular.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
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
