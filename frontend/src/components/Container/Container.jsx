import React, { useState } from "react";
import ContainerStyle from "./Container.style";
// import Container from "../Container/Container";
import { Outlet, NavLink } from "react-router-dom";
import AMATIK_logo from "./AMATIK_logo.png";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

const Container = () => {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleArrowClick = (e) => {
    const arrowParent = e.currentTarget.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  };

  return (
    <ContainerStyle showMenu={showMenu}>
      <div className="container">
        <div className="navbar">
          {/* //border: "2px solid red", */}
          <img
            className="logo-img"
            src={AMATIK_logo}
            alt="amatik logo"
            style={{ height: "65px", width: "auto", marginLeft: "60px" }}
          />
          <i
            className="bx bx-menu"
            onClick={toggleMenu}
            style={{
              fontSize: "30px",
              height: "50px",
              minWidth: "78px",
              textAlign: "center",
              lineHeight: "50px",
              cursor: "pointer",
              marginLeft: "25px",
              color: "white",
            }}
          />
          {/* </div> */}
          {/* <Container /> */}
        </div>
        <div className="menu-content">
          <div className={`sidebar ${showMenu ? "close" : ""}`}>
            <ul className="nav-links">
              <li>
                <NavLink to="/">
                  <i className="bx bxs-bar-chart-alt-2"></i>
                  <span className="link_name">Dashboard</span>
                </NavLink>
                <ul className="sub-menu blank">
                  <li>
                    <NavLink to="/" className="link_name">
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <NavLink to="/">
                    <i className="bx bx-table"></i>
                    <span className="link_name">Exploitations</span>
                  </NavLink>
                  <i
                    className="bx bxs-chevron-down arrow"
                    onClick={handleArrowClick}
                  />
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name">Exploitations</a>
                  </li>
                  <li>
                    <NavLink to="/eleveur">Liste des éleveurs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/cheptel">cheptel</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <NavLink to="/annonce">
                    <i className="bx bxs-megaphone"></i>
                    <span className="link_name">Annonces</span>
                  </NavLink>
                  <i
                    className="bx bxs-chevron-down arrow"
                    onClick={handleArrowClick}
                  />
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name">Annonces</a>
                  </li>
                  <li>
                    <NavLink to="/annonce">Gérer les annonces</NavLink>
                  </li>
                  <li>
                    <NavLink to="/transport">Gérer les transports</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <NavLink to="/">
                    <i className="bx bx-grid-alt" />
                    <span className="link_name">Services</span>
                  </NavLink>
                  <i
                    className="bx bxs-chevron-down arrow"
                    onClick={handleArrowClick}
                  />
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name">Services</a>
                  </li>
                  <li>
                    <NavLink to="/abattage">Les tickets d'abattage</NavLink>
                  </li>
                  <li>
                    <NavLink to="/saisie">Les tickets de saisie</NavLink>
                  </li>
                  <li>
                    <NavLink to="/part_sociale">Les parts sociales</NavLink>
                  </li>
                  <li>
                    <NavLink to="/BE">Les bons d'enlèvement</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Les factures éleveurs</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/">
                  <i className="bx bxs-check-shield"></i>
                  <span className="link_name">Contrôle Qualité</span>
                </NavLink>
                <ul className="sub-menu blank">
                  <li>
                    <NavLink className="link_name" to="/">
                      Contrôle Qualité
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <NavLink to="/">
                    <i className="bx bx-buildings"></i>
                    <span className="link_name">Société</span>
                  </NavLink>
                  <i
                    className="bx bxs-chevron-down arrow"
                    onClick={handleArrowClick}
                  />
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name">Société</a>
                  </li>
                  <li>
                    <NavLink to="/client">Liste des clients</NavLink>
                  </li>
                  <li>
                    <NavLink to="/commande">Commandes</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/BL">
                  <i className="bx bxs-file-export"></i>
                  <span className="link_name">Bons de livraison</span>
                </NavLink>
                <ul className="sub-menu blank">
                  <li>
                    <NavLink className="link_name" to="/BL">
                      Bons de livraison
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/facture">
                  <i className="bx bx-paste"></i>
                  <span className="link_name">Les factures</span>
                </NavLink>
                <ul className="sub-menu blank">
                  <li>
                    <NavLink className="link_name" to="/facture">
                      Les factures
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/admin">
                  <i className="bx bx-user-check"></i>
                  <span className="link_name">Administration</span>
                </NavLink>
                <ul className="sub-menu blank">
                  <li>
                    <NavLink className="link_name" to="/admin">
                      Administration
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <div className="profile-details">
                  <div className="profile-content"></div>
                  <div className="name-job">
                    <div className="profile_name">SALIES Christian</div>
                    <div className="job">Technicien</div>
                  </div>
                  <i className="bx bx-log-out" />
                </div>
              </li>
            </ul>
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </ContainerStyle>
  );
};

export default Container;
