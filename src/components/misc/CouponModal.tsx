import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import * as style from "./CouponModal.module.scss"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

interface CouponModalProps {
  url: string
  couponCode: string | null
  couponPercentage: number | null
  isModalShown: boolean
  onClose: () => void
  linkToSpecificGame: boolean
}

export default class CouponModal extends React.PureComponent<CouponModalProps> {
  private handleModalClose(): void {
    this.props.onClose()
  }

  private get title(): React.ReactNode {
    if (this.props.linkToSpecificGame) {
      return (
        <>
          Eccoti un <strong>codice sconto</strong> utilizzabile su questo gioco.
        </>
      )
    }
    return (
      <>
        Eccoti un <strong>codice sconto</strong> utilizzabile su questo negozio.
      </>
    )
  }

  private get ctaText(): string {
    if (this.props.linkToSpecificGame) {
      return "Vai al gioco"
    }
    return "Vai allo store"
  }

  public render(): React.ReactNode {
    if (!this.props.couponCode) {
      return null
    }

    return (
      <Modal
        show={this.props.isModalShown}
        onHide={this.handleModalClose.bind(this)}
        dialogClassName={style.modal}
      >
        <Modal.Header closeButton className={style.modalHeader} />
        <Modal.Body className={style.modalBody}>
          {this.title}
          <Alert className={style.alert}>
            <h2 className="m-0">{this.props.couponCode}</h2>
          </Alert>
          <small>
            Inseriscilo in fase di checkout, prima di procedere con il
            pagamento.
            <br />
            Queto codice ti darà accesso al{" "}
            <strong>{this.props.couponPercentage! * 100}%</strong> di sconto.
          </small>
        </Modal.Body>
        <Modal.Footer className={style.modalFooter}>
          <OutboundLink href={this.props.url} target="_blank">
            <Button variant="secondary" className={style.btn}>
              {this.ctaText}
            </Button>
          </OutboundLink>
        </Modal.Footer>
      </Modal>
    )
  }
}
