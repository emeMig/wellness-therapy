export default [
  { icon: "mdi-view-dashboard", title: "PrivateArea", name: "PrivateArea", roles: [1,2], i18n: "privateArea" },
  {
    title: "Pacientes",
    group: "pacientes",
    icon: "mdi-account-supervisor-circle",
    i18n: "pacientes",
    roles: [1,2],
    items: [
      {
        name: "Paciente1",
        title: "Paciente1",
        prependIcon: "mdi-account-supervisor-circle",
        icon: "mdi-account-check",
        i18n: "paciente1",
        roles: [1,2]
      },
      {
        name: "Paciente2",
        title: "Paciente2",
        prependIcon: "mdi-account-supervisor-circle",
        icon: "mdi-account-check",
        i18n: "paciente2",
        roles: [1,2]
      },
      {
        name: "Paciente3",
        title: "Paciente3",
        prependIcon: "mdi-account-supervisor-circle",
        icon: "mdi-account-check",
        i18n: "paciente3",
        roles: [1,2]
      }
    ],
  },
  // { icon: "mdi-note-multiple-outline", title: "GesPliegos", name: "GesPliegos", roles: [1,2], i18n: "gesPliegos" },
  // { icon: "mdi-tab", title: "GesActas", name: "GesActas", roles: [1,2], i18n: "gesActas" },
  // { icon: "mdi-playlist-edit", title: "CargaResultados", name: "CargaResultados", roles: [1,2], i18n: "cargaResultados" },
  // { icon: "mdi-account-check", title: "GesUsuarios", name: "GesUsuarios", roles: [1,2], i18n: "gesUsuarios" },

  
];
