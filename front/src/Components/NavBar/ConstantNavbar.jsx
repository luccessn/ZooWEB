import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "rsuite";
import { Routes } from "../../Constant/Route";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import ArrowUpIcon from "@rsuite/icons/ArrowUp";
import { NavLink } from "react-router-dom";

const categoryList = [
  {
    name: "ძაღლი",
    path: Routes.Dog,
    img: "https://i.postimg.cc/5ySjQbXW/dog.png",
    subcategories: [
      { name: "მშრალი საკვები", path: "/dog/dry-food" },
      { name: "სველი საკვები", path: "/dog/wet-food" },
      { name: "სათამაშოები", path: "/dog/toys" },
    ],
  },
  {
    name: "კატა",
    path: Routes.Cat,
    img: "https://i.postimg.cc/HW9L2Wkf/cat.png",
    subcategories: [
      { name: "მშრალი საკვები", path: "/cat/dry-food" },
      { name: "სველი საკვები", path: "/cat/wet-food" },
      { name: "სათამაშოები", path: "/cat/toys" },
    ],
  },
  {
    name: "თევზი",
    path: Routes.Fish,
    img: "https://i.postimg.cc/J47zdwyt/clown-fish.png",
    subcategories: [
      { name: "საკვები", path: "/fish/food" },
      { name: "აქსესუარები", path: "/fish/accessories" },
    ],
  },
  {
    name: "ფრინველი",
    path: Routes.Bird,
    img: "https://i.postimg.cc/9f9mqCkg/parrot.png",
    subcategories: [
      { name: "საკვები", path: "/bird/food" },
      { name: "სათამაშოები", path: "/bird/toys" },
    ],
  },
  {
    name: "მღრღნელი",
    path: Routes.Mouse,
    img: "https://i.postimg.cc/rmL817XV/hamster.png",
    subcategories: [
      { name: "საკვები", path: "/mouse/food" },
      { name: "დასადგომი", path: "/mouse/housing" },
    ],
  },
];

export const CustomDropdown = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activePaths = categoryList.map((c) => c.path);
  const isActive = activePaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <Dropdown
      {...props}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderToggle={(props, ref) => (
        <span
          ref={ref}
          {...props}
          className={`cursor-pointer duration-250 flex items-center gap-1 ${
            isActive ? "text-yellow-500" : "text-black hover:text-yellow-500"
          }`}
        >
          კატეგორია {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </span>
      )}
    >
      <div className="w-40">
        {categoryList.map((category) => (
          <Dropdown.Menu
            key={category.name}
            title={
              <NavLink
                className="flex items-center gap-2 cursor-pointer hover:text-yellow-500"
                to={category.path}
              >
                <img src={category.img} alt={category.name} className="w-5" />
                {category.name}
              </NavLink>
            }
            className="w-40"
          >
            {category.subcategories.map((sub) => (
              <Dropdown.Item key={sub.path} as={NavLink} to={sub.path}>
                {sub.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        ))}
      </div>
    </Dropdown>
  );
};
//
//User Logo
export const UserIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
          data-name="Stroke 1"
        />
        <path
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
          data-name="Stroke 3"
        />
      </g>
    </svg>
  );
};
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

//
//
//ConstanMenusDrop Menu
export const menuItems = [
  { name: "მთავარი", path: Routes.Home },
  {
    name: "კატეგორია",
    submenu: [
      {
        name: "ძაღლი",
        path: Routes.Dog,
        img: "https://i.postimg.cc/5ySjQbXW/dog.png",
      },
      {
        name: "კატა",
        path: Routes.Cat,
        img: "https://i.postimg.cc/HW9L2Wkf/cat.png",
      },
      {
        name: "თევზი",
        path: Routes.Fish,
        img: "https://i.postimg.cc/J47zdwyt/clown-fish.png",
      },
      {
        name: "ფრინველი",
        path: Routes.Bird,
        img: "https://i.postimg.cc/9f9mqCkg/parrot.png",
      },
      {
        name: "მღრღნელი",
        path: Routes.Mouse,
        img: "https://i.postimg.cc/rmL817XV/hamster.png",
      },
    ],
  },
  { name: "კონტაქტი", path: Routes.Contact },
  { name: "ჩვენს შესახებ", path: Routes.About },
];
