import React from "react";
import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import missingImage from "../assets/placeholder_img.jpeg"
import SearchedModal from "../SearchedModal/SearchedModal";
import MainHeader from "../MainHeader/MainHeader";

function SearchedPage(props){
    const [searchedRecipes, setSearchedRecipes] = useState ([])
    const [pickedRecipe, setPickedRecipe] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [ingredientsById, setIngredientsById] = useState([])
    const [instructionsById, setInstructionsById] = useState([])
    const [pickedIngredients, setPickedIngredients] = useState ([])
    const [pickedInstructions, setPickedInstructions] = useState([])



    useEffect(() => {
        const getSearched= async (input) => {
            try {
                console.log(input)
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input}&apiKey=${import.meta.env.VITE_API_KEY}`) ;
                if (!response.ok) {
                    throw new Error('Failed to search recipes');
                }
                const data = await response.json();
                console.log(data)
                setSearchedRecipes(data.results);
            } catch (error) {
                console.error('Error fetching searched recipes:', error.message);
            }
        };

        getSearched(props.query);
    }, [props.query]);

    const handlePickedRecipe = (id) => {
        const recipe = searchedRecipes.find(recipe => recipe.id === id);
        setPickedRecipe(recipe);
        console.log(recipe)

        console.log(ingredientsById)
        getIngredientsById(recipe.id)
        getInstructionsById(recipe.id)
        setModalOpen(!modalOpen)
        // const ingredients = ingredientsById.find(ingredients => ingredients.id === recipe.id)
        // setPickedIngredients(ingredients)
        // console.log(ingredients)

        // const instructions = instructionsById.find(instructions => instructionsById === recipe.id)
        // setPickedInstructions(instructions)


        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleOpenModal = (recipe) => {
        setPickedRecipe(recipe)
        console.log(recipe)
        // getIngredientsById(recipe.id)
        // getInstructionsById(recipe.id)
        // setModalOpen(!modalOpen)

    }

    const getIngredientsById = async (id) =>{
        try {
            const ingredients = await fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${import.meta.env.VITE_API_KEY}`) ;
            if (!ingredients.ok) {
                throw new Error('Failed to fetch ingredients');
            }
            const data = await ingredients.json();
            console.log(data)
            setIngredientsById(data.results);
        }catch (error){
            console.error('Error fetching ingredients:', error.message);
        }
    }

    const getInstructionsById = async (id) => {
        try {
            const instructions = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${import.meta.env.VITE_API_KEY}`) ;
            if (!instructions.ok) {
                throw new Error('Failed to fetch instructions');
            }
            const data = await instructions.json();
            console.log(data)
            setInstructionsById(data.results);
        }catch (error){
            console.error('Error fetching instructions:', error.message);
    }
}

    return(

        <>

        {modalOpen && pickedRecipe && <SearchedModal showModal={() => handleOpenModal(pickedRecipe)} pickedRecipe={pickedRecipe} closeModal={handleCloseModal} ingredients={pickedIngredients} instructions={pickedInstructions}/>}
            <div className="recipe-list">
                { searchedRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        setPickedRecipe={setPickedRecipe}
                        title={recipe.title}
                        image={recipe.image || missingImage}
                        cuisines={recipe.cuisines}
                        handlePickedRecipe={() => handlePickedRecipe(recipe.id)}
                        setModalOpen={setModalOpen}
                        pickedIngredients = {pickedIngredients}
                        pickedInstructions = {pickedInstructions}
                    />
                    ))}
            </div>
            </>
    )
}
export default SearchedPage;
