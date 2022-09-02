import classnames from "classnames"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import { Frontmatter } from "../../types"
import * as styles from "./Stores.module.scss"

interface StoresProps
  extends Pick<
    Frontmatter,
    | "dungeondice_url"
    | "getyourfun_url"
    | "fantasia_url"
    | "blasone_url"
    | "weega_url"
    | "weega_future"
    | "kickstarter_url"
    | "gamefound_url"
  > {
  label?: string
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

  private renderGetYourFun(): React.ReactNode {
    return this.renderStore(
      "getyourfun",
      "../../logo/getyourfun.jpg",
      styles.getyourfun,
      this.props.getyourfun_url,
      "?ref=7020"
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

  private renderBlasone(): React.ReactNode {
    return this.renderStore(
      "blasone",
      "../../logo/blasone.jpg",
      styles.blasone,
      this.props.blasone_url,
      "?aff=9337a74b51b728bb6e6add6b8eff9ff6"
    )
  }

  private renderWeega(): React.ReactNode {
    return this.renderStore(
      "weega",
      "../../logo/weega.png?t=1",
      styles.weega,
      this.props.weega_url,
      "?partners=Dudexpress"
    )
  }

  private renderKickstarer(): React.ReactNode {
    return this.renderStore(
      "kickstarter",
      "../../logo/kickstarter.png",
      styles.kickstarter,
      this.props.kickstarter_url,
      ""
    )
  }

  private renderGamefound(): React.ReactNode {
    return this.renderStore(
      "gamefound",
      "../../logo/gamefound.jpg",
      styles.gamefound,
      this.props.gamefound_url,
      ""
    )
  }

  public render(): React.ReactNode {
    const stores = [
      this.renderDungeonDice(),
      this.renderGetYourFun(),
      this.renderFantasia(),
      this.renderBlasone(),
      this.renderWeega(),
      this.renderKickstarer(),
      this.renderGamefound(),
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
