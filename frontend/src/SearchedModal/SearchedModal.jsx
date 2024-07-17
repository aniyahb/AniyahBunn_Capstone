import React from "react";
import './SearchedModal.css';
import missingImage from "../assets/placeholder_img.jpeg";

const SearchedModal = (props) => {
    const { pickedRecipe, closeModal, ingredients, instructions} = props;

    return(
        <div className="modal-overlay" >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-button" onClick={closeModal}> X </button>
            <h1 className="recipeTitle">{pickedRecipe?.title} </h1>
            <img className ="recipeImage" src={pickedRecipe?.image || missingImage}/>
            <div className="recipeDetails">
                <h3 className="Ingredients"> Ingredients: </h3>
                <ul>
            {ingredients?.ingredients?.map((ingredients, index) => (
                <li key={index}>
                    {ingredients?.name}
                </li>
            ))}
        </ul>
                <h3 className="Instructions">Instructions:</h3>
                {instructions?.map((instructionSet, setIndex) => (
                        <div key={setIndex}>
                            <ol>
                                {instructionSet.steps.map((step, stepIndex) => (
                                    <li key={stepIndex}>{step.step}</li>
                                ))}
                            </ol>
                        </div>
                    ))}
            </div>
        </div>
    </div>
    )
}
export default SearchedModal;
