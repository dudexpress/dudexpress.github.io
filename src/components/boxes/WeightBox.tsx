import { faFeather, faWeightHanging } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { PostWeigth } from "../../types"
import BaseBox from "./BaseBox"

interface WeightBoxProps {
  value: PostWeigth
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
    return (
      <img
        src={`../../weight/${this.props.value}.png`}
        alt="weight"
        height={75}
      />
    )
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Impegno richiesto" footer={this.renderFooter()}>
        {this.renderContent()}
      </BaseBox>
    )
  }
}
