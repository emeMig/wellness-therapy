
import { auth, db } from '../../firebase'
import router from '../../router'
import { OPEN_SNACKBAR } from "@/store/actions/snackbar"


const state = {
  loggedUser: null,
}

const mutations= {
  SET_USUARIO(state, payload) {
    state.loggedUser = payload
  }
}

const actions= {
  createUser({commit, dispatch, state}, usuario) {
    // TODO...
    auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        const createdUser = {
          email: res.user.email,
          uid: res.user.uid,         
        }
        // creamos la coleccion asociada al usuario
        db.collection("usuarios").doc(res.user.email).set({
          category: usuario.category,
          surname: usuario.surname,
          lastname: usuario.lastname,
          speciality: usuario.speciality,
          city: usuario.city,
          plan: usuario.plan,
          valoration: 3
        })
        .then(() => {
          createdUser.category = usuario.category
          commit('SET_USUARIO', createdUser)

          const main = state.loggedUser.category === 1 ? '/buscador' : '/private' 
          router.push(main)

          dispatch(OPEN_SNACKBAR, {
            text: 'Usuario creado correctamente',
            color: 'success',
            y: 'bottom',
            x: 'right',
            icon: "mdi-check",
            timeout: 4000
          })
        })
        .catch(error => {
          dispatch(OPEN_SNACKBAR, {
            text: error.message,
            color: 'error',
            y: 'bottom',
            x: 'right',
            icon: "mdi-alert-octagon-outline",
            timeout: 4000
          })
        })
      })
  },
  logUser({commit, dispatch, state}, usuario) {
    auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        const loggedUser = {
          email: res.user.email,
          uid: res.user.uid
        }
        db.collection("usuarios").doc(res.user.email).get()
        .then( doc => { 
          loggedUser.category = doc.data().category
          loggedUser.surname = doc.data().surname
          loggedUser.lastname = doc.data().lastname
          loggedUser.speciality = doc.data().speciality
          loggedUser.city = doc.data().city
          loggedUser.plan = doc.data().plan
          loggedUser.valoration = doc.data().valoration
        
          commit('SET_USUARIO', loggedUser)
          const main = state.loggedUser.category === 1 ? '/buscador' : '/private' 
          router.push(main)

          dispatch(OPEN_SNACKBAR, {
            text: 'Usuario logado correctamente',
            color: 'success',
            y: 'bottom',
            x: 'right',
            icon: "mdi-check",
            timeout: 4000
          })
        })
      })      
      .catch(error => {
        dispatch(OPEN_SNACKBAR, {
          text: error.message,
          color: 'error',
          y: 'bottom',
          x: 'right',
          icon: "mdi-alert-octagon-outline",
          timeout: 4000
        })
      })
  },
  logoutSession({dispatch, commit}){
    auth.signOut()
      .then(()=> {
        commit('SET_USUARIO', null)
        dispatch(OPEN_SNACKBAR, {
          text: 'Sesión cerrada correctamente',
          color: 'success',
          y: 'bottom',
          x: 'right',
          icon: "mdi-check",
          timeout: 4000
        })
      }
    )
  },
  detectUser({ commit }, usuario) {
    commit('SET_USUARIO', usuario)
  }
}

const getters= {
  getUser: () => state.loggedUser,
}

export default {
  state,
  mutations,
  actions,
  getters
}
