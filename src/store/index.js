import { createStore } from "vuex";
import axios from 'axios';
const baseUrl = "https://capstone-back-m8cq.onrender.com/";

export default createStore({
  state: {
    product: [],
    users: [],
    registrationMsg: '',
    token: null,
    loginError: '',
    cart: []
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
    setToken(state, token) {
      state.token = token;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    addToCart(state, product) {
      const EPro = state.cart.find(item => item.id === product.id);
      if (EPro) {
        EPro.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      },

      removeFromCart(state, productId){
        state.cart = state.cart.filter(item => item.id !== productId);
      },

      updateQuantity(state, { productId, quantity }) {
        const product = state.cart.find(item => item.id === productId);
        if (product) {
          product.quantity = quantity;
        }
      },
      clearCart(state) {
        state.cart = [];
      }
  }
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
        const resp = await fetch(`${baseUrl}users`, {
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


    async addProduct({ commit }, newProduct) {
      try {
        const response = await axios.post(`${baseUrl}product`, newProduct);
        const product = response.data; // Assuming response contains the created product
        commit('addProduct', product); // Commit mutation to update state
        console.log('Product added successfully:', product);
        return product; // Optionally return the created product
      } catch (error) {
        console.error('Error adding product:', error);
        throw error; // Propagate the error to the calling code
      }
    windows.reload();

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
    async register(context, payload) {
      try {
        const response = await axios.post(`${baseUrl}register`, payload);
        const { token, msg } = response.data;
        console.log(msg);
        if (token) {
          context.commit("setRegistrationMsg", msg);
        } else {
          console.log("Registration failed:", msg);
          context.commit("setRegistrationMsg", msg);
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
        context.commit("setRegistrationMsg", "An error occurred during registration");
      }
    },
    async login(context, { email, password }) {
      try {
        const response = await axios.post(`${baseUrl}login`, { userEmail: email, userPass: password });
        if (response && response.data) {
          const { token, msg } = response.data;
          if (token) {
            context.commit('setToken', token);
            context.commit('setLoginError', '');
            localStorage.setItem('token', token);
          } else {
            context.commit('setToken', null);
            context.commit('setLoginError', msg);
            localStorage.removeItem('token');
          }
        } else {
          throw new Error('Invalid response received');
        }
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data.msg : error.message);
        context.commit('setToken', null);
        context.commit('setLoginError', 'Login failed');
        localStorage.removeItem('token');
      }
    },
    async fetchProduct(context, productId) {
      try {
        const response = await axios.get(`${baseUrl}products/${productId}`);
        const product = response.data;
        context.commit('addToCart', product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    
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
  },
  modules: {},
});
