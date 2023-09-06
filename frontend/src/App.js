// import { GlobalStyles } from "./Global.style";
import { createGlobalStyle } from "styled-components";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// pages
import Home from "./components/Home/Home";
import HomePage from "./pages/Home";
import RequireAuth from "./features/auth/RequireAuth";
import FacturePage from "./pages/Facture"; // "./components/FactureList/FactureList";
// import EleveurList from "./components/EleveurList/EleveurList";
import EleveurPage from "./pages/Eleveur";
import ClientPage from "./pages/Client"; // "./components/ClientList/ClientList";
import AnnoncePage from "./pages/Annonce";
// import FactureClient from "./components/FactureList/FactureList";
import PartSocialePage from "./pages/PartSociale"; // "./components/ClientList/ClientList";
import Layout from "./components/Login/Layout";
import Login from "./components/Login/Login";
// import ClientList from "./"
// import DataGridPremiumDemo from "./pages/Test";
// layouts
// import RootLayout from "./layouts/RootLayout";
// import HelpLayout from "./layouts/HelpLayout";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
`;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      {/* <Route index element={<Home />} /> */}
      {/* <Route path="client/facture" element={<FactureClient />} /> */}
      {/* <Route path="test" element={<FactureList />} /> */}
      {/* <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
      <Route path="contact" element={<Contact />} /> */}
      {/* </Route> */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomePage />}>
          <Route path="eleveur" element={<EleveurPage />} />
          <Route path="facture" element={<FacturePage />} />
          <Route path="annonce" element={<AnnoncePage />} />
          <Route path="client" element={<ClientPage />} />
          <Route path="part_sociale" element={<PartSocialePage />} />
          {/* <Route path="userslist" element={<UsersList />} /> */}
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
    </>
    // <BrowserRouter>
    //   <div className="App">
    //     {/* <GlobalStyle /> */}
    //     <Sidebar />
    //     {/* <TestComponentStyle /> */}
    //     {/* <TestComponent /> */}
    //     {/* </MyButton> */}
    //     {/* <SidebarStyle></SidebarStyle> */}
    //     {/* <GlobalStyles /> */}
    //     {/* <Sidebar /> */}
    //     {/* <EleveurList /> */}
    //     {/* <EleveurForm eleveur_id="64309dadf6898e24d8547d23" /> */}
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
