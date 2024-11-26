import React, { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

function Details() {
  let { id } = useParams();
  let {
    recipeDetailsData,
    favoritesList,
    setRecipeDetailsData,
    handleAddToFavorites,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      let res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );

      let data = await res.json();
      console.log(data);
      if (data.data.recipe) {
        setRecipeDetailsData(data.data.recipe);
      }
    }
    getRecipeDetails();
  }, []);

  
  return (
    <div
      className="container mx-auto py-10
     grid grid-cols-1 lg:grid-cols-2 gap-10"
    >
      <div className="row-start-2 lg:row-start-auto">
        <div
          className="h-96 overflow-hidden 
          rounded-xl group"
        >
          <img
            className="w-full h-full object-cover block
             group-hover:scale-105 duration-300"
            src={recipeDetailsData.image_url}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span
          className="text-sm text-cyan-700 
        font-medium"
        >
          {recipeDetailsData.publisher}
        </span>

        <h3
          className="font-bold text-2xl truncate
          text-black "
        >
          {recipeDetailsData.title}
        </h3>

        <div>
          <button
            onClick={() => handleAddToFavorites(recipeDetailsData)}
            className="p-3 px-8 rounded-lg
          text-sm uppercase font-medium
           tracking-wider mt-3 text-white
            inline-block shadow-md bg-black"
          >
            {favoritesList &&
            favoritesList.length > 0
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>

        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData.ingredients?.map((ingredient) => (
              <li>
                <span className="text-2xl font-semibold text-black">
                {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-2xl font-semibold text-black">
                {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Details;
