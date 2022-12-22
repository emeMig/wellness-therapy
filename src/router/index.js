import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { auth } from "../firebase"

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehviour(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {

    const usuario = auth.currentUser

    console.log("desde router", usuario)


    if(usuario === null) {
      next({ name: 'Login'})      
    } else {
      next();
    }
    
  }
  else {
    next()
  }
})

export default router;
