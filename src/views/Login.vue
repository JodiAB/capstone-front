<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <label for="email">Email:</label><br>
        <input type="email" id="email" v-model="userEmail" required><br><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" v-model="userPass" required><br><br>
        <button type="submit">Login</button>
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
      loginUser() {
        this.$store.dispatch('login', { email: this.userEmail, password: this.userPass });
      },
    },
  };
  </script>
  
  <style>
    /* Add your custom styles here */
  </style>
  