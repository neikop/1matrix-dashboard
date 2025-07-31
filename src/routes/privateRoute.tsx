import { Guide } from "views/Component"
import { Home } from "views/Home"

const privateRoute = {
  guide: {
    component: Guide,
    name: "Component",
    path: "/component",
  },
  home: {
    component: Home,
    name: "Dashboard",
    path: "/dashboard",
  },
}

export default privateRoute
