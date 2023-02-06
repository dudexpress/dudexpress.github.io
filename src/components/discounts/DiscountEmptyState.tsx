import classNames from "classnames"
import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import * as style from "./DiscountEmptyState.module.scss"

export const DiscountEmptyState = () => {
  const className = classNames(
    style.emptyStateWeega,
    "mt-5 bg-light p-5 d-flex justify-content-center"
  )
  return (
    <div>
      <div>Non siamo riusciti a trovare quello che stai cercando :(</div>
      <div className={className}>
        <div className="w-50">
          <img src="../../logo/weega-big.png" width="50%" />
          <div className="mt-3">
            Non trovi il gioco che desideri? <br />
            Fa' la tua proposta su{" "}
            <OutboundLink
              href="https://bit.ly/weega_dudexpress"
              target="_blank"
            >
              Weega!
            </OutboundLink>
          </div>
        </div>
      </div>
    </div>
  )
}
