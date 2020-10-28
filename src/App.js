import React,{useEffect, useState} from 'react';
import Recipe from './Recipe.js';
import './App.css';

const App =()=> {
  const APP_ID ="0450ebac";
  const APP_KEY="495bdc3e155786abafcb79fc8517da58";

  const [recipes, setRecipes] =useState([]);
  const [search, setSearch] =useState('');
  const [query, setQuery] =useState('chicken');

  
  useEffect(()=>{
    getRecipes();
  },[query])

  const getRecipes =async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data =await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');

  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" value ={search} type="text" onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search Recipe
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe=>(
        <Recipe
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
         
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
      
    </div>
  )
}

export default App;
