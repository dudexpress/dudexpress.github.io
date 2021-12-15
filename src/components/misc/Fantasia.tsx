import { OutboundLink } from "gatsby-plugin-google-gtag"
import React from "react"
import BaseSection from "../sections/BaseSection"

interface FantasiaProps {
  title: string
  link: string
}

export default class Fantasia extends React.PureComponent<FantasiaProps> {
  public render(): React.ReactNode {
    return (
      <BaseSection className="mb-0">
        Si ringrazia{" "}
        <OutboundLink href="https://fantasiastore.it/?aff=47" target="_blank">
          Fantasia store
        </OutboundLink>{" "}
        per la review-copy usata per questa recensione.
        <br />
        Potete acquistare{" "}
        <OutboundLink href={`${this.props.link}?aff=47`} target="_blank">
          {this.props.title}
        </OutboundLink>{" "}
        su Fantasia Store!
      </BaseSection>
    )
  }
}
