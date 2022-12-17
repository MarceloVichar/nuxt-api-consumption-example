<template>
  <div class="w-full input input-bordered flex items-center h-9">
    <InputColorPicker
      v-model="color"
      class="!w-full !border-base-100"
      @input="$emit('input', color === 'rgba(0, 0, 0, 0)' ? '#FFFFFF' : color)"
      @change="$emit('input', color === 'rgba(0, 0, 0, 0)' ? '#FFFFFF' : color)"
    />
  </div>
</template>

<script>
import InputColorPicker from 'vue-native-color-picker'
export default {
  name: 'ColorPicker',
  components: {
    InputColorPicker
  },
  props: {
    value: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      color: this.value
    }
  },
  watch: {
    value: {
      handler (val) {
        this.color = val
      }
    }
  }
}
</script>

<style scoped>
.icp__input {
  height: 20px !important;
}
</style>
