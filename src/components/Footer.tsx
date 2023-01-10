import { faIcons } from "@fortawesome/free-solid-svg-icons/faIcons"
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye"
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice"
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs"
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons/faPiggyBank"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "gatsby"
import * as style from "./SocialLinks.module.scss"

const Footer = () => {
  return (
    <div className={style.socialLinks}>
      <Link to="/blog">
        <FontAwesomeIcon icon={faDice} />
        <small className="d-none d-md-inline-block ms-1">Articoli</small>
      </Link>
      <Link to="/mechanisms">
        <FontAwesomeIcon icon={faCogs} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Meccaniche</small>
      </Link>
      <Link to="/trova-sconti">
        <FontAwesomeIcon icon={faPiggyBank} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Trova sconti</small>
      </Link>
      <Link to="/credits">
        <FontAwesomeIcon icon={faIcons} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Credits</small>
      </Link>
      <a href="https://www.iubenda.com/privacy-policy/42365225" target="_blank">
        <FontAwesomeIcon icon={faEye} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Privacy Policy</small>
      </a>
    </div>
  )
}

export default Footer
