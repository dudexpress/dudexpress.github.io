import { faFeather, faWeightHanging } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { PostWeigth } from "../../types"
import BaseBox from "./BaseBox"

interface WeightBoxProps {
  value: PostWeigth
}

export default class WeightBox extends React.PureComponent<WeightBoxProps> {
  static getLabel(value: number): string | null {
    switch (value) {
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
      default:
        return null
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
      <BaseBox
        title="Impegno richiesto"
        footer={WeightBox.getLabel(this.props.value)}
      >
        {this.renderContent()}
      </BaseBox>
    )
  }
}
