import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./FundingLink.module.scss"
import classnames from "classnames"

interface FundingLinkProps {
  title: string
  link: string
}

export default class FundingLink extends React.PureComponent<FundingLinkProps> {
  public render(): React.ReactNode {
    const className = classnames(styles.randomLink)

    return (
      <Card className={className}>
        <Card.Body>
          <Row>
            <Col md={2} className="mb-3 mb-md-0">
              <img src={`../../logo/weega.png`} className="bg-white py-2" />
            </Col>
            <Col md={10}>
              <p>{this.props.title} ti ha incuriosito?</p>
              <div>
                <OutboundLink
                  href={this.props.link}
                  target="_blank"
                  className={styles.btnRandomLink}
                >
                  Acquistalo qui
                </OutboundLink>
                <em className="mx-3">oppure</em>
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
