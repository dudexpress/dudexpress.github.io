import classnames from "classnames"
import React from "react"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"
import Footer from "../components/Footer"
import Container from "react-bootstrap/Container"
import * as style from "./Layout.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch"
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons/faPiggyBank"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Layout = ({ location, title, children }) => {
  const headerClassName = classnames(style.globalHeader, "fixed-top bg-white"),
    headerItemsSpacingClassName = "ms-4"

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
          <div className="d-flex w-100 flex-column flex-md-row align-items-center justify-content-between align-items-md-end">
            <Link to="/">
              <img
                src={withPrefix("logo/logo-small.svg")}
                alt="dudexpress small logo"
                height={50}
              />
            </Link>

            <div className="d-flex justify-content-between align-items-end mt-2 mt-md-0">
              <OutboundLink
                href="https://www.instagram.com/dudexpress.review/"
                target="_blank"
              >
                <img
                  width={20}
                  src={`../../socials/instagram.svg`}
                  alt="instagram"
                  style={{ marginTop: "-3px" }}
                />
              </OutboundLink>
              <OutboundLink
                href="https://www.facebook.com/dudexpress.review"
                target="_blank"
                className={headerItemsSpacingClassName}
              >
                <img
                  width={20}
                  src={`../../socials/facebook.svg`}
                  alt="facebook"
                  style={{ marginTop: "-3px" }}
                />
              </OutboundLink>

              <Link to="/trova-sconti" className={headerItemsSpacingClassName}>
                <small>
                  <span className="d-inline-block me-1">Trova sconti</span>
                  <FontAwesomeIcon icon={faPiggyBank} />
                </small>
              </Link>

              <Link to="/search" className={headerItemsSpacingClassName}>
                <small>
                  <span className="d-inline-block me-1">Cerca</span>
                  <FontAwesomeIcon icon={faSearch} />
                </small>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <main>{children}</main>
      <footer className={style.globalFooter}>
        <Container className="d-flex justify-content-between">
          <Footer />
          <span>{title}</span>
        </Container>
      </footer>
    </div>
  )
}

export default Layout
