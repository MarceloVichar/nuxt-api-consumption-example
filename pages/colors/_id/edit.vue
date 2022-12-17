<template>
  <div>
    <button class="btn btn-primary mb-4" @click="$router.go(-1)">
      Back
    </button>
    <div class="m-auto w-full lg:max-w-3xl bg-base-100 p-4 shadow rounded">
      <ColorsTemplateForm v-model="form" @input="edit" />
    </div>
  </div>
</template>

<script>
import ColorsTemplateForm from '@/components/app/colorsTemplates/ColorsTemplateForm.vue'

export default {
  name: 'EditTemplate',
  components: {
    ColorsTemplateForm
  },
  async asyncData ({
    $axios,
    params
  }) {
    try {
      const response = await $axios.get(`/api/admin/calendar_patterns/${params.id}`)
      const templates = response.data.data
      return { templates }
    } catch (err) {
      return { templates: {} }
    }
  },
  data () {
    return {
      form: {
        errors: {},
        data: {
          bg_color: '#ffffff',
          text_color: '#ffffff',
          active: 0
        }
      }
    }
  },
  created () {
    this.form.data = this.templates
  },
  methods: {
    edit () {
      this.$axios.put(`/api/admin/calendar_patterns/${this.$route.params.id}`, {
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
