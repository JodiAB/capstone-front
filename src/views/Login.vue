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
    <p v-if="SuccessMsg" style="color: green;">{{ SuccessMsg }}</p>
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
    SuccessMsg() {
      return this.$store.state.SuccessMsg; 
    },
  },
  methods: {
    async loginUser() {
      try {
        const response = await this.$store.dispatch('login', { email: this.email, password: this.password });
        console.log('Login successful:', response);
        // Redirect or show success message as needed
      } catch (error) {
        console.error('Error logging in:', error);
        // Display error message to the user or handle the error appropriately
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
