import { useState, useEffect  } from "react";
import './RecipeList.css';
import RecipeCard from "../RecipeCard/RecipeCard";
import Modal from "../Modal/Modal";





const RecipeList = () =>{
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [pickedRecipe, setPickedRecipe] = useState(null);
    const [sortBy, setSortBy] = useState('Popular');
    const [search, setSearch] = useState("");
    const [url, setUrl] = useState('')



    useEffect(() => {
        const getPopular = async () => {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${import.meta.env.VITE_API_KEY}`);
            const result = await api.json();
            setPopular(result.recipes);
        };

        getPopular();
    },);

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
