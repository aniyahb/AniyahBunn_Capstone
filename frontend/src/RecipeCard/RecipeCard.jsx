import './RecipeCard.css'
import React, { useState } from "react";


const RecipeCard = (props) => {
const [isFav, setIsFav] = useState(false);

const key = props.id
const handleClick = () => {
    props.handlePickedRecipe(props.id);
    props. setModalOpen(true);
};


    return (
        <div className="recipeCard" onClick={handleClick}>
            <div className='recipeContent'>
            <section>
                <img className ="image" src= {props.image} />
                <h2 className = "recipeName" > {props.title}</h2>
                <div className='underName'>
                <h3 className= "cuisine"> Cuisines:</h3>


                <div className= "favRecipe">
                    <a className= "favoriteIcon" onClick={(e) => {
                            e.stopPropagation();
                            setIsFav(!isFav);
                            }}>
                        {isFav ?
                            <i className="fa-solid fa-heart"></i> :
                            <i className="fa-regular fa-heart"></i>
                    }
                    </a>

                </div>
                </div>
            </section>
            </div>
        </div>
    )
}
export default RecipeCard;
