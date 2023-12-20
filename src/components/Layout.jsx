import classnames from "classnames"
import React from "react"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"
import Footer from "../components/Footer"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"
import * as style from "./Layout.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch"

const Layout = ({ location, title, children }) => {
  const headerClassName = classnames(style.globalHeader, "fixed-top bg-white"),
    headerItemsSpacingClassName = "ms-4"

  return (
    <div className={style.layout}>
      <div id="fb-root" />
      <Helmet htmlAttributes={{ lang: "it" }} />
      <Helmet>
        <script src={withPrefix("iubenda.js")} type="text/javascript" />
        <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>
      </Helmet>

      <header className={headerClassName}>
        <Container>
          <div className="d-flex w-100 flex-column flex-md-row align-items-center justify-content-between align-items-md-end">
            <Link to="/">
              <img src={withPrefix("logo/logo-small.svg")} alt="dudexpress small logo" height={50} />
            </Link>
            <div className="d-flex justify-content-between align-items-end mt-2 mt-md-0">
              <NavDropdown title="Rubriche">
                <NavDropdown.Item as={Link} to="/reviews" className={style.dropdownItem}>
                  <span className={style.dudeInDropdown}>Dude</span>Review
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/previews" className={style.dropdownItem}>
                  <span className={style.dudeInDropdown}>Dude</span>Preview
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/nexts" className={style.dropdownItem}>
                  <span className={style.dudeInDropdown}>Dude</span>Next
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/advisor" className={style.dropdownItem}>
                  <span className={style.dudeInDropdown}>Dude</span>Advisor
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/interview" className={style.dropdownItem}>
                  <span className={style.dudeInDropdown}>Dude</span>Interview
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/convention" className={style.dropdownItem}>
                  <span className={style.dudeInDropdown}>Dude</span>Con
                </NavDropdown.Item>
              </NavDropdown>

              <Link to="/trova-sconti" className={headerItemsSpacingClassName}>
                <span className="d-inline-block me-1">Trova sconti</span>
              </Link>

              <Link to="/search" className={headerItemsSpacingClassName}>
                <span className="d-inline-block me-1">
                  Cerca <FontAwesomeIcon icon={faSearch} />
                </span>
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
