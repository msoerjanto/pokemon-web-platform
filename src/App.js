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
      caught: [],
      menu: false
    };
    this.routerRef = React.createRef();
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu })
  }

  render() {
    const show = (this.state.menu) ? "show" : "";
    console.log('render with', this.state.menu);
    return (
      <Context.Provider value={{
        ...this.state
      }}>
        <Router ref={this.routerRef}>
          <div className="App">
            <header>
              <NavBar/>
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
