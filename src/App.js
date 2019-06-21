import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Pagination,
  Card,
  Icon,
  Avatar,
  Menu,
  Dropdown,
  Progress,
  Tag,
  Spin,
  Select
} from "antd";
import axios from "axios";

import CardContainer from "./Components/CardContainer/CardContainer";

const { Header, Content } = Layout;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [elements, setElements] = useState(10);
  const [pagination, setPagination] = useState(1);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    paginationHandler();
  }, []);

  let colors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dark: "#705848",
    dragon: "#7038F8",
    steel: "#B8B8D0",
    fairy: "#F0B6BC"
  };

  const getTypeColor = name => colors[name];

  const paginationHandler = () => {
    let offset;
    if (pagination === 1) {
      offset = 1;
    } else {
      offset = (pagination - 1) * elements + 1;
    }
    axios
      .post("http://localhost:3000/all", {
        limit: elements - 1,
        offset: offset
      })
      .then(function(response) {
        setPokemons([...response.data]);
        setReload(false);
      })
      .catch(function(error) {
        setReload(false);
      });
  };

  const onChange = page => {
    setPagination(page);
    setReload(true);
  };

  const { Meta } = Card;

  const onClick = ({ key }) => {
    setElements(key);
    setReload(true);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="10">10 on page</Menu.Item>
      <Menu.Item key="20">20 on page</Menu.Item>
      <Menu.Item key="50">50 on page</Menu.Item>
    </Menu>
  );

  let cards = [];

  if (reload) {
    paginationHandler();
  }

  if (pokemons.length > 0) {
    pokemons.map(item => {
      let total = 0;
      item.stats.map(statItem => {
        total += statItem.base_stat;
      });
      let types = [];
      item.types.map(typeItem => {
        let color;
        color = getTypeColor(typeItem.type.name);
        types.push(
          <Tag key={item.name + typeItem.type.name} color={color}>
            {typeItem.type.name.toUpperCase()}
          </Tag>
        );
      });
      let description = (
        <div>
          <span>HP</span>
          <Progress
            percent={(item.stats[5].base_stat * 100) / 255}
            showInfo={false}
          />
          <span>Speed</span>
          <Progress
            percent={(item.stats[0].base_stat * 100) / 180}
            showInfo={false}
          />
          <span>Defense</span>
          <Progress
            percent={(item.stats[3].base_stat * 100) / 230}
            showInfo={false}
          />
          <span>Attack</span>
          <Progress
            percent={(item.stats[4].base_stat * 100) / 190}
            showInfo={false}
          />
          <span>Sp. Defense</span>
          <Progress
            percent={(item.stats[1].base_stat * 100) / 230}
            showInfo={false}
          />
          <span>Sp. Attack</span>
          <Progress
            percent={(item.stats[2].base_stat * 100) / 194}
            showInfo={false}
          />
          <span>Total</span>
          <Progress percent={(total * 100) / 780} showInfo={false} />
          {types}
        </div>
      );
      cards.push(
        <Card key={item.name} loading={loading}>
          <Meta
            avatar={
              <Avatar
                src={
                  "https://img.pokemondb.net/sprites/sun-moon/icon/" +
                  item.name +
                  ".png"
                }
              />
            }
            title={item.name.toUpperCase()}
            description={description}
          />
        </Card>
      );
    });
  }

  const test = () => {
    let offset;
    if (pagination === 1) {
      offset = 0;
    } else {
      offset = pagination * elements + 1;
    }
    let limit = elements;

    let types = { types: selectedItems, limit: limit, offset: offset };
    console.log(types);
    axios
      .post("http://localhost:3000/types", types)
      .then(function(response) {
        console.log(response.data);
        //setPokemons([...response.data]);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const handleChange = selectedItems => {
    setSelectedItems([...selectedItems]);
    console.log(selectedItems);
    test();
  };
  const OPTIONS = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy"
  ];
  const selectedItemsS = selectedItems;
  const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

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
          <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedItemsS}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {filteredOptions.map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          <button onClick={test}>Test</button>
          <Pagination
            defaultCurrent={1}
            total={(808 / elements) * 10}
            onChange={onChange}
          />
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              {elements} on page <Icon type="down" />
            </a>
          </Dropdown>
          <Spin spinning={reload}>
            <CardContainer>{cards}</CardContainer>
          </Spin>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
