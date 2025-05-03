import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import ArrowUpIcon from "@rsuite/icons/ArrowUp";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../Constant/Route";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { CustomDropdown, menuItems, UserIcon } from "./ConstantNavbar";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [shouldRenderDropdown, setShouldRenderDropdown] = useState(false);
  // აკონტროლებს unmount-ამდე დაგვიანებას
  useEffect(() => {
    if (isDropdownOpen) {
      setShouldRenderDropdown(true);
    } else {
      const timer = setTimeout(() => setShouldRenderDropdown(false), 100); // უნდა ემთხვეოდეს animation-ის ხანგრძლივობას
      return () => clearTimeout(timer);
    }
  }, [isDropdownOpen]);

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to={Routes.Home}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 "
                : "text-black hover:text-yellow-500 duration-250 "
            }
          >
            მთავარი
          </NavLink>
        </NavbarItem>
        <CustomDropdown trigger="hover" />
        <NavbarItem>
          <NavLink
            to={Routes.Contact}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 "
                : "text-black hover:text-yellow-500 duration-250 "
            }
          >
            კონტაქტი
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to={Routes.About}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 "
                : "text-black hover:text-yellow-500 duration-250 "
            }
          >
            ჩვენს შესახებ
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            startContent={<UserIcon />}
            variant="bordered"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onPress={() => navigate(Routes.Login)}
          >
            შესვლა
          </Button>
        </NavbarItem>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`} className="relative">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      setOpen(!open);
                    }}
                    className="w-full text-left text-black hover:text-yellow-500 duration-250 flex items-center gap-1"
                  >
                    {item.name} {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </button>

                  {shouldRenderDropdown && (
                    <div
                      className={`mt-2 bg-white rounded-md shadow-md z-10 transition-all transform origin-top
                ${
                  isDropdownOpen
                    ? "animate-dropdown-in"
                    : "animate-dropdown-out"
                }`}
                    >
                      {item.submenu.map((subitem, subindex) => (
                        <NavLink
                          key={subindex}
                          to={subitem.path}
                          // className="block px-4 py-2 text-black hover:text-yellow-500 duration-250"
                          className={({ isActive }) =>
                            isActive
                              ? "text-yellow-500 block px-4 py-2 duration-250  "
                              : "text-black hover:text-yellow-500 block px-4 py-2 duration-250"
                          }
                        >
                          <div className="flex flex-row gap-2">
                            <img src={subitem.img} alt="" className="w-5" />
                            {subitem.name}
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-500"
                      : "text-black hover:text-yellow-500 duration-250"
                  }
                >
                  {item.name}
                </NavLink>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
