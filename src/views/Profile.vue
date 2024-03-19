<template>
  <div>
    <h1>Profile</h1>
    <div v-if="user">
      <p>Name: {{ user.userName }} {{ user.userLast }}</p>
      <p>Email: {{ user.userEmail }}</p>
      <!-- Display other user details as needed -->

     
    </div>
    <button @click="handleLogout">Logout</button>
    <p v-if="isLoggedIn">User is logged in</p>
    <p v-else>User is not logged in</p>
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
    // Fetch user data when component is mounted
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        // Call Vuex action to fetch user data
        await this.$store.dispatch('fetchUserData');
        // Update local user data from Vuex store
        this.user = this.$store.getters.getUserData;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    handleLogout() {
    this.$store.dispatch('logout');
    this.$router.push({ name: 'home' });
  },
  },
};
</script>
