import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home";
import { Routes } from "../Constant/Route";
import ContactUs from "../Pages/Contact/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import DogMain from "../Pages/Products/DogMain";
import CatMain from "../Pages/Products/CatMain";
import FishMain from "../Pages/Products/FishMain";
import BirdMain from "../Pages/Products/BirdMain";
import MouseMain from "../Pages/Products/MouseMain";

export const routesConfig = [
  { path: Routes.Home, Component: Home },
  { path: Routes.Login, Component: Login },
  { path: Routes.Signup, Component: Signup },
  { path: Routes.Contact, Component: ContactUs },
  { path: Routes.About, Component: AboutUs },
  { path: Routes.Dog, Component: DogMain },
  { path: Routes.Cat, Component: CatMain },
  { path: Routes.Fish, Component: FishMain },
  { path: Routes.Bird, Component: BirdMain },
  { path: Routes.Mouse, Component: MouseMain },
  { path: Routes.NotFound, Component: NotFound },
];
