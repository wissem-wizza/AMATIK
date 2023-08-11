// import { GlobalStyles } from "./Global.style";
import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// pages
import Home from "./components/Home/Home";
import FacturePage from "./pages/Facture"; // "./components/FactureList/FactureList";
// import EleveurList from "./components/EleveurList/EleveurList";
import EleveurPage from "./pages/Eleveur";
import ClientPage from "./pages/Client"; // "./components/ClientList/ClientList";
import AnnoncePage from "./pages/Annonce";
import FactureClient from "./components/FactureList/FactureList";
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
    <Route path="/" element={<Home />}>
      {/* <Route index element={<Home />} /> */}
      <Route path="eleveur" element={<EleveurPage />} />
      <Route path="facture" element={<FacturePage />} />
      <Route path="annonce" element={<AnnoncePage />} />
      <Route path="client" element={<ClientPage />} />
      <Route path="client/facture" element={<FactureClient />} />
      {/* <Route path="test" element={<FactureList />} /> */}
      {/* <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} /> */}
      {/* </Route> */}
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
