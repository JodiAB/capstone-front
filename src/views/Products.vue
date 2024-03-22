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
    <div v-if="filteredProducts.length" class="card-container" :class="{ 'column-view': !isGridView }">
      <div v-for="product in filteredProducts" :key="product.id" class="card">
        <div class="product-info">
          <img :src="product.image" alt="Product Image" class="product-image">
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
        <img :src="selectedProduct.image" alt="Product Image">
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
      // Implement addToCart logic using Vuex action
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

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.column-view {
  flex-direction: column; 
}

.card {
  width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: beige; /* Main color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px; /* Adjust as needed */
  height: 80px; /* Adjust as needed */
  border-radius: 50%;
  margin-right: 20px;
}

.product-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.product-description {
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
  color: peachpuff; /* Secondary color */
}

.buttons {
  margin-top: 10px;
}

button {
  background-color: aliceblue; /* Third color */
  color: #333;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
}

button:hover {
  background-color: #ccc;
}

.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(201, 153, 69);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  color: #000;
}
</style>