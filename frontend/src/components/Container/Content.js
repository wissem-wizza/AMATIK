import { useState, useEffect, memo } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

import { getPageProps } from "./menuHierarchy";
import Header from "./Header";

const Content = memo(({ setShowMenu }) => {

  const location = useLocation();
  const [currentPageProps, setCurrentPageProps] = useState(
    getPageProps(location)
  );

  useEffect(() => {
    setCurrentPageProps(getPageProps(location));
  }, [setCurrentPageProps, location]);

  const handleHideContentClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
  };

  return (
    <div className="content">
      <Header currentPageProps={currentPageProps} />

      {/* padding-bottom didn't work with .content */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        // style={{ paddingBottom: '50px'}}
      >
        <Outlet />
      </Stack>

      <div className="hide-content" onClick={handleHideContentClick} />
    </div>
  );
});

export default Content;
