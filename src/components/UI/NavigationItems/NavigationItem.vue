<template>
  <v-list-item
    v-if= "show"
    :to="!href ? { name } : null"
    :href="href"
    :disabled="disabled"
    :target="target"
    rel="noopener"
    color="primary"
    ripple
  >
    <ItemIcon :icon="icon" :title="title" class="mr-3"/>
    <v-list-item-title v-text="title"></v-list-item-title>
    <v-badge inline :content="badge" v-if="badge"></v-badge>
  </v-list-item>
</template>

<script>
import ItemIcon from "./ItemIcon";
export default {
  props: {
    href: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null
    },
    badge: {
      type: String,
      default: "",
      required: false,
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  components: { ItemIcon }
};
</script>
