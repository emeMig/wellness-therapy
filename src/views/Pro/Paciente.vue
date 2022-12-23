<template>
  <v-container fluid >
    <v-row class="pt-4">
      <v-col cols="12">
        <titulo 
          titulo="Área de Paciente" 
          subtitulo="Paciente1"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="3">
        <v-card
          class="px-4 py-3 relief"
        >
        <v-card-title>
          <h3 class="text-shadowed title-font-bold responsive-title">Perfil</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Nombre"
                value="Jose Ramón"          
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
              label="Apellido"
              value="Sánchez García"        
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Dirección"
                value="" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Ciudad"
                value="Madrid" 
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Teléfono"
                value="666 861 245" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols ="8">
              <v-text-field
                label="email"
                value="jsrm@hotmail.com" 
              ></v-text-field>
            </v-col>
            <v-col cols ="2">
            <v-text-field
              label="Género"
              value="M" 
            ></v-text-field>
          </v-col>
            <v-col cols ="2">
              <v-text-field
                label="Edad"
                value="37" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Estudios"
                value="" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Profesión"
                value="Técnico odontológico" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Medios de pago"
                value="Transferencia bancaria" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Datos bancarios"
                value="" 
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="3">
        <v-card
          class="px-4 py-3 relief"
        >
        <v-card-title>
          <h3 class="text-shadowed title-font-bold responsive-title">Encuadre</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-textarea
                label="ANTECEDENTES" 
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"         
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="HISTORIAL CLÍNICO" 
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"          
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="TRATAMIENTOS"
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"           
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="OBSERVACIONES"
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"           
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>  
        </v-card>
      </v-col>
      <v-col lg="6">
        <v-card
          class="px-4 py-3 relief"
        >
        <v-card-title>
          <h3 class="text-shadowed title-font-bold responsive-title">Sesiones</h3>
        </v-card-title>
          <v-card-text>
              <v-data-table 
                class="crud-table expanded-crud-table px-6 relief"
                :headers="headers"
                :items="items"
                :single-expand="true"
                :expanded.sync="expanded"
                :item-key="id"
                :show-expand="true"
              >

              <template v-slot:top>
                <v-toolbar flat color="transparent" class="py-4">
                  <v-spacer/>
                  <v-btn color="primary" dark class="mb-6" @click="newSesion">
                    <div class="ma-2 px-2">Nueva Sesión</div>
                    <v-icon dense>mdi-plus-thick</v-icon>
                  </v-btn>
                </v-toolbar>
              </template>  

              <template v-if="!hideExpansion" #[`expanded-item`]="{ headers, item }">
                <td :colspan="headers.length" class="relief-inset">
                  <div v-for="(v, key) in item" :key="key">
                    {{ v.date}}
                    {{ v.name}}
                  </div>
                  <v-row>
                    <v-col cols="6">
                      <v-textarea
                        label="ANOTACIONES"
                        counter
                        clearable
                        filled
                        shaped
                        auto-grow
                        rows="4"
                        row-height="30"           
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <v-textarea
                        label="TAREAS"
                        counter
                        clearable
                        filled
                        shaped
                        auto-grow
                        rows="4"
                        row-height="30"           
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  
  
</template>
  
  <script>
  import Titulo from "@/components/Modelos/TituloModelo"
  export default {
    name: "Paciente",
    components: {
      Titulo,
    },
    data() {
      return {
        items: [
          { id: 1, date: '01-11-2022', name: 'sesión inicial', duration: '50m'},
          { id: 2, date: '08-11-2022', name: 'sesión de encuadre', duration: '50m'},
          { id: 3, date: '15-11-2022', name: 'sesión autoestima', duration: '50m'},
        ],
        headers: [
          { text: '', value: 'data-table-expand' },
          { text: 'Numero sesión', value: 'id', align: 'left', sortable: true},
          { text: 'Fecha', value: 'date', align: 'left', sortable: true},
          { text: 'Nombre Sesión', value: 'name', align: 'center', sortable: true},
          { text: 'Duración', value: 'duration', align: 'center', sortable: true},
        ]
      }
    },
    methods: {
      newSesion(){
    
      }
    }

  }
  </script>
  
  <style>
  
  </style>