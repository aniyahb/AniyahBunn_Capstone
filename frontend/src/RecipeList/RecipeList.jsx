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

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=60&apiKey=${import.meta.env.VITE_API_KEY}`) ;
                if (!response.ok) {
                    throw new Error('Failed to get recipes');
                }
                const data = await response.json();
                setPopular(data.recipes);

            } catch (error) {
                console.error('Error fetching recipes:', error.message);
            }
        };

        fetchRecipes();
    }, []);


    const handlePickedRecipe = (id) => {
        const recipe = popular.find(recipe => recipe.id === id);
        setPickedRecipe(recipe);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(modalOpen);
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
                    />
                    ))}

            </div>
            </>
        );


}
export default RecipeList;
