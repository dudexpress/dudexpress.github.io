import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./WeegaLink.module.scss"
import classnames from "classnames"

export default class WeegaLink extends React.PureComponent {
  public render(): React.ReactNode {
    const className = classnames(styles.randomLink)

    return (
      <Card className={className}>
        <Card.Body>
          <Row>
            <Col md={2} className="mb-3">
              <img src={`../../logo/weega.png`} className="bg-white py-2" />
            </Col>
            <Col md={10}>
              <p>Sei interessato a questi giochi?</p>
              <div>
                <OutboundLink
                  href="https://bit.ly/weega_dudexpress"
                  target="_blank"
                  className={styles.btnRandomLink}
                >
                  Fai una proposta su Weega!
                </OutboundLink>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
