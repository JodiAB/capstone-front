// Import necessary modules
import { createStore } from "vuex";
import axios from 'axios';
import router from '@/router';

// Base URL for API requests
const baseUrl = "https://capstone-back-m8cq.onrender.com/";

// Initialize Vuex store
export default createStore({
  state: {
    product: [],
    users: [],
    registrationMsg: '',
    token: localStorage.getItem('token') || null,
    user: null,
    loginError: '',
    SuccessMsg: '',
    cart: [],
    userId: null,
    currentUser: null,
    selectedUser: null,
  },
  mutations: {
    setProduct(state, product) {
      state.product = product;
    },
    updateProduct(state, updatedProduct) {
      const index = state.product.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.product.splice(index, 1, updatedProduct);
      }
    },
    deleteProduct(state, id) {
      state.product = state.product.filter(product => product.id !== id);
    },
    setRegistrationMsg(state, msg) {
      state.registrationMsg = msg;
    },
    setUsers(state, data) {
      state.users = data;
    },
    setSelectedUser(state, user) {
      state.selectedUser = user;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.userID === updatedUser.userID);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    deletePerson(state, userID) {
      state.users = state.users.filter(user => user.userID !== userID);
    },
    setToken(state, { token, userId }) {
      state.token = token;
      state.userId = userId;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setCurrentUser(state, userData) {
      state.currentUser = userData;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setSuccessMsg(state, msg) {
      state.SuccessMsg = msg;
    },
    updateQuantity(state, { productId, quantity }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    async getProducts(context) {
      try {
        const resp = await fetch(`${baseUrl}product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());
        
        context.commit("setProduct", resp);
      } catch(e) {
        console.error("Error fetching products:", e);
      }
    },
    async getUsers(context) {
      try {
        const resp = await fetch(`${baseUrl}user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());
        
        context.commit("setUsers", resp);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    },
    async getUserById({ commit, state }, userID) {
      try {
        const response = await axios.get(`${baseUrl}user/${userID}`, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        const user = response.data;
        commit('setSelectedUser', user);
        console.log('User data fetched:', user);
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    async editProduct({ commit }, updatedProduct) {
      try {
        const response = await axios.patch(`${baseUrl}product/${updatedProduct.id}`, updatedProduct);
        const updatedData = response.data;
        commit('updateProduct', updatedData);
        console.log('Product data updated successfully:', updatedData);
        return updatedData;
      } catch (error) {
        console.error('Error updating product data:', error);
        throw error;
      }
    },
    async addProduct({ state, commit }, newProduct) {
      try {
        const response = await axios.post(`${baseUrl}product`, newProduct);
        const product = response.data;
        commit('setProduct', [...state.product, product]);
        console.log('Product added successfully:', product);
        return product;
      } catch (error) {
        console.error('Error adding product:', error);
        throw error;
      }
    },
    async deleteProduct(context, id) {
      try {
        const res = await fetch(`${baseUrl}product/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to delete product");
        }
        context.commit("deleteProduct", id);
        return true;
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    },
    async deletePerson(context, userID) {
      try {
        const res = await fetch(`${baseUrl}user/${userID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to delete user");
        }
        context.commit("deletePerson", userID);
        return true;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    },
    async registerUser({ commit }, userData) {
      try {
        const response = await axios.post(`${baseUrl}register`, userData);
        const { token, userId } = response.data; // Assuming your response contains user ID
        
        console.log('User ID after registration:', userId); // Log the user ID
        
        commit('setToken', { token, userId });
        commit('setUserId', userId); // Set userId after registration
    
        router.push({ name: 'home' });
        
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(`${baseUrl}login`, { userEmail: email, userPass: password });
        const { token, userId } = response.data; // Assuming your response contains user ID
        
        console.log('User ID after login:', userId); // Log the user ID
        
        commit('setToken', { token, userId });
        commit('setUserId', userId); // Set userId after login
    
        // Call fetchUserData after login
        await this.dispatch('fetchUserData');
    
        router.push({ name: 'home' });
        
        return response.data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async fetchUserData({ commit, state }) {
      try {
        const userToken = localStorage.getItem('token');
        const userId = state.userId; // Get userId from Vuex state
        if (!userId) {
          throw new Error('User ID not available');
        }
        const response = await axios.get(`${baseUrl}user/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const userData = response.data; // Assuming the response contains user data
        commit('setUser', userData); // Commit mutation to update user state
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error gracefully, redirect to login page, etc.
        throw error; // Rethrow the error to be caught by the component
      }
    },
    logout({ commit }) {
      commit('clearAuthData');
    },
  },
  getters: {
    isLoggedIn: state => {
      return state.token !== null;
    },
    cartTotalQuantity: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotalPrice: state => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    currentUser: state => state.currentUser,
    isLoggedIn: state => !!state.token,
    selectedUser: state => state.selectedUser,
  },
  modules: {},
});
