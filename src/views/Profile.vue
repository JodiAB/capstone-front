<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="userData">
      <p>Name: {{ userData.name }}</p>
      <p>Email: {{ userData.email }}</p>
      <!-- Display other user details as needed -->
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>

    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
export default {
  computed: {
    userData() {
      return this.$store.state.user;
    },
  },
  methods: {
    async fetchUserData() {
      try {
        await this.$store.dispatch('fetchUserData');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error gracefully, redirect to login page, etc.
      }
    },
    async logoutUser() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
  created() {
    // Fetch user data when the component is created (after successful login or registration)
    this.fetchUserData();
  },
};
</script>
