import React from "react";
import './card-item.styles.scss';

const CardItem = ({ titulo, mediador, data, horario, vaga }) => (
  <div className="card-item">
    <h1 className="titulo">{titulo.toUpperCase()}</h1>
    <span className="mediador">{mediador}</span>
    <span className="data">{data}</span>
    <span className="horario">{horario}</span>
    <span className="vaga">{vaga}</span>
  </div>
);

export default CardItem;
