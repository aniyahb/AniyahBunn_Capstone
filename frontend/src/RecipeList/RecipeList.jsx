import { useState, useEffect  } from "react";
import './RecipeList.css';
import RecipeCard from "../RecipeCard/RecipeCard";
import Modal from "../Modal/Modal";

const RecipeList = () =>{
    const [popular, setPopular] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [pickedRecipe, setPickedRecipe] = useState(null);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('Popular');
    const [search, setSearch] = useState("");2
    const [url, setUrl] = useState('')

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:2500');
                if (!response.ok) {
                    throw new Error('Failed to get recipes');
                }
                const data = await response.json();
                setPopular(data);
            } catch (error) {
                console.error('Error fetching recipes:', error.message);
            }
        };

        fetchRecipes();
    }, []);

    const handlePickedRecipe = (recipe) => {
        setPickedRecipe(recipe);
        setModalOpen(true);
    };

    function renderRecipeCard(recipe,idex){

        return (
            <div className="recipe-list">
                {popular.map((recipe, index) => (
                    <RecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    cuisine={recipe.cuisine}
                    handlePickedRecipe={() => handlePickedRecipe(recipe)}
                    />
                    ))}
            {modalOpen && <Modal recipe={pickedRecipe} closeModal={() => setModalOpen(false)} />}
            </div>
        );

    }

        return(
            <div className="recipeList">
                {
                popular.map(renderRecipeCard)
                }
            </div>
        )
}
export default RecipeList;
