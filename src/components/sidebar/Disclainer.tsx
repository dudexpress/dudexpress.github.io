import React from "react"
import { Frontmatter } from "../../types"

type DisclaimerProps = Pick<
  Frontmatter,
  "kickstarter_url" | "gamefound_url" | "weega_url" | "weega_future"
>

export default class Disclaimer extends React.PureComponent<DisclaimerProps> {
  public render(): React.ReactNode {
    if (
      !(
        this.props.kickstarter_url != null ||
        this.props.gamefound_url != null ||
        (this.props.weega_url != null && this.props.weega_future === true)
      )
    ) {
      return null
    }

    return (
      <div className="disclaimer mb-5">
        <h5>Disclaimer</h5>
        <small>
          Vi ricordiamo che state leggendo l'anteprima di un gioco non
          ancora esistente che i vostri Dudes sono andati a recuperare nelle
          profondità dello spazio! <br />I voti e i giudizi sono relativi
          solamente alla copia ricevuta e analizzata grazie ai nostri
          sofisticatissimi strumenti di laboratorio! <br />
          Quando avremo a disposizione la copia definitiva provvederemo
          sicuramente ad aggiornarvi con le nostre opinioni.
        </small>
      </div>
    )
  }
}
