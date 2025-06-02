/* eslint-disable react/prop-types */
import { Blocks, ChevronRight, Grid2x2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo/kafal logo.png";
function Aside({ sideMenu, setSideMenu }) {
  const [isMobile, setIsMobile] = useState(false);
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { id: 0, label: "Dashboard", icon: <Grid2x2 size={18} />, link: "/" },
  ];
  return (
    <>
      <div className="tp-main-wrapper bg-slate-100 ">
        <aside
          className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray  sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${
            sideMenu && isMobile
              ? "translate-x-0"
              : !isMobile
              ? "translate-x-0"
              : "-translate-x-[300px]"
          }`}
        >
          <div className="py-4 pb-8 px-8 border-b border-gray h-[90px]  bg-gray-600">
            <Link to="/">
              <img className="w-[140px]  " src={logo} alt="Logo" />
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
                      <span className="mr-2">{icon}</span>
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

            <div>
              <Link
                onClick={() => setNav(nav !== 9 ? 9 : null)}
                className={`group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 hover:bg-gray sidebar-link-active ${
                  nav === 9
                    ? "bg-themeLight hover:bg-themeLight text-theme"
                    : ""
                }`}
                to="#"
              >
                <span className="inline-block translate-y-[1px] mr-[10px] text-xl">
                  <Blocks />
                </span>
                Blogs
                <span
                  className={`absolute right-4 transition-transform duration-300 origin-center w-4 h-4 ${
                    nav === 9 ? "rotate-90" : ""
                  }`}
                >
                  <ChevronRight size={18} />
                </span>
              </Link>
              {nav === 9 && (
                <ul className="pl-[42px] pr-[20px] pb-3">
                  <li>
                    <Link
                      to="/Blog-list"
                      className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Add-blog"
                      className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
                    >
                      Add Blog
                    </Link>
                  </li>
                </ul>
              )}
            </div>
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
