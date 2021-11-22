import { faPortrait } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { renderNTimes } from "../Utils"
import BaseBox from "./BaseBox"
interface PlayerCountBoxProps {
  value: number
}

export default class PlayerCountBox extends React.PureComponent<PlayerCountBoxProps> {
  private renderFooter(): React.ReactNode {
    return "Dichiarati: 1 - 5"
  }

  public render(): React.ReactNode {
    return (
      <BaseBox title="Numero giocatori" footer={this.renderFooter()}>
        <div className="player-count">
          {renderNTimes(this.props.value, () => (
            <FontAwesomeIcon icon={faPortrait} />
          ))}
        </div>
      </BaseBox>
    )
  }
}
