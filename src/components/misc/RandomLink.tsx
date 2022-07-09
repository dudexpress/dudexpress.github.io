import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./RandomLink.module.scss"
import classnames from "classnames"

interface RandomLinkProps {
  title: string
  link: string
  discount: string
}

export default class RandomLink extends React.PureComponent<RandomLinkProps> {
  public render(): React.ReactNode {
    const className = classnames(styles.randomLink)

    return (
      <Card className={className}>
        <Card.Body>
          <Row>
            <Col md={2} className="mb-3">
              <img
                src={`../../logo/logo.svg`}
                alt="dudexpress"
                className="bg-white py-2"
              />
            </Col>
            <Col md={10}>
              <p>
                {this.props.title} ti ha incuriosito?
                <br />
                Eccoti un codice sconto per convincerti!{" "}
                <strong>{this.props.discount}</strong>
              </p>
              <div>
                <OutboundLink
                  href={this.props.link}
                  target="_blank"
                  className={styles.btnRandomLink}
                >
                  Acquistalo qui
                </OutboundLink>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}
