<template>
  <div>
    <button class="btn btn-primary mb-4" @click="$router.go(-1)">
      Back
    </button>
    <div class="m-auto w-full lg:max-w-3xl bg-base-100 p-4 shadow rounded">
      <ColorsTemplateForm v-model="form" @input="create" />
    </div>
  </div>
</template>

<script>
import ColorsTemplateForm from '@/components/app/colorsTemplates/ColorsTemplateForm.vue'

export default {
  name: 'CreateTemplate',
  components: { ColorsTemplateForm },
  data () {
    return {
      form: {
        data: {
          bg_color: '#ffffff',
          text_color: '#ffffff',
          active: 0
        }
      }
    }
  },
  methods: {
    create () {
      this.$axios.post('/api/admin/calendar_patterns', {
        calendar_patterns: this.form.data
      })
        .then((res) => {
          this.$toast.success(res.data.message)
          this.$router.go(-1)
        })
        .catch((err) => {
          Object.keys(err.response.data.message).forEach((error) => {
            this.$toast.error(err.response.data.message[error][0], { position: 'bottom-right' })
          })
        })
    }
  }
}
</script>
