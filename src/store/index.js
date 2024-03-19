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
    userID: localStorage.getItem('userID') || null,
    user: null,
    loginError: '',
    SuccessMsg: '',
    currentUser: null,
    // cart: [],
   
    // currentUser: null,
    // selectedUser: null,
  },
  mutations: {

    setUserName(state, { firstName, lastName }) {
      state.user.firstName = firstName;
      state.user.lastName = lastName;
    },
  
    setUserEmail(state, email) {
      state.user.userEmail = email;
    },
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


    // setUserID(state, userID) {
    //   state.userID = userID;

    //   Cookies.set('userID', userID, { expires: 1 }); 
    // },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.userID === updatedUser.userID);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    deletePerson(state, userID) {
      state.users = state.users.filter(user => user.userID !== userID);
    },
    setToken(state, { token, userID }) {
      state.token = token;
      localStorage.setItem('token', token);
      state.userID = userID;
      localStorage.setItem('userID', userID);
    },
    // setUserID(state, userID) {
    //   state.userID = userID;
    //   localStorage.setItem('userID', userID);
    // },
    
    // setToken(state, token) {
    //   state.token = token;
    //   Cookies.set('token', token, { expires: 1 }); 
    // },

    setUser(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData)); // Optionally, store user data in localStorage
    },
    clearAuthData(state) {
      state.token = null;
      state.user = null;
      state.userID = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
    },
    setCurrentUser(state, userData) {
      state.currentUser = userData;
    },
    userPro(state, user ){
      state.userPro = user; 
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setSuccessMsg(state, msg) {
      state.SuccessMsg = msg;
    },
    // updateQuantity(state, { productId, quantity }) {
    //   const product = state.cart.find(item => item.id === productId);
    //   if (product) {
    //     product.quantity = quantity;
    //   }
    // },
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


// Vuex store action to fetch user details by userID
async getUserDetails({ commit, state }, userID) {
  try {
    if (!userID || isNaN(userID)) {
      throw new Error('Invalid userID');
    }

    const response = await axios.get(`${baseUrl}user/${userID}`, {
      headers: { Authorization: `Bearer ${state.token}` }
    });

    const userData = response.data;
    commit('setUserName', { firstName: userData.firstName, lastName: userData.lastName });
    commit('setUserEmail', userData.email);
    // Commit mutations for other user details as needed

    return userData; // Optionally, return the fetched user data
  } catch (error) {
    console.error('Error fetching user details:', error);
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
        const { token, userId } = response.data;
        
        console.log('User ID after registration:', userID);
        
        commit('setToken', { token, userId });
        commit('setUserId', userId); 
    
        router.push({ name: 'home' });
        
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    // async login({ commit }, credentials) {
    //   try {
    //     const response = await axios.post(`${baseUrl}login`, credentials);
    //     if (response.data && response.data.token) {
    //       commit('setToken', { token: response.data.token });
    //       commit('setSuccessMsg', 'Login successful');
    //       await router.push('/');
    //       return true; 
    //     } else {
    //       throw new Error('Invalid response from server');
    //     }
    //   } catch (error) {
    //     console.error('Error during login:', error);
    //     commit('setLoginError', 'Login failed. Please try again.');
    //     throw error; 
    //   }
    // },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`${baseUrl}login`, credentials);
        const { token, userInfo} = response.data;
  
        commit('setToken', token);
      commit('setUser', userInfo);

      localStorage.setItem('token', token);
  
        router.push({ name: 'profile', params: { userID } });
  
        return true; // Indicate successful login if needed
      } catch (error) {
        console.error('Error during login:', error);
        let errorMessage = 'Login failed. Please try again later.';
        if (error.response && error.response.status === 401) {
          errorMessage = 'Invalid credentials. Please try again.';
        }
        commit('setLoginError', errorMessage);
        throw error;
    
    
      }
    },
    async fetchUserData({ commit, state }) {
      try {
        const userToken = state.token;
        if (!userToken) {
          throw new Error('Token not available');
        }
        const response = await axios.get(`${baseUrl}user`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const userData = response.data;
        commit('setUser', userData); // Commit user data mutation
        console.log('Fetched User Data:', userData); // Log fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    },
    
    
    logout({ commit }) {
      commit('clearAuthData');
      // Optionally, you can clear additional user data or perform other actions here
    },
  },
  getters: {
    isLoggedIn: state => {
      return state.token !== null;
    },
    // getUserByID: state => userId => {
    //   return state.users.find(user => user.userID === userId);
    // },
    getUserData: state => {
      return state.user;
    },
    isLoggedIn: state => {
      return state.token !== null;
    },
  },
  modules: {},
});
