import { observable, action, computed, toJS } from "mobx";
import axios from "axios";

class Store {
  @observable pokemons = null;

  getPokemons = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?&limit=809").then(res => {
      this.pokemons = res.data.results;
    });
  };
}

export default Store;
