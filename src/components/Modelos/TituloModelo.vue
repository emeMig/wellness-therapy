<template>
  <div>
    <v-card-title class="pa-3">
      <h2 class="primary--text text-shadowed title-font-bold responsive-title" >{{ titulo }}</h2>
    </v-card-title>
    <v-card-subtitle class="pa-3">
      <h3 class="primary--text" v-if="pliegoId !== null && pliegoId !== ''"> (Pliego - {{pliegoId}})</h3>
      <h3 class="primary--text" v-if="concursoId !== null && concursoId !== ''"> (Concurso - {{concursoId}})</h3>
      <h3 class="primary--text" v-if="subtitulo !== null"> {{subtitulo}}</h3>
    </v-card-subtitle>
  </div>
</template>

<script>
export default {
  name: "TituloModelo",
  props: {
    titulo: {type: String, default: () => null},
    pliegoId: {type: String, default: () => null},
    concursoId: {type: String, default: () => null},
    subtitulo: {type:String, default: () => null}
  }
}
</script>

