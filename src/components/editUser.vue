<template>
           <div class="modal" v-if="showModal">
             <div class="modal-content">
               <h2>Edit User Details</h2>
               <form @submit.prevent="saveChanges">
                 <label for="userName">First Name:</label>
                 <input type="text" id="userName" v-model="editedUser.userFirst" required />
                 
                 <label for="userLastName">Last Name:</label>
                 <input type="text" id="userLastName" v-model="editedUser.userLast" required />
                 
                 <!-- Add other user details fields here -->
         
                 <button type="submit">Save Changes</button>
                 <button @click="closeModal">Close</button>
               </form>
             </div>
           </div>
         </template>
         
         <script>
         export default {
           props: {
             user: Object, // Pass the user object as a prop
             showModal: Boolean,
           },
           data() {
             return {
               editedUser: { ...this.user }, // Copy the user object to editedUser
             };
           },
           methods: {
             saveChanges() {
               this.$emit('save', this.editedUser); // Emit save event with editedUser data
               this.closeModal();
             },
             closeModal() {
               this.$emit('close'); // Emit close event to parent component
             },
           },
         };
         </script>
         
         <style scoped>
         /* Add your modal styles here */
         .modal {
           /* Modal styles */
         }
         .modal-content {
           /* Modal content styles */
         }
         </style>
         