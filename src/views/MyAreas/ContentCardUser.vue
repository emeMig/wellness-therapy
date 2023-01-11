<template>
    <div>
        <v-card 
          v-if="publication.type === 'Texto'"
          class="px-4 py-3 relief "
        >
          <div class="d-flex justify-space-between px-5 mb-3 publication-author">
              <span>
                {{ publication.authorName }} / {{ publication.authorId }}
                <v-tooltip content-class='custom-tooltip' right>  
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-on="on" v-bind="attrs" icon color="primary" dark class="pa-0" @click="openValoration({ id: publication.authorId, name: publication.authorName} )">
                      <v-icon dense>mdi-star-circle</v-icon>
                    </v-btn> 
                  </template>
                  <span>Valorar Profesional</span>
                </v-tooltip>   
              </span>

              <span class="mt-1">{{ formatDate(publication.date) }}</span>
          </div>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <span>{{ publication.header }}</span>             
            </div>
            <h2 class="primary--text my-4">{{ publication.title }}</h2>
            <div class="text--primary">
              <div v-if="!expansion" class="text-ellipsis">
                {{ publication.content }}
              </div>
              <div v-else>
                {{ publication.content }}
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              @click="expansion = !expansion"
            >
              {{ !expansion ? 'Expandir contenido' : 'Reducir contenido' }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        <v-card 
          v-if="publication.type === 'Video'"
          class="px-4 py-3 relief"
          min-height="300px"
        >
          <div class="d-flex justify-space-between px-5 mb-3 publication-author">
            <span>{{ publication.authorName }} / {{ publication.authorId }}
              <v-tooltip content-class='custom-tooltip' right>  
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-on="on" v-bind="attrs" icon color="primary" dark class="pa-0" @click="openValoration({ id: publication.authorId, name: publication.authorName})">
                    <v-icon dense>mdi-star-circle</v-icon>
                  </v-btn> 
                </template>
                <span>Valorar Profesional</span>
              </v-tooltip> 
            </span>

            <span class="mt-1">{{ formatDate(publication.date) }}</span>
          </div>
          <v-row>
            <v-col cols="8" min-height="280px">
              <v-card-text>
                <div class="d-flex justify-space-between">
                    <span>{{ publication.header }}</span>
                    <span>{{ formatDate(publication.date) }}</span>
                </div>
                <h2 class="primary--text my-4">{{ publication.title }}</h2>
                <div class="text--primary">
              <div v-if="!expansion" class="text-ellipsis">
                {{ publication.content }}
              </div>
              <div v-else>
                {{ publication.content }}
              </div>
            </div>
              </v-card-text>
            </v-col>
            <v-col cols="4">
              <iframe 
                class="pt-2"
                width="83%"   
                height="280px"
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
              @click="expansion = !expansion"
            >
                {{ !expansion ? 'Expandir contenido' : 'Reducir contenido' }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        <v-card 
          v-if="publication.type === 'Imagen'"
          class="px-4 py-3 relief "
        >
          <div class="d-flex justify-space-between px-5 mb-3 publication-author">
            <span>{{ publication.authorName }} / {{ publication.authorId }}
              <v-tooltip content-class='custom-tooltip' right>  
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-on="on" v-bind="attrs" icon color="primary" dark class="pa-0" @click="openValoration({ id: publication.authorId, name: publication.authorName })">
                      <v-icon dense>mdi-star-circle</v-icon>
                    </v-btn> 
                  </template>
                  <span>Valorar Profesional</span>
                </v-tooltip>           
            </span>
            <span class="mt-1">{{ formatDate(publication.date) }}</span>
          </div>
          <v-row>
            <v-col cols="6" min-height="200px">
              <v-card-text>
                <div class="d-flex justify-space-between">
                    <span>{{ publication.header }}</span>
                    <span>{{ formatDate(publication.date) }}</span>
                </div>
                <h2 class="primary--text my-4">{{ publication.title }}</h2>
                <div class="text--primary">
              <div v-if="!expansion" class="text-ellipsis">
                {{ publication.content }}
              </div>
              <div v-else>
                {{ publication.content }}
              </div>
            </div>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-img :src="publication.url" :alt="publication.title" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"/>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              @click="expansion = !expansion"
            >
                {{ !expansion ? 'Expandir contenido' : 'Reducir contenido' }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
    </div>
</template>


<script>
import moment from "moment"

export default {
    name: "ContentCardUser",
    props: {
        publication: {
            Type: Object
        },
        index: {
            Type: Number
        }
    },
    data() {
        return {
            expansion: false
        }
    },
    methods: {
        formatDate(time) {
            return moment(time).format('hh:mm DD-MM-YYYY') 
        },
        openValoration(id){
          this.$emit('open-valoration', id)
        }
    }
}
</script>

<style>

</style>