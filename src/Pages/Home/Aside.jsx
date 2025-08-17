/* eslint-disable react/prop-types */
import {
  Building,
  ChevronRight,
  Grid2x2,
  Image,
  IndianRupee,
  Settings,
  Share,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Aside({ sideMenu, setSideMenu }) {
  const [isMobile, setIsMobile] = useState(false);
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      id: 0,
      label: "Dashboard",
      icon: <Grid2x2 size={18} />,
      link: "/",
    },
    {
      id: 1,
      label: "Financials",
      icon: <IndianRupee size={18} />,
      subMenu: [
        { label: "Add", link: "/financials/Add" },
        { label: "Documents", link: "/financials/Documents" },
      ],
    },
    {
      id: 2,
      label: "Corporate ",
      icon: <Building size={18} />,
      subMenu: [
        { label: "Add", link: "/governance/Add" },
        { label: "Documents", link: "/governance/Documents" },
      ],
    },
    {
      id: 3,
      label: "Shareholders ",
      icon: <Share size={18} />,
      subMenu: [
        { label: "Add", link: "/shareholders/Add" },
        { label: "Documents", link: "/shareholders/Documents" },
      ],
    },
    {
      id: 4,
      label: "Banners",
      icon: <Image size={18} />,
      subMenu: [
        { label: "Add", link: "/addbanner" },
        { label: "Banners", link: "/banners" },
      ],
    },
    {
      id: 5,
      label: "Teammembers",
      icon: <User size={18} />,
      subMenu: [
        { label: "Add", link: "/add-member" },
        { label: "team-members", link: "/team-members" },
      ],
    },
    {
      id: 6,
      label: "Products",
      icon: <Image size={18} />, // you can choose another icon if preferred
      subMenu: [
        { label: "Add", link: "/add-product" },
        { label: "Products", link: "/products" },
      ],
    },
    {
      id: 7,
      label: "Website Settings",
      icon: <Settings size={18} />,
      link: "/settings",
    },
  ];

  return (
    <>
      <div className="tp-main-wrapper bg-slate-100 ">
        <aside
          className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${
            sideMenu && isMobile
              ? "translate-x-0"
              : !isMobile
              ? "translate-x-0"
              : "-translate-x-[300px]"
          }`}
        >
          <div className="py-4 pb-8 px-8 border-b border-gray h-[90px] ">
            <Link to="/">
              <img
                className=""
                src={
                  "https://i0.wp.com/integratedindustries.in/wp-content/uploads/2023/03/logo2.png?fit=822%2C267&ssl=1"
                }
                alt="Logo"
              />
            </Link>
          </div>

          <div className="px-4 py-5">
            <ul>
              {menuItems.map(({ id, label, icon, link, subMenu }) => (
                <li key={id}>
                  <Link
                    onClick={() => setNav(nav !== id ? id : null)}
                    className={`group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-link-active ${
                      nav === id ? "bg-themeLight text-theme" : ""
                    }`}
                    to={link || "#"}
                  >
                    <span className="inline-block mr-[10px] text-xl">
                      {icon}
                    </span>
                    {label}
                    {subMenu && (
                      <span
                        className={`absolute right-4 transition-transform ${
                          nav === id ? "rotate-90" : ""
                        }`}
                      >
                        <ChevronRight size={18} />
                      </span>
                    )}
                  </Link>

                  {nav === id && subMenu && (
                    <ul className="pl-[42px] pr-[20px] pb-3">
                      {subMenu.map(({ label, link }) => (
                        <li key={label}>
                          <Link
                            to={link}
                            className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {isMobile && (
        <div
          className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300 ${
            sideMenu ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={() => setSideMenu(!sideMenu)}
        ></div>
      )}
    </>
  );
}

export default Aside;
