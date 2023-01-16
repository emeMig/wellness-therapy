
export default [
  {
    params: {
      path: "/login",
      name: "Login",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Authentication/Login/Login",
  },
  {
    params: {
      path: "/register",
      name: "Register",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Authentication/Login/Register",
  },
  {
    params: {
      path: "/forgot-password",
      name: "ForgotPass",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Authentication/Login/ForgotPass",
  },
  {
    params: {
      path: "/buscador",
      name: "Buscador",
      meta: { requiresAuth: true },
    },
    defaultComponentPath: "Buscador/Buscador",
    navs: true,
  },
  {
    params: {
      path: "/myareas",
      name: "MyAreas",
      meta: { requiresAuth: true },
    },
    defaultComponentPath: "MyAreas/MyAreas",
    navs: true,
  },
  {
    params: {
      path: "/private",
      name: "PrivateArea",
      meta: { requiresAuth: true },
    },
    defaultComponentPath: "Pro/PrivateArea",
    navs: true,
  },
  {
    params: {
      path: "/pacientes/:id",
      name: "Pacientes",
      meta: { requiresAuth: true },
    },
    defaultComponentPath: "Pro/Paciente",
    navs: true,
  },
  {
    params: {
      path: "*",
      name: "PageNotFound",
      meta: { layout: "full" },
    },
    defaultComponentPath: "Error",
  },
];
