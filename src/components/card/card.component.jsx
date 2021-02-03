import React from "react";
import './card.component';
import CardItem from '../card-item/card-item.component'

class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      card: [
        {
          id: 1,
          titulo: "Introdução a Programação em ReactJS",
          mediador: "Victor R. Azevedo",
          data: "27/01/2021",
          horario: "10:00",
          vaga: "30",
        },
        {
          id: 2,
          titulo: "Autenticação com Firebase",
          mediador: "Victor R. Azevedo",
          data: "29/01/2021",
          horario: "13:00",
          vaga: "30",
        },
        {
          id: 3,
          titulo: "Firebase como Back-End",
          mediador: "Victor R. Azevedo",
          data: "30/01/2021",
          horario: "15:00",
          vaga: "30",
        },
        {
          id: 4,
          titulo: "Redux",
          mediador: "Victor R. Azevedo",
          data: "31/01/2021",
          horario: "08:00",
          vaga: "30",
        }
      ],
    };
  }

  render() {
    return (
      <div className="card-container">
        {this.state.card.map(
          ({ id, titulo, mediador, data, horario, vaga }) => (
            <CardItem
              key={id}
              titulo={titulo}
              mediador={mediador}
              data={data}
              horario={horario}
              vaga={vaga}
            />
          )
        )}
      </div>
    );
  }
}

export default Card;
