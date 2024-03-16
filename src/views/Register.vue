<template>
	<div>
	  <h2>Register</h2>
	  <form @submit.prevent="registerUser">
	    <label for="name">Name:</label><br>
	    <input type="text" id="name" v-model="formData.userName" required><br><br>
	    <label for="Lname">Last Name:</label><br>
	    <input type="text" id="Lname" v-model="formData.userLast" required><br><br>
	    <label for="email">Email:</label><br>
	    <input type="email" id="email" v-model="formData.userEmail" required><br><br>
	    <label for="password">Password:</label><br>
	    <input type="password" id="password" v-model="formData.userPass" required><br><br>
	    <button type="submit">Register</button>
	  </form>
	  <p>{{ regisMsg }}</p>
	</div>
         </template>
         
         <script>
         import { mapActions } from "vuex";
         
         export default {
	data() {
	  return {
	    formData: {
	      userName: "",
	      userLast: "",
	      userEmail: "",
	      userPass: "",
	    },
	  };
	},
	computed: {
		regisMsg() {
      return this.$store.state.registrationMsg;
    },
	},
	methods: {
 async registerUser() {
      try {
        console.log("Form Data:", this.formData);
        const response = await this.register(this.formData);
        if (response.success) {
          console.log("User registered successfully");
          this.$router.push({ name: "home" });
        } else {
          console.error("Registration failed:", response.message);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
    ...mapActions(['register']),
  },
         };
         </script>
         
         <style>
         /* Add your custom styles here */
         </style>
         