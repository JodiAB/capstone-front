<template>
  <div>
    <div v-if="user">
    <h1>Welcome {{ user.userName }} to your profile page </h1>
      <p>Name: {{ user.userName }} </p>
      <p>Last Name: {{ user.userLast }}</p>
      <p>Email: {{ user.userEmail }}</p>

    </div>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.getUserDataFromLocalStorage();
  },
  methods: {
    getUserDataFromLocalStorage() {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      } else {
        console.error('User data not found in local storage');
      }
    },
    handleLogout() {
      localStorage.removeItem('user'); 
      this.$router.push({ name: 'home' }); 
    },
  },
};
</script>
