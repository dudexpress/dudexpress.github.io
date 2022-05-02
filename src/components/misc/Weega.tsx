import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./Weega.module.scss"
import classnames from "classnames"

interface WeegaProps {
  title: string
  link: string
  future: boolean
  className?: string
}

export default class Weega extends React.PureComponent<WeegaProps> {
  private renderFuture(): React.ReactNode {
    if (!this.props.future) {
      return null
    }

    return (
      <small>
        Vi ricordiamo che state leggendo riguardo l'anteprima di un gioco non
        ancora esistente che i vostri Dudes sono andati a recuperare nelle
        profondità dello spazio! <br />I voti e i giudizi sono relativi
        solamente alla copia ricevuta e analizzata grazie ai nostri
        sofisticatissimi strumenti di laboratorio! <br />
        Quando avremo a disposizione la copia definitiva provvederemo
        sicuramente ad aggiornarvi con le nostre opinioni.
      </small>
    )
  }

  public render(): React.ReactNode {
    if (this.props.link == null) {
      return null
    }
    const className = classnames(styles.weega, this.props.className)

    return (
      <Card className={className}>
        <Card.Body>
          <Row>
            <Col md={2} className="mb-3">
              <img src={`../../logo/weega.png`} alt="weega" />
            </Col>
            <Col md={10}>
              <p>
                Vuoi sostenere l'impresa spaziale dei Dudes?
                <br />
                Puoi farlo acquistando{" "}
                <OutboundLink href={this.props.link} target="_blank">
                  {this.props.title}
                </OutboundLink>
                !
              </p>
              <div>
                <OutboundLink
                  href={this.props.link}
                  target="_blank"
                  className={styles.btnWeega}
                >
                  Acquistalo qui
                </OutboundLink>
              </div>
              {this.renderFuture()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
