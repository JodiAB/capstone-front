import { createStore } from "vuex";
import axios from 'axios';
import router from '@/router';
import { mapActions } from 'vuex';

const baseUrl = "https://capstone-back-m8cq.onrender.com/";

let userData = null;
try {
  userData = JSON.parse(localStorage.getItem('user'));
} catch (error) {
  console.error('Error parsing user data from localStorage:', error);

}
export default createStore({
  state: {
    products: [],
    users: [],
    registrationMsg: '',
    token: localStorage.getItem('token') || null,
    user: userData || null,
    loginError: '',
    currentUser: null,
    cartItems: [],
  },
  mutations: {

    setUserName(state, { firstName, lastName }) {
      state.user.firstName = firstName;
      state.user.lastName = lastName;
    },
  
    setUserEmail(state, email) {
      state.user.userEmail = email;
    },
    setProducts(state, products) {
      state.products = products;
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
      localStorage.setItem('user', JSON.stringify(user));
    },
    updatePro(state, updatedPro) {
      state.user = { ...state.user, ...updatedPro }; 
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    updateProfile(state, updatedProfile) { 
      state.user = { ...state.user, ...updatedProfile }; 
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    clearAuthData(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
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

    addToCart(state, item) {
      state.cartItems.push(item);
    },

    updateCart(state, { itemId, quantity }) {
      const cartItem = state.cartItems.find(item => item.id === itemId);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    removeCart(state, itemId) {
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  
  
  },
  actions: {

    ...mapActions(['fetchProducts', 'addProductToCart']),


    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(`${baseUrl}product`);
        const products = response.data;
        commit('setProducts', products);
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
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

    return userData; 
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
},
async getUserByEmail({ commit }, userEmail) {
  try {
    const response = await axios.get(`${baseUrl}user/email`, {
      params: {
        email: userEmail
      }
    });
    const user = response.data;
    if (!user) {
      throw new Error('User not found');
    }
    commit('setUser', user); // Update the user state with fetched user data
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('User not found'); // Throw specific error for user not found
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
        const { token } = response.data;
    
        if (!token) {
          throw new Error('Invalid token received');
        }
    
        commit('setToken', token); 
        localStorage.setItem('token', token); 
    
     
    
        return true; 
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
    

    

    async updateProfile({ commit, state }, updatedUserData) {
      try {
        const response = await axios.put(`${baseUrl}user/${state.user.userID}`, updatedProData, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        const updatedUser = response.data;
        commit('updatePro', updatedPro);
        console.log('User profile updated successfully:', updatedPro);
        return updatedUser;
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    },
    async deleteUserAccount({ commit, state }) {
      try {
        const response = await axios.delete(`${baseUrl}user/${state.user.userID}`, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        console.log('User account deleted successfully.');
        commit('clearAuthData'); // Clear user data after account deletion
        return true;
      } catch (error) {
        console.error('Error deleting user account:', error);
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
        commit('setUser', userData); 
        console.log('Fetched User Data:', userData); 
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    },
    
    
    logout({ commit }) {
      commit('clearAuthData');
     
    },

  
    // addToCart({ commit, state }, product) {
    //   try {
       
    //     const productDetails = state.products.find(p => p.id === product.product_id);
  
    //     console.log('Product ID:', product.product_id);
    //     console.log('State Products:', state.products);
    //     console.log('Product Details:', productDetails);
  
    //     if (!productDetails) {
    //       throw new Error('Product details not found');
    //     }
  
    //     const cartItem = {
    //       id: product.id,
    //       name: productDetails.productName,
    //       quantity: product.quantity,
    //       price: productDetails.productPrice,
    //       image: productDetails.productIMG,
    //     };
  
    //     // Add the item to the cart
    //     commit('addToCart', cartItem);
    //     alert(`Added ${cartItem.name} to cart`);
    //   } catch (error) {
    //     console.error('Error adding product to cart:', error);
    //     throw error;
    //   }
    // },

// addToCart({ commit, state }, product) {
//   try {
//     console.log('Product ID to add to cart:', product.product_id); // Check product ID
//     console.log('All products:', state.products); // Log all products

//     const productDetails = state.products.find(p => p.id === product.product_id);

//     console.log('Product details found:', productDetails); // Log product details
//     if (!productDetails) {
//       throw new Error('Product details not found');
//     }

//     const cartItem = {
//       id: product.id,
//       name: productDetails.productName,
//       quantity: product.quantity,
//       price: productDetails.productPrice,
//       image: productDetails.productIMG,
//     };

//     // Add the item to the cart
//     commit('addToCart', cartItem);
//     alert(`Added ${cartItem.name} to cart`);
//   } catch (error) {
//     console.error('Error adding product to cart:', error);
//     throw error;
//   }
// },
async addToCartAction({ commit, state }, item) {
  try {
    const response = await axios.post(`${baseUrl}cart/add`, {
      user_id: state.user.userID,
      product_id: item.id,
      quantity: 1,
    });
    const cartItem = response.data;
    commit('addToCart', cartItem);
    return cartItem;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
},

    
    updateCartQuantity({ commit }, payload) {
      commit('updateCart', payload);
    },
    removeFromCart({ commit }, itemId) {
      commit('removeCart', itemId);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
  },
  getters: {
    isLoggedIn: state => {
      return state.token !== null;
    },

    getUserData: state => {
      return state.user;
    },
    allProducts: state => state.products,
    products: state => state.products,
    cartItems: state => state.cartItems,
    cartTotalItems: state => state.cartItems.length,
    cartTotalQuantity: state =>
      state.cartItems.reduce((total, item) => total + item.quantity, 0),

      filteredProducts: state => {
        if (!state.products || state.products.length === 0) {
          return [];
        }
        const searchQuery = state.searchQuery || '';

        return state.products.filter(product =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.productDes.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
     
      },
  },
  modules: {},
});
