import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export let GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  let [searchParam, setSearchParam] = useState("");
  let [loading, setLoading] = useState(false);
  let [recipeList, setRecipeList] = useState([]);
  let [recipeDetailsData, setRecipeDetailsData] = useState([]);
  let [favoritesList, setFavoritesList] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoritesList");
    if (storedFavorites) {
      setFavoritesList(JSON.parse(storedFavorites));
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      let res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      let data = await res.json();
      if (data.data.recipes) {
        setRecipeList(data.data.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorites(getCurrentItem) {
    let cpyFavoritesList = [...favoritesList];
    let index = cpyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList.splice(index, 1);
    }
    setFavoritesList(cpyFavoritesList);
    localStorage.setItem("favoritesList", JSON.stringify(cpyFavoritesList));
  }

  console.log(favoritesList);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        setFavoritesList,
        handleAddToFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
