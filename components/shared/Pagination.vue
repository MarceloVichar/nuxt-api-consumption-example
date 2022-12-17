<template>
  <t-pagination
    :value="value.current_page"
    :classes="{
      wrapper: 'flex w-full justify-center btn-group',
      element: 'btn bg-base-200 text-neutral hover:border-primary hover:bg-base-100 hover:text-primary border border-primary border-opacity-50 hover:border-opacity-60 btn-sm !px-0',
      activeElement: 'btn btn-primary btn-sm',
      disabledElement: 'btn btn-disabled btn-sm',
      button: 'flex w-8 h-full items-center justify-center'
    }"
    hide-ellipsis
    :limit="3"
    :per-page="value.per_page"
    :total-items="value.total"
    :first-label="value.current_page < 3 ? '«' : '1'"
    :last-label="value.last_page - 2 < value.current_page ? '»' : value.last_page.toString()"
    @change="val => $emit('setPage', val)"
  />
</template>

<script>
import TPagination from 'vue-tailwind/dist/t-pagination'

export default {
  name: 'PaginationComponent',
  components: { TPagination },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>
