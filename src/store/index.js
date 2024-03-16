import { createStore } from "vuex";
import axios from 'axios';
import router from '@/router';

const baseUrl = "https://capstone-back-m8cq.onrender.com/";
const token = localStorage.getItem('token');

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
    currentUser: null,
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
    
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.userID === updatedUser.userID);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    
    deletePerson(state, userID) {
      state.users = state.users.filter(user => user.userID !== userID);
    },
    setToken(state, token) {
      state.token = token;
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
    // addToCart(state, product) {
    //   const existingProduct = state.cart.find(item => item.id === product.id);
    //   if (existingProduct) {
    //     existingProduct.quantity++;
    //   } else {
    //     state.cart.push({ ...product, quantity: 1 });
    //   }
    // },
    // removeFromCart(state, productId) {
    //   state.cart = state.cart.filter(item => item.id !== productId);
    // },
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
    
        context.commit("deletePerson", userID); // Commit mutation to update state
        return true;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    },
    
    

    async register({ commit }, userData) {
      try {
        const response = await axios.post(`${baseUrl}register`, userData);
        const responseData = response.data;
    
    
        if (response.status === 200 && responseData.success) {
          commit('setRegistrationMsg', responseData.message);
          console.log('Registration successful:', responseData.message);
          return { success: true };  
        } else {
          console.error('Registration failed:', responseData.message);
          return { success: false, message: responseData.message }; 
        }
      } catch (error) {
        console.error('Error registering user:', error);
        throw error; 
      }
    },

  
    // async login(context, { email, password }) {
    //   try {
    //     const response = await axios.post(`${baseUrl}login`, { userEmail: email, userPass: password });
    //     if (response && response.data) {
    //       const { token, msg } = response.data;
    //       if (token) {
    //         context.commit('setToken', token);
    //         context.commit('setLoginError', '');
    //         localStorage.setItem('token', token);
    
    //         // Fetch and set current user data
    //         const userResponse = await axios.get(`${baseUrl}user`, {
    //           headers: { Authorization: `Bearer ${token}` }
    //         });
    //         const userData = userResponse.data;
    //         context.commit('setCurrentUser', userData);
    
    //         router.push({ name: 'home' }); // Redirect to home or desired route
    //       } else {
    //         context.commit('setToken', null);
    //         context.commit('setLoginError', msg);
    //         localStorage.removeItem('token');
    //       }
    //     } else {
    //       throw new Error('Invalid response received');
    //     }
    //     context.commit('setSuccessMsg', 'Login successful');
    //   } catch (error) {
    //     console.error('Login error:', error.response ? error.response.data.msg : error.message);
    //     context.commit('setToken', null);
    //     context.commit('setLoginError', 'Login failed');
    //     localStorage.removeItem('token');
    //   }
    // },
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(`${baseUrl}login`, { userEmail: email, userPass: password });
        const { token, user } = response.data;
        commit('setToken', token);
        commit('setUser', user);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
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
    },
    logout({ commit }) {
      commit('clearAuthData');
    },
    async fetchUser({ commit, state }) {
      try {
        const response = await axios.get(`${baseUrl}user`, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        const user = response.data;
        commit('setUser', user);
      } catch (error) {
        console.error('Fetch user error:', error);
        throw error;
      }
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
    currentUser: state => state.user,
  },
  modules: {},
});
