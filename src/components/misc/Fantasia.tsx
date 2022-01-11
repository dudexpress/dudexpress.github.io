import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./Fantasia.module.scss"
import classnames from "classnames"

interface FantasiaProps {
  title: string
  link: string
  className?: string
}

export default class Fantasia extends React.PureComponent<FantasiaProps> {
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
              <img src={`../../logo/fantasia.png`} alt="fantasia" />
            </Col>
            <Col md={10}>
              <p>
                Vuoi sostenere l'impresa spaziale dei Dudes?
                <br />
                Puoi farlo comprando{" "}
                <OutboundLink
                  href={`${this.props.link}?aff=47`}
                  target="_blank"
                >
                  {this.props.title}
                </OutboundLink>
                !
              </p>
              <div>
                <OutboundLink
                  href={`${this.props.link}?aff=47`}
                  target="_blank"
                  className={styles.btnFantasia}
                >
                  Compralo qui
                </OutboundLink>
              </div>
              <small>
                Una parte della vendita sponsorizzerà le prossime imprese
                spaziali!
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
