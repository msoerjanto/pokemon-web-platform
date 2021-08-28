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
    this.setState({pokecaught: caught});
  }


  render() {
    return (
      <Context.Provider value={{
        ...this.state,
        catchPokemon: this.catchPokemon
      }}>
        <Router ref={this.routerRef}>
          <div className="App">
            <header>
              <NavBar />
            </header>
            <Switch>
              <Route exact path="/" component={PokemonListPage} />
              <Route exact path="/mypokemons" component={MyPokemonsPage} />
              <Route exact path="/pokemons" component={PokemonListPage} />
              <Route path="/pokemons/:name" component={PokemonDetailsPage} />
            </Switch>
          </div>
        </Router>
      </Context.Provider >
    );
  }
}

export default App;
