import classnames from "classnames"
import React from "react"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"
import SocialLinks from "../components/SocialLinks"
import Container from "react-bootstrap/Container"
import * as style from "./Layout.module.scss"

const Layout = ({ location, title, children }) => {
  const headerClassName = classnames(style.globalHeader, "fixed-top bg-white")

  return (
    <div className={style.layout}>
      <div id="fb-root" />
      <Helmet htmlAttributes={{ lang: "it" }} />
      <Helmet>
        <script src={withPrefix("iubenda.js")} type="text/javascript" />
        <script
          type="text/javascript"
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          charset="UTF-8"
          async
        ></script>
      </Helmet>

      <header className={headerClassName}>
        <Container>
          <div className="d-flex w-100 justify-content-between align-items-end">
            <Link to="/">
              <img
                src={withPrefix("logo/logo-small.svg")}
                alt="dudexpress small logo"
                height={50}
              />
            </Link>

            <Link to="/search">
              <small>Cerca &#x1F50D;</small>
            </Link>
          </div>
        </Container>
      </header>

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
