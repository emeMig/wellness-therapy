
import { auth, db } from '../../firebase'
import router from '../../router'
import { OPEN_SNACKBAR } from "@/store/actions/snackbar"


const state = {
  loggedUser: null,

}

const mutations= {
  SET_USUARIO(state, payload) {
    state.loggedUser = payload
    localStorage.setItem('profile',JSON.stringify(state.loggedUser))
  },
  SET_MESSAGES(state, payload) {
    state.loggedUser.messages = payload
  },
  ADD_PATIENT(state, payload) {
    state.loggedUser.patients.push(payload)
  },
  DELETE_PATIENT(state, payload) {
    state.loggedUser.patients = state.loggedUser.patients.filter(p => p.id !== payload)
  },
  LOAD_STORAGE(state, payload) {
    state.loggedUser = payload
  }
}

const actions= {
  loadLocalStorage({ commit }) {
    if (localStorage.getItem('profile')) {
      commit( 
        'LOAD_STORAGE', 
        JSON.parse(localStorage.getItem('profile')) 
        )
      return
    }
    localStorage.setItem('profile', JSON.stringify({}))
  },

  createUser({commit, dispatch}, usuario) {
    auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        const createdUser = {
          email: res.user.email,
          uid: res.user.uid,         
        }
        // creamos la coleccion asociada al usuario genérico
        if ( usuario.category === 1) {
          db.collection("usuariosGenericos").doc(res.user.email).set({
            category: usuario.category,
            pros: [],
            messages: []
          })
          .then(() => {
            createdUser.category = usuario.category
            commit('SET_USUARIO', createdUser)            
            router.push('/buscador')
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
        }

        // creamos la coleccion asociada al usuario profesional
        if ( usuario.category === 2) {
          db.collection("usuariosProfesionales").doc(res.user.email).set({
            category: usuario.category,
            surname: usuario.surname,
            lastname: usuario.lastname,
            speciality: usuario.speciality,
            city: usuario.city,
            plan: usuario.plan,
            description: usuario.description,
            valorations: [],
            patients: [],
            messages: [],
            publications: []
          })
          .then(() => {
            createdUser.category = usuario.category
            commit('SET_USUARIO', createdUser)            
            router.push('/private')
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
        }  
      })
  },
  logUser({commit, dispatch}, usuario) {
    auth.signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        const loggedUser = {
          email: res.user.email,
          uid: res.user.uid
        }
        // probamos recuperar usuario generico, 
        // si no existe recuperamos usuario profesional       
        db.collection("usuariosGenericos").doc(res.user.email).get()
        .then( doc => { 
          if (doc.exists) {
            loggedUser.category = doc.data().category
            loggedUser.pros = doc.data().pros
            loggedUser.messages = doc.data().messages
            commit('SET_USUARIO', loggedUser)

            router.push('/buscador')
            dispatch(OPEN_SNACKBAR, {
              text: 'Usuario logado correctamente',
              color: 'success',
              y: 'bottom',
              x: 'right',
              icon: "mdi-check",
              timeout: 4000
            }) 
          }
          else { 
            db.collection("usuariosProfesionales").doc(res.user.email).get()
            .then( doc => { 
              if (doc.exists) {
                loggedUser.category = doc.data().category
                loggedUser.surname = doc.data().surname
                loggedUser.lastname = doc.data().lastname
                loggedUser.speciality = doc.data().speciality
                loggedUser.city = doc.data().city
                loggedUser.plan = doc.data().plan
                loggedUser.description = doc.data().description
                loggedUser.valorations = doc.data().valorations
                loggedUser.patients = doc.data().patients
                loggedUser.messages = doc.data().messages
                commit('SET_USUARIO', loggedUser)
                router.push('/private')
                dispatch(OPEN_SNACKBAR, {
                  text: 'Usuario logado correctamente',
                  color: 'success',
                  y: 'bottom',
                  x: 'right',
                  icon: "mdi-check",
                  timeout: 4000
                }) 
              }
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
          }          
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
        localStorage.clear()
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
  },
  updateMessages({ commit }, messages) {
    commit('SET_MESSAGES', messages)
  },
  updatePatients({ commit }, paciente) {
    commit('ADD_PATIENT', paciente)
  },
  deletePat({ commit }, pacienteId) {
    commit('DELETE_PATIENT', pacienteId)
  }
}

const getters= {
  getUser: () => state.loggedUser,
  getMessages: () => state.loggedUser.messages,
  getPatients: () => state.loggedUser.patients,
  getPros: () => state.loggedUser.pros
}

export default {
  state,
  mutations,
  actions,
  getters
}
