import React, { useState } from "react";
import { Table, Spin } from "antd";

function PokemonsTable({ data } = this.props) {
  const [ready, setReady] = useState(false);

  const columns = [
    {
      title: "Picture",
      dataIndex: "img",
      width: 50
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 50
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
  if (data.length > 0) {
    setReady(true);
  }

  let newData = [];
  if (ready) {
    newData = data;
    console.log(newData);
  }
  return (
    <Table
      columns={columns}
      dataSource={newData}
      pagination={{ pageSize: 20 }}
    />
  );
}

export default PokemonsTable;
