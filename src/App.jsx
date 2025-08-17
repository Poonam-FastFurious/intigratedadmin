import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./assets/css/perfect-scrollbar.css";
import "./assets/css/choices.css";
import "./assets/css/apexcharts.css";
import "./assets/css/quill.css";
import "./assets/css/rangeslider.css";
import "./assets/css/custom.css";
import "./assets/css/main.css";
import Home from "./Pages/Home/Home";
import Aside from "./Pages/Home/Aside";
import Header from "./Pages/Home/Header";
import Profile from "./Pages/Settings/Profile";
import Login from "./Components/Authentication/Login";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import Websetting from "./Pages/Settings/Websetting";
import ResetPassword from "./Components/Authentication/ResetPassword";
import List from "./Pages/Finance/List";
import AddFinanceDocument from "./Pages/Finance/AddFinanceDocument";
import AddCorporateDocument from "./Pages/Corporates/AddCorporateDocument";
import ListCorporatedocs from "./Pages/Corporates/ListCorporatedocs";
import AddShareholder from "./Pages/Shareholder/AddShareholder";
import ShareHolderdocs from "./Pages/Shareholder/ShareHolderdocs";
import AddBanner from "./Pages/Banner/Addbanner";
import BannerList from "./Pages/Banner/BannerList";
import AddTeamMember from "./Pages/Teammember/AddTeamMember";
import TeamList from "./Pages/Teammember/TeamList";
import AddProduct from "./Pages/Product/AddProduct";
import ProductList from "./Pages/Product/ProductList";

function Layout() {
  const location = useLocation();
  const [sideMenu, setSideMenu] = useState(true);

  const toggleSideMenu = () => {
    setSideMenu(!sideMenu);
  };
  const hideLayoutRoutes = ["/login", "/forgot", "/Reset-password"];
  const isLoginPage = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!isLoginPage && (
        <Aside
          sideMenu={sideMenu}
          toggleSideMenu={toggleSideMenu}
          setSideMenu={setSideMenu}
        />
      )}
      <div
        className={
          !isLoginPage
            ? "tp-main-content lg:ml-[250px] xl:ml-[300px] w-[calc(100% - 300px)]"
            : "w-full"
        }
      >
        {!isLoginPage && <Header toggleSideMenu={toggleSideMenu} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Websetting />} />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/Reset-password" element={<ResetPassword />} />
          <Route path="/financials/Add" element={<AddFinanceDocument />} />
          <Route path="/financials/Documents" element={<List />} />
          <Route path="/finance/edit/:id" element={<AddFinanceDocument />} />
          <Route path="/governance/Add" element={<AddCorporateDocument />} />
          <Route path="/governance/Documents" element={<ListCorporatedocs />} />
          <Route
            path="/governance/edit/:id"
            element={<AddCorporateDocument />}
          />
          <Route path="/shareholders/Add" element={<AddShareholder />} />
          <Route path="/shareholders/Documents" element={<ShareHolderdocs />} />
          <Route path="/shareholders/edit/:id" element={<AddShareholder />} />
          <Route path="/addbanner" element={<AddBanner />} />
          <Route path="/banners" element={<BannerList />} />
          <Route path="/banner/edit/:id" element={<AddBanner />} />
          <Route path="/add-member" element={<AddTeamMember />} />
          <Route path="/team-members" element={<TeamList />} />
          <Route path="/team/edit/:id" element={<AddTeamMember />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/edit-product/:id" element={<AddProduct />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
