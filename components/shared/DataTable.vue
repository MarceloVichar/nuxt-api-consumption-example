<template>
  <div class="flex flex-col gap-4 py-6 lg:pt-0">
    <template v-if="isLoading">
      <div class="flex justify-center items-center">
        <div class="mt-24 spinner-border animate-spin inline-block w-12 h-12 border border-primary border-4 rounded-full" />
      </div>
    </template>
    <div v-else class="flex flex-col gap-4">
      <div class="overflow-x-auto shadow-md">
        <table class="overflow-x-scroll table table-compact w-full shadow-lg">
          <thead class="hidden lg:table-header-group">
            <tr class="bg-base-100 relative shadow-md">
              <th
                v-for="header in dataTable.headers"
                :key="header.key"
                class="first-letter:uppercase lowercase bg-base-100 text-primary text-center text-opacity-90 py-2.5 font-semibold tracking-wider !z-0 border-0 border-base-200 border-opacity-20 last:border-none first:!static"
              >
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody class="lg:table-row-group grid sm:grid-cols-2 gap-4 lg:gap-0 bg-base-100">
            <tr v-for="item in dataTable.items" :key="item.id" class="lg:table-row block bg-base-100 rounded-lg last:border-b-0 lg:border-b border-primary border-opacity-20">
              <td
                v-for="header in dataTable.headers"
                :key="header.key"
                :data-title="header.label + ':'"
                class="flex items-center justify-between lg:border-l first:border-l-0 last:border-b-0 lg:table-cell lg:text-center lg:border-b-0 border-b border-primary border-opacity-20 text-end text-neutral text-opacity-70 bg-base-100 p-3"
              >
                <slot :name="generateColumnName(header.key)" :item="item">
                  {{ getItemAttr(item, header.key) }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="dataTable.meta.total_pages > 1" :value="dataTable.meta" @setPage="val => $emit('setPage', val)" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Pagination from '~/components/shared/Pagination.vue'

export default {
  name: 'DataTable',
  components: { Pagination },
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    dataTable: {
      type: Object,
      required: true,
      default () {
        return {
          headers: [],
          items: [],
          meta: {}
        }
      }
    }
  },
  methods: {
    getItemAttr (item, attr) {
      return _.get(item, attr, '')
    },
    generateColumnName (headerKey) {
      return 'column' + _.upperFirst(_.camelCase(headerKey))
    }
  }
}
</script>

<style scoped>
.table :where(:first-child) :where(:first-child) :where(th, td):last-child {
  border-top-right-radius: 0.2rem;
  padding-right: 15px;
}
.table :where(:first-child) :where(:first-child) :where(th, td):first-child {
  border-top-left-radius: 0.2rem;
}
.table :where(:last-child) :where(:last-child) :where(th, td):first-child {
  border-bottom-left-radius: 0.2rem;
}
.table :where(:last-child) :where(:last-child) :where(th, td):last-child {
  border-bottom-right-radius: 0.2rem;
}
td:before {
  content: attr(data-title);
  position: relative;
  display: block;
  left: 8px;
  font-weight: bold;
}

@media (min-width: 1024px) {
  td:before {
    display: none;
  }
  .table :where(:first-child) :where(:first-child) :where(th, td):last-child {
  border-top-right-radius: 0;
  padding-right: 15px;
  }
  .table :where(:first-child) :where(:first-child) :where(th, td):first-child {
    border-top-left-radius: 0;
  }
}
</style>
