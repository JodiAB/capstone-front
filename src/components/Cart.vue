<template>
    <b-modal id="cart-modal" title="Your Cart" @hidden="closeCartModal">
      <div v-if="cartItems.length > 0">
        <ul>
          <li v-for="(item, index) in cartItems" :key="index">
            <span>{{ item.name }}</span>
            <span>Quantity: {{ item.quantity }}</span>
            <span>Price: ${{ item.price }}</span>
            <button @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
        
        <button @click="checkout">Checkout</button>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </b-modal>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['cartItems']),
    },
    mounted() {
    console.log('Cart items:', this.cartItems);
  },
    methods: {
      ...mapActions(['removeFromCart', 'clearCart']),
      checkout() {
      
        this.clearCart();
      },
      closeCartModal() {
    
        this.$emit('close');
      },
    },
  };
  </script>
  