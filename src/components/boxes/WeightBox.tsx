import { faFeather, faWeightHanging } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import BaseBox from "./BaseBox"

interface WeightBoxProps {
  value: 1 | 2 | 3 | 4 | 5
}

export default class WeightBox extends React.PureComponent<WeightBoxProps> {
  private renderFooter(): React.ReactNode {
    switch (this.props.value) {
      case 1:
        return "Leggerissimo"
      case 2:
        return "Leggero"
      case 3:
        return "Medio"
      case 4:
        return "Pesantino"
      case 5:
        return "Pesantissimo"
    }
  }

  private renderContent(): React.ReactNode {
    return <img src={`../../weight/elephant.png`} alt="elephant" width={96} />

    switch (this.props.value) {
      case 1:
        return (
          <>
            <FontAwesomeIcon icon={faFeather} />
            <FontAwesomeIcon icon={faFeather} />
          </>
        )
      case 2:
        return <FontAwesomeIcon icon={faFeather} />
      case 3:
        return <FontAwesomeIcon icon={faWeightHanging} />
      case 4:
        return (
          <>
            <FontAwesomeIcon icon={faWeightHanging} />
            <FontAwesomeIcon icon={faWeightHanging} />
          </>
        )
      case 5:
        return (
          <>
            <FontAwesomeIcon icon={faWeightHanging} />
            <FontAwesomeIcon icon={faWeightHanging} />
            <FontAwesomeIcon icon={faWeightHanging} />
          </>
        )
    }
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Difficoltà" footer={this.renderFooter()}>
        {this.renderContent()}
      </BaseBox>
    )
  }
}
