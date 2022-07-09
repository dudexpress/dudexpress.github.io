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
  public render(): React.ReactNode {
    if (this.props.future !== true) {
      return false
    }

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
                Vuoi acquistare questo gioco a un prezzo unico?
                <br />
                Entra in Weega e scopri i vantaggi riservati alla community!
              </p>
              <div>
                <OutboundLink
                  href={`${this.props.link}?partners=Dudexpress`}
                  target="_blank"
                  className={styles.btnWeega}
                >
                  Vai a Weega
                </OutboundLink>
              </div>
              <small>
                Weega è sia un e-commerce innovativo che una community di
                appasionati giocatori da tavolo come te! <br />
                Ti abbiamo incuriosito? Visita la{" "}
                <OutboundLink
                  href="https://bit.ly/Weega_Dudexpress"
                  target="_blank"
                >
                  pagina facebook
                </OutboundLink>{" "}
                per maggiori informazioni!
              </small>
              <br />
              <br />
              <small>
                Vi ricordiamo che state leggendo riguardo l'anteprima di un
                gioco non ancora esistente che i vostri Dudes sono andati a
                recuperare nelle profondità dello spazio! <br />I voti e i
                giudizi sono relativi solamente alla copia ricevuta e analizzata
                grazie ai nostri sofisticatissimi strumenti di laboratorio!{" "}
                <br />
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
