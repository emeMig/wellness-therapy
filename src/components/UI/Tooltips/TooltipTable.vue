<template>
  <v-tooltip content-class='custom-tooltip' :bottom="bottom" :left="left" :right="right">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-if="isIcon" :color="color" size="20" class="mr-3" v-bind="attrs" v-on="on" :disabled="disabled"
              delay-open="200" :open-on-click="false" :open-on-focus="false" @click="$emit('custom-action',item)">
        {{icon}}
      </v-icon>
      <span v-else v-bind="attrs" v-on="on">{{value}}</span>
    </template>
    <span>{{description}}</span>
  </v-tooltip>
</template>

<script>

export default{
  name:"TooltipTable",
  props: {
    bottom: { type:Boolean, default: () => true},
    right: { type:Boolean, default: () => false},
    left: { type:Boolean, default: () => false},
    isIcon: { type:Boolean, default: () => false},
    disabled: { type:Boolean, default: () => false},
    value: {type:String, default: () => ""},
    description: {type: String, default: () => ""},
    color: {type:String, default: () => "" },
    icon: {type:String, default: () => "" },
    item:{type:Object, default: () => {}}
  }
}
</script>
