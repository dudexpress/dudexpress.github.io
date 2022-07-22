import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import * as styles from "./GameCard.module.scss"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import classnames from "classnames"

const WeegaCard = ({ title, image, subtitle, link }) => {
  if (title == null) {
    return null
  }

  return (
    <Card className={classnames(styles.gameCard, styles.weegaCard)}>
      <OutboundLink href={link} target="_blank" className="stretched-link" />
      <Card.Body className={styles.gameCardBody}>
        <Row className="w-100">
          <Col md={2} className="mb-3 mb-md-0">
            <img
              src={image}
              alt="weega gioco sponsorizzato"
              className={styles.gameCardImg}
            />
          </Col>
          <Col md={10}>
            <div className="d-flex flex-column justify-content-center h-100">
              <h4>{title}</h4>
              <p>{subtitle}</p>
              <small>Link sponsorizzato</small>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default WeegaCard
