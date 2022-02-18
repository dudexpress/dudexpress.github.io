import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"

export default class Socials extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <>
        <h5>Sempre aggiornato</h5>
        <OutboundLink
          href="https://www.instagram.com/dudexpress.review/"
          target="_blank"
        >
          <img width={40} src={`../../socials/instagram.svg`} alt="instagram" />
        </OutboundLink>
        <OutboundLink
          href="https://www.facebook.com/dudexpress.review"
          target="_blank"
          className="ms-2"
        >
          <img width={40} src={`../../socials/facebook.svg`} alt="facebook" />
        </OutboundLink>
      </>
    )
  }
}
