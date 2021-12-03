import React from "react"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"
import SocialLinks from "../components/SocialLinks"
import Container from "react-bootstrap/Container"
import * as style from "./Layout.module.scss"

const renderNavbar = (location, title) => {
  if (location.pathname === `${__PATH_PREFIX__}/`) {
    return null
  }

  return (
    <header className={style.globalHeader}>
      <Container>
        <Link to="/">
          <img
            src={withPrefix("logo/logo-small.svg")}
            alt="dudexpress small logo"
            height={50}
          />
        </Link>
      </Container>
    </header>
  )
}

const Layout = ({ location, title, children }) => {
  return (
    <div className={style.layout}>
      <Helmet>
        <script src={withPrefix("iubenda.js")} type="text/javascript" />
        <script
          type="text/javascript"
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          charset="UTF-8"
          async
        ></script>
      </Helmet>

      {renderNavbar(location, title)}
      <main>{children}</main>
      <footer className={style.globalFooter}>
        <Container className="d-flex justify-content-between">
          <SocialLinks />
          <span>{title}</span>
        </Container>
      </footer>
    </div>
  )
}

export default Layout
