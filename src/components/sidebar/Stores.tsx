import classnames from "classnames"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import * as styles from "./Stores.module.scss"

interface StoresProps {
  dungeondice_url: string
  fantasia_url: string
}

export default class Stores extends React.PureComponent<StoresProps> {
  private renderStore(
    name: string,
    imgPath: string,
    imgClassName: string,
    link: string,
    linkSuffix: string
  ): React.ReactNode {
    if (!link) {
      return null
    }

    return (
      <li>
        <OutboundLink href={`${link}${linkSuffix}`} target="_blank">
          <img src={imgPath} alt={name} className={imgClassName} />
        </OutboundLink>
      </li>
    )
  }

  private renderDungeonDice(): React.ReactNode {
    return this.renderStore(
      "dungeondice",
      "../../logo/dungeonDice.png",
      styles.dungeondice,
      this.props.dungeondice_url,
      "?dda=9A5FB278F"
    )
  }

  private renderFantasia(): React.ReactNode {
    return this.renderStore(
      "fantasia",
      "../../logo/fantasia.png",
      styles.fantasia,
      this.props.fantasia_url,
      "?aff=47"
    )
  }

  public render(): React.ReactNode {
    const stores = [this.renderDungeonDice(), this.renderFantasia()].filter(
      x => x
    )
    if (stores.length === 0) {
      return null
    }

    const className = classnames(styles.stores, "mb-5")
    return (
      <div className={className}>
        <h5>Acquistalo qui</h5>
        <ul className="list-unstyled">{stores}</ul>
      </div>
    )
  }
}
