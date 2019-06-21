import { observable, action, computed, toJS } from "mobx";
import axios from "axios";

class Store {
  @observable pokemons = null;

  getPokemons = () => {
    axios.get("http://localhost:3000/test").then(res => {
      this.pokemons = res.data;
    });
  };
}

export default Store;
