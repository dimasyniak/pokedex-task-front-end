import React from "react";
import "antd/dist/antd.css";
import { Progress, Card, Avatar, Tag } from "antd";

const PokemonCard = props => {
  const { Meta } = Card;
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

  let total = 0;
  props.stats.map(statItem => {
    total += statItem.base_stat;
  });

  let types = [];
  props.types.map(typeItem => {
    let color;
    color = getTypeColor(typeItem.type.name);
    types.push(
      <Tag key={props.name + typeItem.type.name} color={color}>
        {typeItem.type.name.toUpperCase()}
      </Tag>
    );
  });

  let description = (
    <div>
      <span>HP</span>
      <Progress percent={(props.hp * 100) / 255} showInfo={false} />
      <span>Speed</span>
      <Progress percent={(props.speed * 100) / 180} showInfo={false} />
      <span>Defense</span>
      <Progress percent={(props.defense * 100) / 230} showInfo={false} />
      <span>Attack</span>
      <Progress percent={(props.attack * 100) / 190} showInfo={false} />
      <span>Sp. Defense</span>
      <Progress percent={(props.spDefense * 100) / 230} showInfo={false} />
      <span>Sp. Attack</span>
      <Progress percent={(props.spAttack * 100) / 194} showInfo={false} />
      <span>Total</span>
      <Progress percent={(total * 100) / 780} showInfo={false} />
      {types}
    </div>
  );

  return (
    <Card key={props.name}>
      <Meta
        avatar={
          <Avatar
            src={
              "https://img.pokemondb.net/sprites/sun-moon/icon/" +
              props.name +
              ".png"
            }
          />
        }
        title={props.name.toUpperCase()}
        description={description}
      />
    </Card>
  );
};

export default PokemonCard;
