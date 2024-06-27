import './RecipeCard.css'
import React, { useState } from "react";
import filler_img from '../assets/placeholder_img.jpeg'

const RecipeCard = (props) => {
    const [isFav, setIsFav] = useState(false);

    return (

        <div className="recipe-card" onClick={props.handleClickFunc}>
            <section>
                <img className ="image" src= {filler_img} />
                <h2 className = "recipeName" > Recipe Name </h2>
                <div className='UnderName'>
                <h3 className= "serving"> Servings: </h3>
                <div className= "fav_recipe">
                    <a className= "favorite_icon" onClick={(e) => {
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
    )

}

export default RecipeCard;
