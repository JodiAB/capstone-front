<template>
  <div class="user-card">
    <div class="card">
      <div class="card-body">
        <div v-if="user">
          <h1>Welcome {{ user.userName }} to your profile page</h1>
          <div class="user-info">
            <p><strong>Name:</strong> {{ user.userName }} {{ user.userLast }}</p>
            <p><strong>Email:</strong> {{ user.userEmail }}</p>
            
          </div>
        </div>
      </div>
      <button @click="handleLogout" class="btn btn-danger">Logout</button>
    </div>
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
     
        this.$router.push({ name: 'login' });
      }
    },
    handleLogout() {
  localStorage.removeItem('user'); 
  this.$store.dispatch('logout'); 
  this.$router.push({ name: 'login' }); 
},

editUser() {
      if (this.editedUser.newPassword) {
        this.editedUser.hashedPassword = this.hashPassword(this.editedUser.newPassword);
      }

      this.$store.dispatch("updateProfile", this.editedUser)
        
          console.log("User data updated successfully");
          this.closeModal("editModal");
        
    },
  },
};
</script>

<style scoped>
.user-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.user-info {
  margin-bottom: 15px;
}

.btn {
  margin-top: 15px;
}
</style>
