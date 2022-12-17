<template>
  <form class="grid sm:grid-cols-2 gap-4" @submit.prevent="$emit('input', mutableForm)">
    <div>
      <label for="bg_color">Background Color</label>
      <ColorPicker v-model="mutableForm.data.bg_color" />
    </div>
    <div>
      <label for="bg_color">Text Color</label>
      <ColorPicker v-model="mutableForm.data.text_color" />
    </div>
    <label class="cursor-pointer flex items-center gap-2">
      <input v-model="isActive" type="checkbox" class="checkbox">
      <span>Active</span>
    </label>
    <div class="col-span-2 flex justify-end">
      <button type="submit" class="btn btn-success btn-outline">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import ColorPicker from '@/components/shared/ColorPicker.vue'

export default {
  name: 'ColorsTemplateForm',
  components: { ColorPicker },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isActive: false,
      mutableForm: {
        data: {
          bg_color: '#ffffff',
          text_color: '#ffffff',
          active: 0
        }
      }
    }
  },
  watch: {
    isActive (val) {
      val
        ? this.mutableForm.data.active = 1
        : this.mutableForm.data.active = 0
    }
  },
  created () {
    this.mutableForm = Object.assign({}, this.value)
    this.setIsActive()
  },
  methods: {
    setIsActive () {
      if (this.mutableForm.data.active === 0) { this.isActive = false }
      if (this.mutableForm.data.active === 1) { this.isActive = true }
    }
  }
}
</script>
