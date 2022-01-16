import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./Gamefound.module.scss"
import classnames from "classnames"

interface GamefoundProps {
  title: string
  link: string
  className?: string
}

export default class Gamefound extends React.PureComponent<GamefoundProps> {
  public render(): React.ReactNode {
    if (this.props.link == null) {
      return null
    }
    const className = classnames(styles.fantasia, this.props.className)

    return (
      <Card className={className}>
        <Card.Body>
          <Row>
            <Col md={2} className="mb-3">
              <img src={`../../logo/gamefound.jpg`} alt="gamefound" />
            </Col>
            <Col md={10}>
              <p>Vuoi sostenere questo nuovo progetto?</p>
              <div>
                <OutboundLink
                  href={this.props.link}
                  target="_blank"
                  className={styles.btnFantasia}
                >
                  Acquistalo qui
                </OutboundLink>
              </div>
              <small>
                Vi ricordiamo che state leggendo riguardo l'anteprima di un
                gioco non ancora esistente che i vostri Dudes sono andati a
                recuperare nelle profondità dello spazio! <br />
                I voti e i giudizi sono relativi solamente alla copia ricevuta e
                analizzata grazie ai nostri sofisticatissimi strumenti di
                laboratorio! <br />
                Quando avremo a disposizione la copia definitiva provvederemo
                sicuramente ad aggiornarvi con le nostre opinioni.
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
