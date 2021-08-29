import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Context from "./Context";
import PokemonListPage from "../src/pages/PokemonListPage";
import MyPokemonsPage from "../src/pages/MyPokemonsPage";
import NavBar from "./components/NavBar";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokecaught: [],
    };
    this.routerRef = React.createRef();
  }

  componentDidMount() {
    let pokecaught = localStorage.getItem("pokecaught");
    pokecaught = pokecaught ? JSON.parse(pokecaught) : [];
    this.setState({ pokecaught });
  }

  catchPokemon = (pokemon) => {
    let caught = this.state.pokecaught;
    caught.push(pokemon);
    localStorage.setItem("pokecaught", JSON.stringify(caught));
    this.setState({ pokecaught: caught });
  }

  releasePokemon = (name) => {
    let caught = this.state.pokecaught;
    const filtered = caught.filter(poke => poke.nickname != name);
    localStorage.setItem("pokecaught", JSON.stringify(filtered));
    this.setState({ pokecaught: filtered });
  }


  render() {
    return (
      <Context.Provider value={{
        ...this.state,
        catchPokemon: this.catchPokemon,
        releasePokemon: this.releasePokemon
      }}>
        <Router ref={this.routerRef}>
          <div className="App">
            <header>
              <NavBar />
            </header>
            <div className="d-flex justify-content-center">
              <Switch>
                <Route exact path="/" component={PokemonListPage} />
                <Route exact path="/mypokemons" component={MyPokemonsPage} />
                <Route exact path="/pokemons" component={PokemonListPage} />
                <Route path="/pokemons/:name" component={PokemonDetailsPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </Context.Provider >
    );
  }
}

export default App;
