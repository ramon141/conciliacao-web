// import
import Dashboard from "views/Dashboard/Dashboard";
import Driver from "views/Dashboard/Driver";
import Transactions from "views/Dashboard/Transactions";
import Profile from "views/Dashboard/Profile";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  PersonIcon,
  RocketIcon,
} from "components/Icons/Icons";
import Enterprise from "views/Dashboard/Enterprise";
import { CarIcon } from "components/Icons/Icons";
import { EnterpriseIcon } from "components/Icons/Icons";
import Receipt from "views/Dashboard/Receipt";
import Cash from "./views/Dashboard/Cash";

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
    path: "/receipt",
    name: "Recibos",
    icon: <EnterpriseIcon color="inherit" />,
    component: Receipt,
    layout: "/admin",
  },
  {
    path: "/transaction/:id/:type",
    name: "Transações",
    icon: <EnterpriseIcon color="inherit" />,
    component: Transactions,
    redirect: true,
    layout: "/admin",
  },
  {
    path: "/cash",
    name: "Caixa",
    icon: <EnterpriseIcon color="inherit" />,
    component: Cash,
    layout: "/admin",
  },
  {
    name: "CONTA",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile/:id/:type",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        redirect: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/",
        name: "Sair",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];


export default dashRoutes;
