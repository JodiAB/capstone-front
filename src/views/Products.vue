<template>
  <div class="desire">
    <div class="view-options">
      <button @click="toggleView('grid')">Grid View</button>
      <button @click="toggleView('column')">Column View</button>
    </div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search by name">
      <button @click="search">Search</button>
    </div>
    <div v-if="filteredProducts.length" class="card-container" :class="{ 'column-view': !isGridView }">
      <div v-for="product in filteredProducts" :key="product.id" class="card">
        <div class="product-info">
          <img :src="product.productIMG" alt="Product Image" class="product-image">
          <div class="product-details">
            <h2 class="product-name">{{ product.productName }}</h2>
            <p class="product-description">{{ product.productDes }}</p>
            <p class="product-price">R {{ product.productPrice }}</p>
          </div>
        </div>
        <div class="buttons">
          <button @click="openModal(product)">View Details</button>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>  
    </div>

    <!-- Modal -->
    <div v-if="selectedProduct" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img class="img-modal" :src="selectedProduct.productIMG" alt="Product Image">
        <h2>{{ selectedProduct.productName }}</h2>
        <p>{{ selectedProduct.productDes }}</p>
        <p>Price: {{ selectedProduct.productPrice }}</p>
        <button @click="addToCart(selectedProduct)">Add to Cart</button>
        <button @click="buyNow(selectedProduct)">Buy Now</button>
      </div>
    </div>

    <button @click="showCart">Open Cart</button>

    <!-- Include CartModal component -->
    <cart-modal v-if="isCartOpen" :cartItems="cartItems" @close="closeCartModal"></cart-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Cart from '@/components/Cart.vue'; // Adjust the path accordingly

export default {
  components: {
    'cart-modal': Cart,
  },
  data() {
    return {
      isGridView: true,
      searchQuery: '',
      selectedProduct: null,
      isCartOpen: false,
    };
  },
  computed: {
    ...mapGetters(['filteredProducts', 'cartItems'])
  },
  methods: {
    ...mapActions(['fetchProducts', 'addToCartAction']),

    toggleView(view) {
      this.isGridView = view === 'grid';
    },
    openModal(product) {
      this.selectedProduct = product;
    },
    closeModal() {
      this.selectedProduct = null;
    },
    addToCart(product) {
   
      this.addToCartAction(product)
        .then(() => {
          alert(`Added ${product.productName} to cart`);
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
          alert('Error adding product to cart. Please try again.');
        });
    },
    buyNow(product) {
      // Implement buyNow logic here
      alert(`Buying ${product.productName}`);
    },
    showCart() {
      this.isCartOpen = true;
    },
    closeCartModal() {
      this.isCartOpen = false;
    },
    search() {

      console.log('Search query:', this.searchQuery);
      
  
      this.$store.commit('setSearchQuery', this.searchQuery);
    }
  },
  mounted() {
    this.fetchProducts().catch(error => {
      console.error('Error fetching products:', error);
    });
  }
};
</script>

<style scoped>

.desire {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100vh; /* Changed height for responsiveness */
  padding: 20px; /* Added padding for spacing */
  background: linear-gradient(-50deg, #98ddc5, #fbf8de); /* Updated background gradient */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-options {
  margin-bottom: 20px;
}

.view-options button {
  margin-right: 10px;
  padding: 8px 16px;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  cursor: pointer;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input[type="text"] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.search-bar button {
  padding: 8px 16px;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  cursor: pointer;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.product-details {
  flex-grow: 1;
}

.product-name {
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
}

.product-description {
  margin-bottom: 10px;
  color: #555;
}

.product-price {
  font-weight: bold;
  color: #e67e22;
}

.buttons {
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  border-radius: 5px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  overflow: auto;
}

.img-modal {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 10px;
  color: #333;
}

p {
  margin-bottom: 10px;
  color: #555;
}

button {
  margin-right: 10px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #555;
}

.close:hover {
  color: #333;
}

@media only screen and (max-width: 768px) {
  .card {
    width: calc(50% - 40px);
  }
}

@media only screen and (max-width: 480px) {
  .card {
    width: calc(100% - 40px);
  }

  .modal-content {
    max-width: 90%;
  }
}
</style>