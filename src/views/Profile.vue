<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="userData">
      <p>Name: {{ userData.userName }}</p>
      <p>Email: {{ userData.userEmail }}</p>
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
      return this.$store.getters.userData;
    },
  },
  methods: {
    fetchUserData: async function() {
      try {
        await this.$store.dispatch('fetchUserData');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    logoutUser: async function() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
  async created() {
    await this.fetchUserData(); // Ensure correct binding with 'this'
  },
};
</script>

