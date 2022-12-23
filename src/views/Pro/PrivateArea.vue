<template>
  <v-container fluid>
    <v-row class="pt-4">
      <v-col cols="9">
        <titulo titulo="Área Privada de Contenidos"/>
      </v-col>
      <v-col cols="3">
        <v-btn color="primary" dark class="mt-3 mx-8 justify-end" @click="addContenido">
          <span class="ma-2">Publicación</span>
          <v-icon dense>mdi-plus-thick</v-icon>
        </v-btn>
      </v-col>    
    </v-row>

    <v-row class="mt-0">
      <v-col 
        v-for="(publication,index) in publications" 
        :key = "index"
        :cols="publication.size === 'full' ? '12' : '6'"      
      >
        <v-card 
          v-if="publication.type === 'Texto'"
          class="px-4 py-3 relief "
        >
          <v-card-text>
            <div>{{ publication.preTitle }}</div>
            <h2 class="primary--text my-4">{{ publication.title }}</h2>
            <div class="text--primary">
              {{ publication.content }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              @click="reveal = true"
            >
              Expandir Contenido
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="deletePublication(index)" icon><v-icon>mdi-delete</v-icon></v-btn>
          </v-card-actions>
        </v-card>
        <v-card 
          v-if="publication.type === 'Video'"
          class="px-4 py-3 relief "
        >
          <v-row min-height="300px">
            <v-col cols="8" min-height="300px">
              <v-card-text>
                <div>{{ publication.preTitle }}</div>
                <h2 class="primary--text my-4">{{ publication.title }}</h2>
                <div class="text--primary">
                  {{ publication.content }}
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <iframe 
                class="pt-2"
                width="80%"   
                height="120%"
                :src="publication.url" 
                title="publication.title" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              >
              </iframe>              
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              @click="reveal = true"
            >
              Expandir Contenido
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="deletePublication(index)" icon><v-icon>mdi-delete</v-icon></v-btn>
          </v-card-actions>
        </v-card>
        <v-card 
          v-if="publication.type === 'Imagen'"
          class="px-4 py-3 relief "
        >
          <v-row>
            <v-col cols="6" min-height="200px">
              <v-card-text>
                <div>{{ publication.preTitle }}</div>
                <h2 class="primary--text my-4">{{ publication.title }}</h2>
                <div class="text--primary">
                  {{ publication.content }}
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-img :src="publication.url" :alt="publication.title"/>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              @click="reveal = true"
            >
              Expandir Contenido
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="deletePublication(index)" icon><v-icon>mdi-delete</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>    
    </v-row>
    <content-dialog
      v-if="openContentDialog"
      :activate="openContentDialog"
      @close-dialog="openContentDialog=false"
      @add-publication="addPublication"
    >
    </content-dialog>
    <confirm-dialog 
            ref="confirmDialog"
            message="¿Desea borrar esta publicación?"
        />
  </v-container>
</template>

<script>
import Titulo from "@/components/Modelos/TituloModelo";
import ContentDialog from "@/components/UI/Dialogs/ContentDialog.vue"
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
export default {
  name: "AreaPrivada",
  components: {
    Titulo,
    ContentDialog,
    ConfirmDialog
  },
  data() {
    return {
      openContentDialog: false,
      publications: [
        {
          header: 'Publicación 1',
          title: 'Titulo1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          size: 'full',
          type: 'Texto',
          url: ''
        },
        {
          header: 'Publicación 2',
          title: 'Titulo2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          size: '',
          type: 'Texto',
          url: ''
        },
        {
          header: 'Publicación 3',
          title: 'Titulo3',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          size: '',
          type: 'Texto',
          url: ''
        },
        {
          header: 'Publicación 4',
          title: 'Titulo4',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          size: 'full',
          type: 'Video',
          url: 'https://www.youtube.com/embed/XXXaoKi7IY0'
        },
        {
          header: 'Publicación 5',
          title: 'Titulo5',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          size: 'full',
          type: 'Imagen',
          url: 'https://www.mgc.es/wp-content/uploads/2020/04/mindfulness-playa.jpg'
        },
      ]
    }
  },
  methods: {
    addContenido() {
      this.openContentDialog = true
    },
    addPublication(publication) {
      console.log(publication);
      this.publications.unshift(publication)
    },
    async deletePublication(index) {
      const confirm = await this.$refs.confirmDialog.open() 
        if(!confirm){
            return    
        }
        else {
            this.publications.splice(index,1)
        }
      }
  }


}
</script>

<style>

</style>