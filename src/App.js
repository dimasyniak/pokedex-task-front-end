import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Table,
  Pagination,
  Skeleton,
  Switch,
  Card,
  Icon,
  Avatar,
  Col,
  Row
} from "antd";
import axios from "axios";

import CardContainer from "./Components/CardContainer/CardContainer";

const { Header, Content } = Layout;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

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

  const testTest = () => {
    axios
      .post("http://localhost:3000/test", {
        id: "50",
        offset: "50"
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
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

  const fetch = (params = {}) => {
    console.log("params:", params);
    setLoading(true);
    axios
      .post("http://localhost:3000/test", {
        id: params.page * 20,
        offset: "50"
      })
      .then(data => {
        //const pagination = { ...pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        setPagination({ total: 200 });
        setLoading(false);
        setData(data.data);
        console.log(data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const onChange = page => {
    console.log(page);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    /*const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination({ pagination: pager });
    fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });*/
    console.log(pagination.current);
  };
  const { Meta } = Card;
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
          <button onClick={() => setLoading(!loading)}>Test2</button>
          <CardContainer>
            <div>
              <Card loading={loading}>
                <Meta
                  avatar={
                    <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </div>

            <Card loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://img.pokemondb.net/sprites/sun-moon/icon/bulbasaur.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </CardContainer>

          <Pagination defaultCurrent={1} total={50} onChange={onChange} />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
