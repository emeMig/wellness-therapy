import LazyLoad from "@/utils/AsyncRouteHelper";
import AppRoutes from "./routes/app-routes";
const AppSidebar = () =>
  import(
     "@/layouts/App/Sidebar"
  );
const AppToolbar = () =>
  import(
    "@/layouts/App/Toolbar"
  );
const AppFooter = () =>
  import(
    "@/layouts/App/Footer"
  );

const AllRoutes = [...AppRoutes];
const routes = AllRoutes.map((route) => {
  const { params, defaultComponentPath, navs } = route;
  const componentObj = navs
    ? {
        components: {
          default: LazyLoad(defaultComponentPath),
          sidebar: AppSidebar,
          header: AppToolbar,
          footer: AppFooter,
        },
      }
    : {
        component: LazyLoad(defaultComponentPath),
      };
  return {
    ...params,
    ...componentObj,
  };
});

export default [{ path: "/", redirect: "/login" }, ...routes];
