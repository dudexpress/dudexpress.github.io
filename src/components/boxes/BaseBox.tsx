import classnames from "classnames"
import React from "react"
import Card from "react-bootstrap/Card"
import * as style from "./BaseBox.module.scss"

interface BaseBoxProps {
  title: string
  footer?: React.ReactNode
  small?: boolean
  noHeight?: boolean
  noFooter?: boolean
}

export default class BaseBox extends React.PureComponent<
  React.PropsWithChildren<BaseBoxProps>
> {
  public render(): React.ReactNode {
    return (
      <Card
        className={classnames(style.baseBox, {
          [style.small]: this.props.small,
          "h-auto": this.props.noHeight,
        })}
      >
        <Card.Body className={style.cardBody}>
          <Card.Title
            className={classnames(style.cardTitle, {
              [style.cardTitleSmall]: this.props.small,
            })}
          >
            {this.props.title}
          </Card.Title>
          <Card.Text
            className={classnames(style.cardText, {
              [style.cardTextSmall]: this.props.small,
              [style.cardTextNoHeight]: this.props.noHeight,
            })}
          >
            {this.props.children}
          </Card.Text>
          <Card.Footer
            className={classnames(style.cardFooter, {
              [style.cardFooterSmall]: this.props.small,
            })}
          >
            {this.props.footer}
          </Card.Footer>
        </Card.Body>
      </Card>
    )
  }
}
