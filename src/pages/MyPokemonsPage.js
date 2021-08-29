import React from "react";
import withContext from "../withContext";

function MyPokemonsPage(props) {
  console.log(props.context.pokecaught);
  return <>My Pokemons Page</>
}

export default withContext(MyPokemonsPage);