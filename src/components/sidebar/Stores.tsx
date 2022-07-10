import classnames from "classnames"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import * as styles from "./Stores.module.scss"

interface StoresProps {
  label?: string
  dungeondice_url: string
  fantasia_url: string
  weega_url: string
  weega_future: boolean
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
      "../../logo/dungeondice.png",
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

  private renderWeega(): React.ReactNode {
    if (this.props.weega_future) {
      return false
    }

    return this.renderStore(
      "weega",
      "../../logo/weega.png",
      styles.weega,
      this.props.weega_url,
      "?partners=Dudexpress"
    )
  }

  public render(): React.ReactNode {
    const stores = [
      this.renderDungeonDice(),
      this.renderFantasia(),
      this.renderWeega(),
    ].filter(x => x)
    if (stores.length === 0) {
      return null
    }

    const className = classnames(styles.stores, "mb-5")
    return (
      <div className={className}>
        <h5>{this.props.label ?? "Acquistalo qui"}</h5>
        <ul className="list-unstyled">{stores}</ul>
      </div>
    )
  }
}
