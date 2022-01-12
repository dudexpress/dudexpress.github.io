import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./Fantasia.module.scss"
import classnames from "classnames"

export default class FantasiaHomepage extends React.PureComponent {
  public render(): React.ReactNode {
    const className = classnames(styles.fantasia, "mt-0")

    return (
      <Card className={className}>
        <Card.Body>
          <Row>
            <Col md={4} className="mb-3">
              <img src={`../../logo/fantasia.png`} alt="fantasia" />
            </Col>
            <Col md={12}>
              <p>Vuoi sostenere l'impresa spaziale dei Dudes?</p>
              <div>
                <OutboundLink
                  href="https://fantasiastore.it/?aff=47"
                  target="_blank"
                  className={styles.btnFantasia}
                >
                  Acquista qui
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
