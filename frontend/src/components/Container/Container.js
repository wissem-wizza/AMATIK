import { useState } from "react";
import { useSelector } from "react-redux";

import ContainerStyle from "./Container.style";
import Content from "./Content";
import Navbar from "./Navbar";
import EleveurNavbar from "./EleveurNavbar";
import Sidebar from "./Sidebar";
import { selectCurrentUser } from "../../features/auth/authSlice";


const Container = () => {

  const { type = null } = useSelector(selectCurrentUser) || {};
  const [showMenu, setShowMenu] = useState(false);

  return (
    <ContainerStyle type={type} showMenu={showMenu}>
      <div className="container">

        {
          type === "Eleveur"
          ? <EleveurNavbar />
          : <Navbar setShowMenu={setShowMenu} />
        }

        <div className="menu-content">

          {
            type === "Superviseur"
            ? <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
            : null
          }

          <Content setShowMenu={setShowMenu} />

        </div>
      </div>
    </ContainerStyle>
  );
};

export default Container;
