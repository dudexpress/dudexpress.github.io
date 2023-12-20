import React from "react"

export default class Disclaimer extends React.PureComponent<{ type: string }> {
  private getContent(): React.ReactNode {
    switch (this.props.type) {
      case "next":
        return (
          <>
            I voti e i giudizi sono relativi solamente alle <strong>informazioni presenti online</strong> analizzate
            grazie ai nostri sofisticatissimi strumenti di laboratorio!
          </>
        )
      default:
        return (
          <>
            I voti e i giudizi sono relativi solamente alla <strong>copia</strong> analizzata grazie ai nostri
            sofisticatissimi strumenti di laboratorio!
          </>
        )
    }
  }

  public render(): React.ReactNode {
    if (this.props.type === "review") {
      return null
    }

    return (
      <div className="disclaimer mb-5">
        <h5>Disclaimer</h5>
        <small>
          Vi ricordiamo che state leggendo l'<strong>anteprima</strong> di un gioco non ancora esistente che i vostri
          Dudes sono andati a recuperare nelle profondità dello spazio! <br />
          {this.getContent()}
        </small>
      </div>
    )
  }
}
