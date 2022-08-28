import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import Badge from "react-bootstrap/Badge"
import Card from "react-bootstrap/Card"
import * as style from "./DiscountCard.module.scss"

type DiscountSourceType = "dungeondice" | "getyourfun" | "fantasia" | "weega"

interface DiscountCardProps {
  url: string
  img: string
  title: string
  source: DiscountSourceType
  currentPrice: number
  regularPrice: number
  discount: number
}

export default class DiscountCard extends React.PureComponent<DiscountCardProps> {
  private renderStore(): React.ReactNode {
    let logo = "../../logo/weega.png?t=1"

    if (this.props.source === "dungeondice") {
      logo = "../../logo/dungeondice.png"
    } else if (this.props.source === "getyourfun") {
      logo = "../../logo/getyourfun.jpg"
    } else if (this.props.source === "fantasia") {
      logo = "../../logo/fantasia.png"
    }

    return <img src={logo} alt={this.props.source} height={45} />
  }

  private renderDiscount(): React.ReactNode {
    if (this.props.discount == null) {
      return null
    }

    return (
      <Badge className={style.badge}>
        -{Math.round(this.props.discount * 100)}%
      </Badge>
    )
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
      <div className="d-flex flex-column">
        <del>{this.getPrice(this.props.regularPrice)}</del>
        {this.renderDiscount()}
        <strong>{this.getPrice(this.props.currentPrice)}</strong>
      </div>
    )
  }

  public render(): React.ReactNode {
    return (
      <Card className={style.discountCard}>
        <OutboundLink
          href={this.props.url}
          target="_blank"
          className="stretched-link"
        />
        <Card.Img variant="top" src={this.props.img} />
        <Card.Body className="px-0">
          <Card.Title className="mb-0">{this.props.title}</Card.Title>
        </Card.Body>
        <Card.Footer className="text-right text-muted bg-white border-0 p-0 d-flex justify-content-between align-items-end">
          {this.renderStore()}
          {this.renderPrices()}
        </Card.Footer>
      </Card>
    )
  }
}
