<template>
  <div>
    <!-- <Spinner v-if="loading"/>
      <div v-else> -->
        <h1>Product list</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.productQuan }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.productDes }}</td>
              <td>R {{ product.productPrice }}</td>
              <td>
                <img :src="product.jewelImage" alt="Product Image" style="width: 100px; height: auto" />
              </td>
          <td>
            <button @click="openModal('edit', product.id)">Edit</button>
            <button @click="openModal('delete', product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="openModal('add', product)">Add Product</button>

    <h1>User Table</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.userID">
        <tr>
          <td>{{ people.userID }}</td>
          <td>{{ people.userName }}</td>
          <td>{{ people.userName }}</td>>
          <td>{{ people.emailAdd }}</td>
          <td>{{ people.gender }}</td>
          <td>{{ people.userRole }}</td>

          <td>
            <button @click="openModal('edit', product)">Edit</button>
            <button @click="openModal('delete', product)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addModal()">Add Product</button>

    <!-- Add Product Modal -->
    <div v-if="addModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('addModal')">&times;</span>
        <h2>Add Product</h2>
        <!-- Add product form -->
        <form class="addPro" @submit.prevent="addProduct">
          <label for="productName">Name:</label>
          <input type="text" id="productName" v-model="newProduct.name" required>
          <label for="productDescription">Description:</label>
          <textarea id="productDescription" v-model="newProduct.description" required></textarea>
          <label for="productPrice">Price:</label>
          <input type="number" id="productPrice" v-model="newProduct.price" required>
          <label for="productImage">Image:</label>
          <input type="file" id="productImage" @change="onImageChange" accept="image/*" required>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="editModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('editModal')">&times;</span>
        <h2>Edit Product</h2>
        <!-- Edit product form -->
        <form @submit.prevent="editProduct">
          <label for="editProductName">Name:</label>
          <input type="text" id="editProductName" v-model="editedProduct.name" required>
          <label for="editProductDescription">Description:</label>
          <textarea id="editProductDescription" v-model="editedProduct.description" required></textarea>
          <label for="editProductPrice">Price:</label>
          <input type="number" id="editProductPrice" v-model="editedProduct.price" required>
          <label for="editProductImage">Image:</label>
          <input type="file" id="editProductImage" @change="onEditImageChange" accept="image/*" required>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>

    <!-- Delete Product Modal -->
    <div v-if="deleteModal" class="modal">
      <div class="modal-content">
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete ?</p>
        <!-- Delete confirmation buttons -->
        <button @click="deleteJewel(selectedProduct.id)">Confirm</button>
        <button @click="closeModal('deleteModal')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addModal: false,
      editModal: false,
      deleteModal: false,
      editedProduct: {},
      selectedProduct: {},
      newProduct: {
        name: '',
        description: '',
        price: '',
        image: null,
      },
    };
  },
  computed: {
  products() {
    return this.$store.state.product;
  },
  users() {
    return this.$store.state.users;
  },
},
  mounted() {
    // this.$store.dispatch("getProducts");
    this.fetchData();
    this.fetchUsers();
  },
  methods: {
    openModal(type, data) {
      if (type === 'add') {
        this.addModal = true;
      } else if (type === 'edit') {
        this.editedProduct = { ...data }; // Create a copy of the product to edit
        this.editModal = true;
      } else if (type === 'delete') {
        this.selectedProduct = { ...data }; // Create a copy of the product to delete
        this.deleteModal = true;
      }
      document.body.classList.add('modal-open');
    },
    closeModal(modalName) {
      this[modalName] = false;
      document.body.classList.remove('modal-open');
    },
    // Implement your methods for adding, editing, and deleting products here
    addProduct() {
      // Implement adding product logic
    },
    editProduct() {
      // Implement editing product logic
    },
    deleteProduct() {
      // Implement deleting product logic
    },
    onImageChange(event) {
      // Handle image change for adding product
    },
    onEditImageChange(event) {
      // Handle image change for editing product
    },



    async fetchData() {
      await this.$store.dispatch("getProducts");
    },
    async fetchUsers(){
      await this.$store.dispatch("getUsers");
    }

   
  },
};
</script>

<style>
/* Table Styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

/* Button Styling */
button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.confirm-delete-btn {
  background-color: #f44336;
  color: white;
}

.cancel-delete-btn {
  background-color: #ccc;
  color: black;
}

/* Modal Styling */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.addPro{
  display: flex;
  justify-content: center;
  flex-direction: column;
}

/* Show modal */
.modal-open {
  overflow: hidden;
}

.modal-open .modal {
  display: block;
}

@media only screen and (max-width: 400px) {
  /* Table Styling */
  table {
    width: 100%;
    margin-bottom: 15px;
  }

  th,
  td {
    padding: 10px;
    font-size: 14px;
  }

  button {
    padding: 8px 12px;
    font-size: 14px;
  }

  .modal-content {
    width: 90%;
    margin: 15% auto;
  }
}
</style>
