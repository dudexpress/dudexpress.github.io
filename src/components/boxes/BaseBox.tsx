import React from "react"
import Card from "react-bootstrap/Card"
import * as style from "./BaseBox.module.scss"

interface BaseBoxProps {
  title: string
  footer?: React.ReactNode
}

export default class BaseBox extends React.PureComponent<BaseBoxProps> {
  public render(): React.ReactNode {
    return (
      <Card className={style.baseBox}>
        <Card.Body className={style.cardBody}>
          <Card.Title className={style.cardTitle}>
            {this.props.title}
          </Card.Title>
          <Card.Text className={style.cardText}>
            {this.props.children}
          </Card.Text>
          <Card.Footer className={style.cardFooter}>
            {this.props.footer}
          </Card.Footer>
        </Card.Body>
      </Card>
    )
  }
}
