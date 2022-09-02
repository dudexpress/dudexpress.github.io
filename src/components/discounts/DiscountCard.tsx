import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import Badge from "react-bootstrap/Badge"
import Card from "react-bootstrap/Card"
import * as style from "./DiscountCard.module.scss"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

type DiscountSourceType =
  | "dungeondice"
  | "getyourfun"
  | "fantasia"
  | "blasone"
  | "weega"

interface DiscountCardProps {
  url: string
  img: string
  title: string
  source: DiscountSourceType
  currentPrice: number
  regularPrice: number
  discount: number | null
  couponCode: string | null
  couponPercentage: number | null
}

export interface DiscountCardState {
  isModalShown: boolean
}

export default class DiscountCard extends React.PureComponent<
  DiscountCardProps,
  DiscountCardState
> {
  constructor(props: DiscountCardProps) {
    super(props)
    this.state = {
      isModalShown: false,
    }
  }

  private renderStore(): React.ReactNode {
    let logo = "../../logo/weega.png?t=1"

    if (this.props.source === "dungeondice") {
      logo = "../../logo/dungeondice.png"
    } else if (this.props.source === "getyourfun") {
      logo = "../../logo/getyourfun.jpg"
    } else if (this.props.source === "fantasia") {
      logo = "../../logo/fantasia.png"
    } else if (this.props.source === "blasone") {
      logo = "../../logo/blasone.jpg"
    }

    return <img src={logo} alt={this.props.source} height={45} />
  }

  private renderDiscountAndCoupon(): React.ReactNode {
    const { discount, couponPercentage } = this.props
    if (discount == null && couponPercentage == null) {
      return null
    }

    const percentages = [discount, couponPercentage]
      .filter(Boolean)
      .map(x => `-${Math.round(x * 100)}%`)

    return <Badge className={style.badge}>{percentages.join(" & ")}</Badge>
  }

  private getPrice(price: number): string {
    return `${price.toFixed(2)}€`
  }

  private renderPrices(): React.ReactNode {
    if (this.props.discount == null) {
      return (
        <div className="d-flex flex-column">
          <strong>{this.getPrice(this.props.currentPrice)}</strong>
        </div>
      )
    }

    return (
      <div className="d-flex flex-column align-items-end">
        <del>{this.getPrice(this.props.regularPrice)}</del>
        {this.renderDiscountAndCoupon()}

        <strong>{this.getPrice(this.props.currentPrice)}</strong>
      </div>
    )
  }

  private handleModalOpen(): void {
    if (!this.withModal) {
      return
    }
    this.setState({ isModalShown: true })
  }

  private handleModalClose(): void {
    this.setState({ isModalShown: false })
  }

  private get withModal(): boolean {
    return this.props.couponCode != null
  }

  private renderModal(): React.ReactNode {
    if (!this.withModal) {
      return null
    }

    return (
      <Modal
        show={this.state.isModalShown}
        onHide={this.handleModalClose.bind(this)}
        dialogClassName={style.modal}
      >
        <Modal.Header closeButton className={style.modalHeader} />
        <Modal.Body className={style.modalBody}>
          Eccoti un <strong>codice sconto</strong> utilizzabile per questo
          gioco.
          <Alert className={style.alert}>
            <h2 className="m-0">{this.props.couponCode}</h2>
          </Alert>
          <small>
            Inseriscilo in fase di checkout, prima di procedere con il
            pagamento.
            <br />
            Queto codice ti darà accesso al{" "}
            <strong>{this.props.couponPercentage! * 100}%</strong> di sconto.
          </small>
        </Modal.Body>
        <Modal.Footer className={style.modalFooter}>
          <Button
            variant="secondary"
            href={this.props.url}
            target="_blank"
            className={style.btn}
          >
            Vai al gioco
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  private renderOutboundLink(): React.ReactNode {
    if (this.withModal) {
      return null
    }

    return (
      <OutboundLink
        href={this.props.url}
        target="_blank"
        className="stretched-link"
      />
    )
  }

  public render(): React.ReactNode {
    return (
      <>
        {this.renderModal()}
        <Card
          className={style.discountCard}
          onClick={this.handleModalOpen.bind(this)}
        >
          {this.renderOutboundLink()}
          <Card.Img variant="top" src={this.props.img} />
          <Card.Body className="px-0">
            <Card.Title className="mb-0">{this.props.title}</Card.Title>
          </Card.Body>
          <Card.Footer className="text-right text-muted bg-white border-0 p-0 d-flex justify-content-between align-items-end">
            {this.renderStore()}
            {this.renderPrices()}
          </Card.Footer>
        </Card>
      </>
    )
  }
}
