<template>
    <div>
      <div class="view-options">
        <button @click="toggleView('grid')">Grid View</button>
        <button @click="toggleView('column')">Column View</button>
      </div>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search by name">
        <button @click="search">Search</button>
      </div>
      <div :class="{ 'grid-container': isGridView, 'column-container': !isGridView }">
        <div v-for="product in filteredProducts" :key="product.id" class="card">
          <img :src="product.image" alt="Product Image">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <div class="buttons">
            <button @click="openModal(product)">View Details</button>
            <button @click="buyNow(product)">Buy Now</button>
          </div>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="selectedProduct" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <img :src="selectedProduct.image" alt="Product Image">
          <h2>{{ selectedProduct.name }}</h2>
          <p>{{ selectedProduct.description }}</p>
          <p>Price: {{ selectedProduct.price }}</p>
          <button @click="buyNow(selectedProduct)">Buy Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isGridView: true,
        searchQuery: '',
        selectedProduct: null,
        products: [
          { id: 1, name: 'Product 1', description: 'Description for Product 1', price: '$10', image: 'product1.jpg' },
          { id: 2, name: 'Product 2', description: 'Description for Product 2', price: '$20', image: 'product2.jpg' },
          { id: 3, name: 'Product 3', description: 'Description for Product 3', price: '$30', image: 'product3.jpg' }
        ]
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      toggleView(view) {
        this.isGridView = view === 'grid';
      },
      search() {
        // Implement search functionality here if needed
      },
      openModal(product) {
        this.selectedProduct = product;
      },
      closeModal() {
        this.selectedProduct = null;
      },
      buyNow(product) {
        alert(`Buying ${product.name}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .card {
    width: 30%;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  
  .card img {
    width: 100%;
  }
  
  .buttons button {
    margin-right: 5px;
  }
  
  .modal {
    display: block;
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
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
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
  
  .grid-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .grid-container .card {
    width: 30%;
  }
  
  .column-container {
    display: flex;
    flex-direction: column;
  }
  
  .column-container .card {
    width: 100%;
  }
  </style>
  