<template>
      <v-container fluid class="fill-width py-2">
      <v-sheet class="relief with-radius">
        <v-card class="relief">
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="crud-table expanded-crud-table px-6 relief"
            single-expand
            show-expand
            item-key="lastname"
            :expanded.sync="expanded"
            @click:row="clickRow"
        >
        
        <template #[`expanded-item`]="{ headers, item }">
          <td :colspan="headers.length" class="relief-inset">
            <expansion-busqueda 
              :item="item" 
              :headers="headers"  
            />
          </td>
        </template>

        <template #[`item.valorations`]="{ value }">
              <div>
                <star-rating 
                  :rating="getAverageValoration(value)"
                  read-only
                  :increment=0.01
                  :star-size=19
                  active-color="#FFA726"
                  :show-rating=false
                  :padding=0.5               
                ></star-rating>
              </div>
        </template>


        </v-data-table>
        </v-card>
      </v-sheet>
    </v-container>
</template>

<script>
import StarRating from 'vue-star-rating'
import ExpansionBusqueda from './ExpansionBusqueda.vue'
export default {
    name: 'resultados',
    components: {
        ExpansionBusqueda,
        StarRating
    },
    props: {
        items: {
            type: Array,
            default: () => []
        },
        headers: {
            type: Array,
            default: () => []
        }
    },
    data() {
      return {
        expanded: []
      }
    },
    methods: {
      clickRow(item, event) {
        if(event.isExpanded) {
          const index = this.expanded.findIndex(i => i === item);
          this.expanded.splice(index, 1)
        } else 
          this.expanded.push(item);
      },
      getAverageValoration(valorations) {
        return valorations.reduce((a, b) => (a + b)) / valorations.length;
      }
    }

}
</script>

<style>

</style>