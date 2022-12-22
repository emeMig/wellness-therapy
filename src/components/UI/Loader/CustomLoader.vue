<template>
    <v-dialog
        v-model="showDialog"
        persistent
        overlay-opacity=.05
        width="300" 
    >
        <v-card
            color="primary"
            dark
            class="py-3"
        >
            <v-card-text color="orange">
            {{ $t("Global.CustomLoader.loadingMessage") }}
            <v-progress-linear
                indeterminate
                color="white"
                class="mt-2 mb-0"
            ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import loader from "@/mixins/Loader";

export default {
    name: "CustomLoader",
    mixins: [loader],
    computed: {
        showDialog() {
            if (this.getLoader) {
                return this.getLoader
            }
            else return false  
        }
    }   
}
</script>
