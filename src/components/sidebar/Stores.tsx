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
      | "lsgiochi_url"
      | "mse_url"
      | "weega_url"
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

export default class Stores extends React.PureComponent<StoresProps, StoresState> {
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
    updateLink: (x: string) => string,
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
            url={updateLink(link)}
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
        <OutboundLink href={updateLink(link)} target="_blank">
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
      x => "https://www.awin1.com/cread.php?awinmid=54767&awinaffid=1358029&ued=" + encodeURIComponent(x)
    )
  }

  private renderMagicMerchant(): React.ReactNode {
    return this.renderStore(
      "magicmerchant",
      "../../logo/magicmerchant.jpg",
      styles.magicmerchant,
      this.props.magicmerchant_url,
      x => x,
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
      x => x + "?ref=7020"
    )
  }

  private renderFantasia(): React.ReactNode {
    return this.renderStore(
      "fantasia",
      "../../logo/fantasia.png",
      styles.fantasia,
      this.props.fantasia_url,
      x => x + "?aff=47"
    )
  }

  private renderLsGiochi(): React.ReactNode {
    return this.renderStore(
      "lsgiochi",
      "../../logo/lsgiochi.jpg",
      styles.lsgiochi,
      this.props.lsgiochi_url,
      x => x,
      "DUDEXPRESS10",
      0.1
    )
  }

  private renderMse(): React.ReactNode {
    return this.renderStore("mse", "../../logo/mse.jpg", styles.mse, this.props.mse_url, x => x, "DUDEXPRESS10", 0.1)
  }

  private renderWeega(): React.ReactNode {
    return this.renderStore(
      "weega",
      "../../logo/weega.png?t=1",
      styles.weega,
      this.props.weega_url,
      x => x + "?partners=Dudexpress"
    )
  }

  private renderKickstarer(): React.ReactNode {
    return this.renderStore(
      "kickstarter",
      "../../logo/kickstarter.png",
      styles.kickstarter,
      this.props.kickstarter_url,
      x => x
    )
  }

  private renderGamefound(): React.ReactNode {
    return this.renderStore("gamefound", "../../logo/gamefound.jpg", styles.gamefound, this.props.gamefound_url, x => x)
  }

  public render(): React.ReactNode {
    const stores = [
      // this.renderDungeonDice(),
      // this.renderMagicMerchant(),
      this.renderFantasia(),
      // this.renderLsGiochi(),
      // this.renderGetYourFun(),
      this.renderMse(),
      this.renderWeega(),
      this.renderKickstarer(),
      this.renderGamefound(),
    ].filter(x => x)
    if (stores.length === 0) {
      return null
    }

    const className = classnames(styles.stores, "mb-5 text-center text-lg-start")
    return (
      <div className={className}>
        <h5 className="fw-bold">{this.props.label ?? "Acquistalo qui"}</h5>
        <ul className="list-unstyled mb-2">{stores}</ul>
        {/*<small className="d-block mb-2">*/}
        {/*  Stai cercando un gioco?*/}
        {/*  <br />I vostri dude troveranno lo sconto migliore!*/}
        {/*</small>*/}
        {/*<Link to="/trova-sconti">*/}
        {/*  <LinkCtaBtn slug="/trova-sconti" title="Trova sconti" />*/}
        {/*</Link>*/}
      </div>
    )
  }
}
