import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./Fantasia.module.scss"

interface FantasiaProps {
  title: string
  link: string
}

export default class Fantasia extends React.PureComponent<FantasiaProps> {
  public render(): React.ReactNode {
    if (this.props.link == null) {
      return null
    }

    return (
      <Card className={styles.fantasia}>
        <Card.Body>
          <Row>
            <Col md={2} className="mb-3 mb-md-0 d-none d-md-block">
              <img src={`../../logo/fantasia.png`} alt="fantasia" />
            </Col>
            <Col md={10}>
              <p>
                Vuoi sostenere l'impresa spaziale dei Dudes?
                <br />
                Compra qui{" "}
                <OutboundLink
                  href={`${this.props.link}?aff=47`}
                  target="_blank"
                >
                  {this.props.title}
                </OutboundLink>
                !
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
