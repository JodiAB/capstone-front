<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <label for="email">Email:</label><br>
      <input type="email" id="email" v-model="userEmail" required><br><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" v-model="userPass" required><br><br>
      <button type="submit" id="login">Login</button>
    </form>
    <p v-if="loginError" style="color: red;">{{ loginError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
      userPass: '',
    };
  },
  computed: {
    loginError() {
      return this.$store.state.loginError;
    },
  },
  methods: {
    async loginUser() {
      try {
        const { userEmail, userPass } = this;
        const credentials = { userEmail, userPass };
        await this.$store.dispatch('login', credentials);
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
      }
    },
  },
};
</script>

<style>
  /* Add your custom styles here */
  #login:active {
    background-color: black;
  }
</style>
