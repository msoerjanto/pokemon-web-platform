import React from "react";
import MyPokeCard from "../components/MyPokeCard";
import PokemonCardContainer from "../components/PokemonCardContainer";
import withContext from "../withContext";

function MyPokemonsPage(props) {
  console.log(props.context.pokecaught);  
  
  return <>
    <div className="d-flex flex-column align-items-center">
      <h1>
        My Pokemon Page
      </h1>
      <PokemonCardContainer className="d-flex flex-wrap col-md-8">
        {props.context.pokecaught.map(pokemon => <MyPokeCard key={pokemon.nickname} name={pokemon.nickname} image={pokemon.image} owned release={props.context.releasePokemon} />)}
      </PokemonCardContainer>
    </div>
  </>
}

export default withContext(MyPokemonsPage);