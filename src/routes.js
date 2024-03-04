// import
import Dashboard from "views/Dashboard/Dashboard";
import Driver from "views/Dashboard/Driver";
import Billing from "views/Dashboard/Billing";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";
import Enterprise from "views/Dashboard/Enterprise";
import { CarIcon } from "components/Icons/Icons";
import { EnterpriseIcon } from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Painel Informativo",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/driver",
    name: "Motorista",
    icon: <CarIcon color="inherit" />,
    component: Driver,
    layout: "/admin",
  },
  {
    path: "/enterprise",
    name: "Empresas",
    icon: <EnterpriseIcon color="inherit" />,
    component: Enterprise,
    layout: "/admin",
  },
  {
    path: "/transaction",
    name: "teste",
    icon: <EnterpriseIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },
  {
    name: "CONTA",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];


export default dashRoutes;
