<template>
  <div class="bg-base-200 min-h-screen">
    <div class="navbar bg-primary text-base-100 flex justify-between">
      <div>ColorsTemplates</div>
      <div>Welcome</div>
    </div>
    <transition name="page" mode="out-in">
      <div class="p-4">
        <Nuxt />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
