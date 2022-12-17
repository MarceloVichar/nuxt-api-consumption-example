<template>
  <div>
    <div class="flex flex-col sm:flex-row w-full justify-between items-center gap-4 sm:mb-4">
      <h1 class="text-3xl text-primary text-center">
        COLORS TEMPLATES
      </h1>
      <button
        class="btn btn-primary btn-outline"
        title="create template"
        @click="$router.push('/colors/create')"
      >
        Create template
      </button>
    </div>
    <DataTable
      :data-table="tableData"
      :is-loading="isSending"
      @setPage="val => $setQuery('page', val)"
    >
      <template #columnBgColor="{item}">
        <div class="flex w-full justify-end lg:justify-center">
          <div
            class=" h-8 w-24 rounded"
            :title="item.bg_color"
            :style="`background: ${item.bg_color}`"
          />
        </div>
      </template>
      <template #columnTextColor="{item}">
        <div class="flex w-full justify-end lg:justify-center">
          <div
            class=" h-8 w-24 rounded"
            :title="item.text_color"
            :style="`background: ${item.text_color}`"
          />
        </div>
      </template>
      <template #columnActive="{item}">
        <span v-if="item.active === 1">Yes</span>
        <span v-if="item.active === 0">No</span>
      </template>
      <template #columnExample="{item}">
        <div
          class=" h-8 w-auto p-2 text-center font-bold rounded"
          :title="item.bg_color"
          :style="{background: item.bg_color, color: item.text_color}"
        >
          Example text
        </div>
      </template>
      <template #columnActions="{item}">
        <div class="flex gap-2 justify-end lg:justify-center">
          <button
            class="btn btn-info btn-sm"
            title="Show"
            @click="$router.push(`/colors/${item.id}`)"
          >
            <span class="material-icons">search</span>
          </button>
          <button
            class="btn btn-warning btn-sm"
            title="Edit"
            @click="$router.push(`/colors/${item.id}/edit`)"
          >
            <span class="material-icons">edit</span>
          </button>
          <button
            class="btn btn-error btn-sm"
            title="Delete"
            @click="removeTemplate(item.id)"
          >
            <span class="material-icons">close</span>
          </button>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from '~/components/shared/DataTable.vue'

export default {
  name: 'ColorsPage',
  components: { DataTable },
  data () {
    return {
      isSending: true,
      tableData: {
        headers: [
          { key: 'id', label: 'id' },
          { key: 'bg_color', label: 'Background Color' },
          { key: 'text_color', label: 'Text Color' },
          { key: 'example', label: 'Example' },
          { key: 'active', label: 'Is Active' },
          { key: 'actions', label: 'Actions' }
        ],
        items: [],
        meta: {}
      }
    }
  },
  fetch () {
    this.isSending = true
    this.$axios.get('/api/admin/calendar_patterns', { params: this.$route.query })
      .then((res) => {
        this.tableData.items = res.data?.data?.entities
        this.tableData.meta = res.data?.data?.pagination
        this.$toast.success(res.data?.message, { position: 'bottom-right' })
      })
      .finally(() => { this.isSending = false })
  },
  computed: {
    it () {
      return it
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.$fetch()
      },
      deep: true
    }
  },
  methods: {
    removeTemplate (id) {
      this.$axios.delete(`/api/admin/calendar_patterns/${id}`)
        .then((res) => {
          this.$toast.success(res.data.message)
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error removing template')
        })
    }
  }
}
</script>
