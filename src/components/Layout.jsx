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

            <div className="d-flex justify-content-between align-items-end">
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
                className="ms-3"
              >
                <img
                  width={20}
                  src={`../../socials/facebook.svg`}
                  alt="facebook"
                  style={{ marginTop: "-3px" }}
                />
              </OutboundLink>

              <Link to="/trova-sconti" className="ms-3">
                <small>
                  <span className="d-none d-md-inline-block me-1">
                    Trova sconti
                  </span>
                  <FontAwesomeIcon icon={faPiggyBank} />
                </small>
              </Link>

              <Link to="/search" className="ms-3">
                <small>
                  <span className="d-none d-md-inline-block me-1">Cerca</span>
                  <FontAwesomeIcon icon={faSearch} />
                </small>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <main style={{ minHeight: "calc(100vh - 82px - 88px)" }}>{children}</main>
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
