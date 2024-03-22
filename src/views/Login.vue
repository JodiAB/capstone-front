<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <p>Welcome</p>
      <label for="email">Email:</label><br>
      <input type="email" id="email" v-model="userEmail" required><br><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" v-model="userPass" required><br><br>
      <button type="submit" id="login">Login</button>
    </form>
    <p v-if="loginError" style="color: red;">{{ loginError }}</p>

    <div class="drops">
      <div class="drop drop-1"></div>
      <div class="drop drop-2"></div>
      <div class="drop drop-3"></div>
      <div class="drop drop-4"></div>
      <div class="drop drop-5"></div>
    </div>
  </div>
</template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet"> 

<div class="container">
  <form @submit.prevent="loginUser">
    <p>Welcome</p>
    <input type="email" placeholder="Email"><br>
    <input type="password" placeholder="Password"><br>
    <input type="button" value="Sign in"><br>
  </form>

  <div class="drops">
    <div class="drop drop-1"></div>
    <div class="drop drop-2"></div>
    <div class="drop drop-3"></div>
    <div class="drop drop-4"></div>
    <div class="drop drop-5"></div>
  </div>
</div>

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

  
        await this.$store.dispatch('getUserByEmail', userEmail);
        
       
        this.$router.push({ name: 'profile' });
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
      }
    },
  },
};
</script>