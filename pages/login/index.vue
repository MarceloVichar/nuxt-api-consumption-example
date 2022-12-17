<template>
  <div class="h-full mt-10 w-full flex justify-center items-center">
    <div class="shadow rounded bg-base-100 p-4">
      <form class="flex flex-col gap-4" @submit.prevent="submit">
        <div class="flex flex-col">
          <label for="email" class="mr-2">Email</label>
          <input id="email" v-model="login.email" type="email" class="input">
        </div>
        <div class="flex flex-col">
          <label for="password" class="mr-2">Password</label>
          <input id="password" v-model="login.password" type="password" class="input">
        </div>
        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
      <div class="text-sm mt-8 text-center">
        <p>Email: task@searchandstay.com</p>
        <p>Password: ph37i45K</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  auth: false,
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.$auth.loginWith('local', {
        data: {
          login: this.login
        }
      }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
