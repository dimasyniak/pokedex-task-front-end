import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Layout, Table } from "antd";
import axios from "axios";
const { Header, Content } = Layout;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?&limit=809").then(res => {
      setPokemons(res.data.results);
    });
  }, []);

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      width: 0,
      sorter: (a, b) => a.number - b.number
    },
    {
      title: "Picture",
      dataIndex: "img",
      width: 0
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 0,
      filters: [
        {
          text: "Joe",
          value: "Joe"
        },
        {
          text: "John",
          value: "John"
        }
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0
    },
    {
      title: "Total",
      dataIndex: "total",
      width: 0,
      sorter: (a, b) => a.total - b.total
    },
    {
      title: "Speed",
      dataIndex: "speed",
      width: 0,
      sorter: (a, b) => a.speed - b.speed
    },
    {
      title: "Sp. Defense",
      dataIndex: "spDefense",
      width: 0,
      sorter: (a, b) => a.spDefense - b.spDefense
    },
    {
      title: "Sp. Attack",
      dataIndex: "spAttack",
      width: 0,
      sorter: (a, b) => a.spAttack - b.spAttack
    },
    {
      title: "Defense",
      dataIndex: "defense",
      width: 0,
      sorter: (a, b) => a.defense - b.defense
    },
    {
      title: "Attack",
      dataIndex: "attack",
      width: 0,
      sorter: (a, b) => a.attack - b.attack
    },
    {
      title: "HP",
      dataIndex: "hp",
      width: 0,
      sorter: (a, b) => a.hp - b.hp
    }
  ];

  const gelAllData = poke => {
    let data;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
      .then(res => {
        let total = 0;
        res.data.stats.map(item => {
          total += item.base_stat;
        });
        data = {
          key: res.data.name,
          name: res.data.name.toUpperCase(),
          img: (
            <img
              src={
                "https://img.pokemondb.net/sprites/sun-moon/icon/" +
                res.data.name +
                ".png"
              }
              alt={res.data.name}
            />
          ),
          total: total,
          speed: res.data.stats[0].base_stat,
          number: res.data.id,
          spDefense: res.data.stats[1].base_stat,
          spAttack: res.data.stats[2].base_stat,
          defense: res.data.stats[3].base_stat,
          attack: res.data.stats[4].base_stat,
          hp: res.data.stats[5].base_stat
        };
        pokemonsData.push(data);
        setPokemonsData([...pokemonsData]);
      })
      .catch(error => {
        console.log(error);
      });
  };
  /*function gelAllData(status) {
    console.log(status);
    let data;
    status.results.map(item => {
      axios.get(item.url).then(res => {
        let total = 0;
        res.data.stats.map(item => {
          total += item.base_stat;
        });
        data = {
          key: item.name,
          name: item.name.toUpperCase(),
          img: (
            <img
              src={
                "https://img.pokemondb.net/sprites/sun-moon/icon/" +
                item.name +
                ".png"
              }
              alt={item.name}
            />
          ),
          total: total,
          speed: res.data.stats[0].base_stat,
          spDefense: res.data.stats[1].base_stat,
          spAttack: res.data.stats[2].base_stat,
          defense: res.data.stats[3].base_stat,
          attack: res.data.stats[4].base_stat,
          hp: res.data.stats[5].base_stat
        };
        pokemonsData.push(data);
        setPokemonsData([...pokemonsData]);
      });
    });
  }*/

  const test = () => {
    pokemons.map(item => {
      gelAllData(item.name);
    });
  };
  let data;
  let loading = true;
  if (pokemonsData.length === pokemons.length) {
    data = pokemonsData;
    loading = false;
  }
  return (
    <div>
      <Layout>
        <Header
          style={{
            color: "#fff"
          }}
        >
          Pokedex
        </Header>
        <Content style={{ padding: "20px 50px" }}>
          <button onClick={() => gelAllData("bulbasaur")}>Go</button>
          <button onClick={test}>Test</button>
          <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 20 }}
          />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
