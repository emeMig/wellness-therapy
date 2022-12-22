
import {  db } from '../../firebase'
// import router from '../../router'
// import { OPEN_SNACKBAR } from "@/store/actions/snackbar"


const state = {
  resultsList: [],
}

const mutations= {
  SET_LIST(state, payload) {
    state.resultsList = payload
  }
}

const actions= {
  searchUsers({ commit }) {
    const results = []
    db.collection("usuarios").where("category", "==", 2)
        .get()
        .then(usuarios => {            
            usuarios.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                results.push(doc.data())
            })
        })        
        commit('SET_LIST', results)
        return results

  }
}

const getters= {
  getList: () => state.resultsList,
}

export default {
  state,
  mutations,
  actions,
  getters
}