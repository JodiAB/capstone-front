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
            <img
              :src="product.jewelImage"
              alt="Product Image"
              style="width: 100px; height: auto"
            />
          </td>
          <td>
            <button @click="openModal('edit', product.id)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
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
          <td>{{ user.userID }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.userLast }}</td>
          <td>{{ user.userEmail }}</td>
          <td>{{ user.userPass }}</td>
          
  

          <td>
            <button @click="product && openModal('edit', product.id)">
              Edit
            </button>

            <button @click="openModal('delete', product)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
   

    <!-- Add Product Modal -->
    <div v-if="addModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('addModal')">&times;</span>
        <h2>Add Product</h2>
        <!-- Add product form -->

        <label for="productName">Name:</label>
        <input
          type="text"
          id="productName"
          v-model="newProduct.productName"
          required
        />
        <label for="productDescription">Description:</label>
        <textarea
          id="productDescription"
          v-model="newProduct.productDes"
          required
        ></textarea>
        <label for="productPrice">Price:</label>
        <input
          type="number"
          id="productPrice"
          v-model="newProduct.productPrice"
          required
        />
        <label for="productPrice">Quantity:</label>
        <input
          type="number"
          id="productQuan"
          v-model="newProduct.productQuan"
          required
        />
        <label for="productImage">Image:</label>
        <input
          id="productIMG"
          v-model="newProduct.productIMG"
          required
          />
          <!-- @change="onImageChange"
          accept="image/*" -->
        <button type="submit" @click="addProduct">Add Product</button>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="editModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal('editModal')">&times;</span>
        <h2>Edit Product</h2>
        <form @submit.prevent="editProduct">
          <!-- Add @submit.prevent directive here -->
          <label for="editProductName">Name:</label>
          <input
            type="text"
            id="editProductName"
            v-model="editedProduct.productName"
            required
          />
          <label for="editProductDescription">Description:</label>
          <textarea
            id="editProductDescription"
            v-model="editedProduct.productDes"
            required
          ></textarea>
          <label for="editProductPrice">Price:</label>
          <input
            type="number"
            id="editProductPrice"
            v-model="editedProduct.productPrice"
            required
          />
          <label for="editProductQuan">Quantity:</label>
          <input
            type="number"
            id="editProductQuan"
            v-model="editedProduct.productQuan"
            required
          />
          <label for="editProductImage">Image:</label>
          <input
            id="editProductIMG"
            v-model="editedProduct.productIMG"
            required
            />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>

    <!-- Delete Product Modal -->
    <div v-if="deleteModal" class="modal">
      <div class="modal-content">
        <h2>Delete Product</h2>
        <p>Are you sure you want to delete?</p>
        <button @click="deleteProduct(deleteProduct(product.id))">
          Confirm
        </button>
        <button @click="closeModal('deleteModal')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      addModal: false,
      editModal: false,
      deleteModal: false,
      editedProduct: {},
      selectedProduct: {},
      newProduct: {
        productName: "",
        productDes: "",
        productPrice: "",
        productQuan: "",
        productIMG: null,
      },
      error: null, 
    };
  },

  computed: {
    products() {
      return this.$store.state.product;
    },
    users() {
      return this.$store.state.users;
    },
    addProduct() {
      this.$store
        .dispatch("addProduct", this.newProduct)
        .then(() => {
          console.log("Product added successfully");
          console.log(this.newProduct);
          this.closeModal("addModal");
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    },
  },

  mounted() {
    this.fetchData();
    this.fetchUsers();
  },

  methods: {
    openModal(type, id) {
      console.log("Opening modal:", type, id);
      if (type === "add") {
        this.addModal = true;
      } else if (type === "edit") {
        const product = this.products.find((product) => product.id === id);
        if (product) {
          this.editedProduct = product;
          this.editModal = true;
        } else {
          console.error("Product not found for ID:", id);
        }
      } else if (type === "delete") {
        this.selectedProduct = this.products.find(
          (product) => product.id === id
        );
        this.deleteModal = true;
      }
      document.body.classList.add("modal-open");
    },
    check() {
      console.log(this.newProduct.name);
    },
    closeModal(modalName) {
      this[modalName] = false;
      document.body.classList.remove("modal-open");
    },

    editProduct() {
  if (this.editedProduct.id) {
    this.$store.dispatch("editProduct", this.editedProduct)
      .then((updatedProduct) => {
        console.log("Product data updated successfully", updatedProduct);
        this.closeModal("editModal");
      })
      .catch((error) => {
        console.error("Error updating product data:", error);
     
        if (error.response) {
      
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
   
          console.error("No response received:", error.request);
        } else {
       
          console.error("Error setting up the request:", error.message);
        }
      });
  } else {
    console.error("Invalid product ID:", this.editedProduct.id);
  }
},


    deleteProduct(id) {
      this.$store
        .dispatch("deleteProduct", id)
        .then(() => {
          console.log("Product deleted successfully");
          this.closeModal("deleteModal");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    },

    async fetchData() {
      try {
        await this.$store.dispatch("getProducts");
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = error.message; // Set the error message
      }
    },

    async fetchUsers() {
      try {
        await this.$store.dispatch("getUsers");
      } catch (error) {
        console.error("Error fetching users:", error);
        this.error = error.message; // Set the error message
      }
    },
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
  z-index: 1000;
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

.addPro {
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
