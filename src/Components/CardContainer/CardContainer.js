import React from "react";

import "./CardContainer.css";

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
const { Meta } = Card;
const CardContainer = props => {
  return <div className="card-container">{props.children}</div>;
};

export default CardContainer;
