import React from "react"
import * as styles from "./Spinner.module.scss"

const Spinner = () => (
  <div className={styles.loader}>
    <div className={styles.rocket}>
      <img src="../../logo/spinner/rocket.svg" />
    </div>
    <img src="../../logo/spinner/dice.svg" className={styles.dice} />
  </div>
)

export default Spinner
