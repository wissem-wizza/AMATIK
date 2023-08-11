import styled from "styled-components"; //, { createGlobalStyle, css }

const StyledContainer = styled("Container")`
  .Mui-selected.MuiPaginationItem-page.css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root {
    background: #06603a;
  }
  .MuiPagination-root.MuiPagination-text.css-1oj2twp-MuiPagination-root {
    margin-right: 250px;
  }
  .container {
    /* background: #064f32; */
    /* border: 2px solid blue; */
  }
  .navbar {
    /* border: 2px solid black; */
    position: sticky;
    top: 0;
    background: #06603a;
    z-index: 100;
  }
  /* .content {
    width: 50px;
    flex: 1;
    float: right;
    box-sizing: border-box;
  } */
  .content {
    flex: 1;
    box-sizing: border-box;
    margin-left: ${({ showMenu }) => (showMenu ? "156px" : "358px")};
    margin-right: 78px;
    margin-top: 78px;
    transition: margin-left 0.5s ease;
  }
  .menu-content {
    display: flex;
    width: 100%;
    overflow: auto;
  }
  .sidebar {
    flex: 1;
    position: fixed;
    /* border-radius: 18px; */
    top: 1;
    left: 0;
    height: 100%;
    width: 280px;
    background: #064f32;
    /* background: #4caf50; __ feta7 : #06603A  ghami9 #064F32 __   // #11101d;*/
    z-index: 100;
    transition: all 0.5s ease;
  }
  .sidebar.close {
    width: 78px;
  }
  /* .sidebar .logo-details {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
  } */

  /* .sidebar .logo-details i { */
  .sidebar i {
    font-size: 30px;
    color: #fff;
    height: 50px;
    min-width: 78px;
    text-align: center;
    line-height: 50px;
  }

  /* .sidebar .logo-details .logo_name { */
  /* .sidebar .logo_name {
    font-size: 22px;
    color: #fff;
    font-weight: 600;
    transition: 0.3s ease;
    transition-delay: 0.1s;
  } */
  /* .sidebar.close .logo-details .logo_name { */
  /* .sidebar.close .logo_name {
    transition-delay: 0s;
    opacity: 0;
    pointer-events: none;
  } */
  .sidebar .nav-links {
    height: 100%;
    padding: 50px 0 150px 0;
    overflow: auto;
  }
  .sidebar.close .nav-links {
    overflow: visible;
  }
  .sidebar .nav-links::-webkit-scrollbar {
    display: none;
  }
  .sidebar .nav-links li {
    position: relative;
    list-style: none;
    transition: all 0.4s ease;
  }
  .sidebar .nav-links li:hover {
    background: #06603a;
    /* background: #1d1b31; */
  }
  .sidebar .nav-links li .iocn-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sidebar.close .nav-links li .iocn-link {
    display: block;
  }
  .sidebar .nav-links li i {
    height: 50px;
    min-width: 78px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .sidebar .nav-links li.showMenu i.arrow {
    transform: rotate(-180deg);
  }
  .sidebar.close .nav-links i.arrow {
    display: none;
  }
  .sidebar .nav-links li a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .sidebar .nav-links li a .link_name {
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    transition: all 0.4s ease;
  }
  .sidebar.close .nav-links li a .link_name {
    opacity: 0;
    pointer-events: none;
  }
  .sidebar .nav-links li .sub-menu {
    padding: 6px 6px 14px 80px;
    margin-top: -10px;
    /* background: #1d1b31; */
    background: #06603a;
    display: none;
  }
  .sidebar .nav-links li.showMenu .sub-menu {
    display: block;
  }
  .sidebar .nav-links li .sub-menu a {
    color: #fff;
    font-size: 15px;
    padding: 5px 0;
    white-space: nowrap;
    opacity: 0.6;
    transition: all 0.3s ease;
  }
  .sidebar .nav-links li .sub-menu a:hover {
    opacity: 1;
  }
  .sidebar.close .nav-links li .sub-menu {
    position: absolute;
    left: 100%;
    top: -10px;
    margin-top: 0;
    padding: 10px 20px;
    border-radius: 0 6px 6px 0;
    opacity: 0;
    display: block;
    pointer-events: none;
    transition: 0s;
  }
  .sidebar.close .nav-links li:hover .sub-menu {
    top: 0;
    opacity: 1;
    pointer-events: auto;
    transition: all 0.4s ease;
  }
  .sidebar .nav-links li .sub-menu .link_name {
    display: none;
  }
  .sidebar.close .nav-links li .sub-menu .link_name {
    font-size: 18px;
    opacity: 1;
    display: block;
  }
  .sidebar .nav-links li .sub-menu.blank {
    opacity: 1;
    pointer-events: auto;
    padding: 3px 20px 6px 16px;
    opacity: 0;
    pointer-events: none;
  }
  .sidebar .nav-links li:hover .sub-menu.blank {
    top: 50%;
    transform: translateY(-50%);
  }
  .sidebar .profile-details {
    position: fixed;
    bottom: 0;
    width: 280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: #1d1b31; */
    background: #06603a;
    padding: 12px 0;
    transition: all 0.5s ease;
  }
  .sidebar.close .profile-details {
    background: none;
  }
  .sidebar.close .profile-details {
    width: 78px;
  }
  .sidebar .profile-details .profile-content {
    display: flex;
    align-items: center;
  }
  .sidebar .profile-details img {
    height: 52px;
    width: 52px;
    object-fit: cover;
    border-radius: 16px;
    margin: 0 14px 0 12px;
    /* background: #1d1b31; */
    background: #06603a;
    transition: all 0.5s ease;
  }
  .sidebar.close .profile-details img {
    padding: 10px;
  }
  .sidebar .profile-details .profile_name,
  .sidebar .profile-details .job {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;
  }
  .sidebar.close .profile-details i,
  .sidebar.close .profile-details .profile_name,
  .sidebar.close .profile-details .job {
    display: none;
  }
  .sidebar .profile-details .job {
    font-size: 12px;
  }
  .home-nav {
    position: fixed;
    /* background: #1d1b31; //e4e9f7 */
    background: #06603a;
    height: 100vh;
    left: 360px;
    width: calc(100% - 0px);
    transition: all 0.5s ease;
  }
  .sidebar.close ~ .home-nav {
    left: 78px;
    width: calc(100% - 78px);
  }

  /* .home-nav .home-content { */
  .home-nav {
    height: 60px;
    display: flex;
    align-items: center;
  }
  /* .home-nav .home-content .bx-menu,
  .home-nav .home-content .text {
    color: #11101d;
    color: #064F32;
    font-size: 35px;
  } */

  /* .home-nav .home-content .bx-menu { */
  .home-nav .bx-menu {
    margin: 0 15px;
    cursor: pointer;
  }

  /* .home-nav .home-content .text { */
  .home-nav .text {
    font-size: 26px;
    font-weight: 600;
  }
  @media (max-width: 360px) {
    .sidebar.close .nav-links li .sub-menu {
      display: none;
    }
    .sidebar {
      width: 78px;
    }
    .sidebar.close {
      width: 0;
    }
    .home-nav {
      left: 78px;
      width: calc(100% - 78px);
      z-index: 100;
    }
    .sidebar.close ~ .home-nav {
      width: 100%;
      left: 0;
    }
    .content {
      margin-left: 0;
      transition: margin-left 0.5s ease;
    }
  }
`;

export default StyledContainer;
