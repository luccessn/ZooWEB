import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home";
import { Routes} from "../Constant/Route";

export const routesConfig = [
    { path: Routes.Home, Component: Home},
    { path: Routes.Login, component: Login},
    { path: Routes.Signup, Component: Signup},
    { path: Routes.NotFound, Component: NotFound},
]