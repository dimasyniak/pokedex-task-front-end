import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Layout,
  Pagination,
  Card,
  Icon,
  Menu,
  Dropdown,
  Spin,
  Select,
  Input,
  Drawer,
  Empty
} from "antd";
import axios from "axios";

import CardContainer from "./Components/CardContainer/CardContainer";
import PokemonCard from "./Components/PokemonCard/PokemonCard";

const { Header, Content } = Layout;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [elements, setElements] = useState(10);
  const [pagination, setPagination] = useState(1);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchByType, setSearchByType] = useState(false);
  const [total, setTotal] = useState(808);
  const [searchByTypeConfirm, setSearchByTypeConfirm] = useState(true);
  const [visible, setVisible] = useState(false);
  const [searchCard, setSeacrhCard] = useState(Empty);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    setReload(true);
    paginationHandler();
  }, []);

  const paginationHandler = () => {
    let offset;
    if (pagination === 1) {
      offset = 1;
    } else {
      offset = (pagination - 1) * elements + 1;
    }
    axios
      .post("https://pokedex-serv.herokuapp.com/all", {
        limit: elements - 1,
        offset: offset
      })
      .then(function(response) {
        setPokemons([...response.data]);
        setReload(false);
        setLoading(false);
      })
      .catch(function(error) {
        setReload(false);
        setLoading(false);
      });
  };

  const allPokeHandler = page => {
    setPagination(page);
    setReload(true);
    setLoading(true);
  };

  const setSearchByTypeHandler = page => {
    setPagination(page);
    setSearchByType(true);
    setSearchByTypeConfirm(true);
    setLoading(true);
  };

  const { Meta } = Card;

  const onClickPage = ({ key }) => {
    setElements(key);
    setReload(true);
    setLoading(true);
  };

  const onClickPageSearchByType = ({ key }) => {
    setElements(key);
    setSearchByType(true);
    setSearchByTypeConfirm(true);
    setLoading(true);
  };

  let cards = [];
  if (pokemons.length > 0) {
    pokemons.map(item => {
      cards.push(
        <PokemonCard
          name={item.name}
          types={item.types}
          stats={item.stats}
          hp={item.stats[5].base_stat}
          attack={item.stats[4].base_stat}
          defense={item.stats[3].base_stat}
          spAttack={item.stats[2].base_stat}
          spDefense={item.stats[1].base_stat}
          speed={item.stats[0].base_stat}
        />
      );
    });
  }

  const searchByTypeHandler = () => {
    setSearchByTypeConfirm(false);
    let offset;
    if (pagination === 1) {
      offset = 0;
    } else {
      offset = (pagination - 1) * elements;
    }
    let limit = elements;

    let types = { types: selectedItems, limit: limit, offset: offset };
    axios
      .post("https://pokedex-serv.herokuapp.com/types", types)
      .then(function(response) {
        setPokemons(response.data.pokemons);
        setTotal(response.data.count);
        setLoading(false);
      })
      .catch(function(error) {
        setTotal(808);
        console.log(error);
        setLoading(false);
      });
  };

  const searchByNameHandler = name => {
    setSearchLoading(true);
    axios
      .post("https://pokedex-serv.herokuapp.com/name", {
        name: name
      })
      .then(function(response) {
        setSearchLoading(false);
        if (response.data !== false) {
          setSeacrhCard(
            <PokemonCard
              name={response.data.name}
              types={response.data.types}
              stats={response.data.stats}
              hp={response.data.stats[5].base_stat}
              attack={response.data.stats[4].base_stat}
              defense={response.data.stats[3].base_stat}
              spAttack={response.data.stats[2].base_stat}
              spDefense={response.data.stats[1].base_stat}
              speed={response.data.stats[0].base_stat}
            />
          );
        } else {
          setSeacrhCard(Empty);
        }
        setVisible(true);
      })
      .catch(function(error) {
        setSearchLoading(false);
        console.log(error);
      });
  };

  const handleChange = selectedItemsIn => {
    setSelectedItems(selectedItemsIn);
    if (selectedItemsIn.length > 0) {
      setSearchByType(true);
      setSearchByTypeConfirm(true);
    } else {
      setSearchByType(false);
      setReload(true);
      setTotal(808);
    }
  };

  if (reload) {
    paginationHandler();
  }

  if (searchByType && searchByTypeConfirm) {
    searchByTypeHandler();
    setLoading(true);
  }

  const onClose = () => {
    setVisible(false);
    setSeacrhCard(Empty);
  };

  const options = [
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
  const filteredOptions = options.filter(o => !selectedItems.includes(o));
  const { Search } = Input;

  const menu = (
    <Menu onClick={searchByType ? onClickPageSearchByType : onClickPage}>
      <Menu.Item key="10">10 on page</Menu.Item>
      <Menu.Item key="20">20 on page</Menu.Item>
      <Menu.Item key="50">50 on page</Menu.Item>
    </Menu>
  );

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
          <Spin spinning={searchLoading} delay={500}>
            <Search
              placeholder="Input full Pokemon name"
              onSearch={value => searchByNameHandler(value)}
              enterButton
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </Spin>
          <Select
            mode="multiple"
            placeholder="Select type"
            value={selectedItemsS}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          >
            {filteredOptions.map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          <Pagination
            defaultCurrent={1}
            total={(total / elements) * 10}
            onChange={searchByType ? setSearchByTypeHandler : allPokeHandler}
            style={{ marginBottom: "10px" }}
          />
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              {elements} on page <Icon type="down" />
            </a>
          </Dropdown>
          <Spin spinning={loading}>
            <CardContainer>{cards}</CardContainer>
          </Spin>
          <Drawer
            title="Pokemon Information"
            placement="right"
            width="375"
            closable={true}
            onClose={onClose}
            visible={visible}
          >
            {searchCard}
          </Drawer>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
