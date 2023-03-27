import classnames from "classnames"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import { Frontmatter } from "../../types"
import CouponModal from "../misc/CouponModal"
import * as styles from "./Stores.module.scss"
import LinkCtaBtn from "../misc/LinkCtaBtn"

interface StoresProps
  extends Partial<
    Pick<
      Frontmatter,
      | "dungeondice_url"
      | "magicmerchant_url"
      | "getyourfun_url"
      | "fantasia_url"
      | "blasone_url"
      | "mse_url"
      | "pandoragames_url"
      | "weega_url"
      | "weega_future"
      | "kickstarter_url"
      | "gamefound_url"
    >
  > {
  label?: string
  linkToSpecificGame: boolean
}

type StoresWithModal = "blasone" | "mse"
export interface StoresState {
  modalShown: StoresWithModal | null
}

export default class Stores extends React.PureComponent<
  StoresProps,
  StoresState
> {
  constructor(props: StoresProps) {
    super(props)
    this.state = {
      modalShown: null,
    }
  }

  private handleModalOpen(modalShown: StoresWithModal): void {
    this.setState({ modalShown })
  }

  private handleModalClose(): void {
    this.setState({ modalShown: null })
  }

  private renderStore(
    name: string,
    imgPath: string,
    imgClassName: string,
    link: string | undefined,
    linkSuffix: string,
    couponCode: string | null = null,
    couponPercentage: number | null = null
  ): React.ReactNode {
    if (!link) {
      return null
    }

    if (couponPercentage != null) {
      return (
        <li key={link}>
          <CouponModal
            key={name}
            isModalShown={this.state.modalShown === name}
            url={`${link}${linkSuffix}`}
            couponCode={couponCode}
            couponPercentage={couponPercentage}
            onClose={this.handleModalClose.bind(this)}
            linkToSpecificGame={this.props.linkToSpecificGame}
          />
          <img
            src={imgPath}
            alt={name}
            className={imgClassName}
            onClick={() => this.handleModalOpen(name as StoresWithModal)}
          />
        </li>
      )
    }

    return (
      <li key={link}>
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

  private renderMagicMerchant(): React.ReactNode {
    return this.renderStore(
      "magicmerchant",
      "../../logo/magicmerchant.jpg",
      styles.magicmerchant,
      this.props.magicmerchant_url,
      "",
      "DUDEXPRESS5",
      0.05
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
      "?aff=9337a74b51b728bb6e6add6b8eff9ff6",
      "DUDEXPRESS",
      0.1
    )
  }

  private renderMse(): React.ReactNode {
    return this.renderStore(
      "mse",
      "../../logo/mse.jpg",
      styles.mse,
      this.props.mse_url,
      "",
      "DUDEXPRESS10",
      0.1
    )
  }

  private renderPandoraGames(): React.ReactNode {
    return null
    // return this.renderStore(
    // "pandora",
    // "../../logo/pandoragames.jpg",
    // styles.pandora,
    // this.props.pandoragames_url,
    // ""
    // )
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
      this.renderMagicMerchant(),
      this.renderFantasia(),
      this.renderBlasone(),
      this.renderGetYourFun(),
      this.renderMse(),
      this.renderPandoraGames(),
      this.renderWeega(),
      this.renderKickstarer(),
      this.renderGamefound(),
    ].filter(x => x)
    if (stores.length === 0) {
      return null
    }

    const className = classnames(
      styles.stores,
      "mb-5 text-center text-lg-start"
    )
    return (
      <div className={className}>
        <h5 className="fw-bold">{this.props.label ?? "Acquistalo qui"}</h5>
        <ul className="list-unstyled mb-2">{stores}</ul>
        <small className="d-block mb-2">
          Stai cercando un gioco?
          <br />I vostri dude troveranno lo sconto migliore!
        </small>
        <Link to="/trova-sconti">
          <LinkCtaBtn slug="/trova-sconti" title="Trova sconti" />
        </Link>
      </div>
    )
  }
}
