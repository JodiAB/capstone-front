<template>
           <div>
             <h1>User Profile</h1>
             <form @submit.prevent="saveChanges">
               <label for="userName">Name:</label>
               <input type="text" id="userName" v-model="editedUser.userName" required />
               
               <label for="userLastName">Last Name:</label>
               <input type="text" id="userLastName" v-model="editedUser.userLast" required />
               
               <label for="userEmail">Email:</label>
               <input type="email" id="userEmail" v-model="editedUser.userEmail" required />
               
               <label for="userPassword">Password:</label>
               <input type="password" id="userPassword" v-model="editedUser.userPass" required />
               
               <button type="submit">Save Changes</button>
             </form>
           </div>
         </template>
         
         <script>
         import { ref, computed } from 'vue';
         import { useStore } from 'vuex';
         import { useRouter } from 'vue-router';
         
         export default {
           setup() {
             const store = useStore();
             const router = useRouter();
         
             
             const userId = computed(() => router.params.userId);
         
             
             const userData = computed(() => store.state.users.find(user => user.userID === userId.value));
         
         
             const editedUser = ref(userData.value ? { ...userData.value } : {});
         
           
             const saveChanges = () => {
        
               store.commit('updateUser', editedUser.value);
             
               router.push('/user-list'); 
             };
         
             return {
               editedUser,
               saveChanges,
             };
           },
         };
         </script>
         