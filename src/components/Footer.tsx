import { faIcons } from "@fortawesome/free-solid-svg-icons/faIcons"
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye"
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice"
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign } from "@fortawesome/free-solid-svg-icons/faDollarSign"
import React from "react"
import { Link } from "gatsby"
import * as style from "./SocialLinks.module.scss"

const Footer = () => {
  return (
    <div className={style.socialLinks}>
      <Link to="/blog">
        <FontAwesomeIcon icon={faDice} />
        <small className="d-none d-md-inline-block ms-1">Recensioni</small>
      </Link>
      <Link to="/mechanisms">
        <FontAwesomeIcon icon={faCogs} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">Meccaniche</small>
      </Link>
      <Link to="/giochi-in-sconto">
        <FontAwesomeIcon icon={faDollarSign} className="ms-3" />
        <small className="d-none d-md-inline-block ms-1">
          Giochi in sconto
        </small>
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
