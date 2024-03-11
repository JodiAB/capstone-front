import { createStore } from "vuex";

const baseUrl = "https://capstone-back-m8cq.onrender.com/";

export default createStore({
  state: {
    product: [],
    users: [],
  },
  mutations: {
    setProduct(state, product) {
      state.product = product;
    },
    updateProduct(state, updatedProduct) {
      // Find the index of the updated product in the product array
      const index = state.product.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        // Update the product at the found index
        state.product.splice(index, 1, updatedProduct);
      }
    },
    setUsers(state, data) {
      state.users = data;
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
        
        console.log(resp);
        context.commit("setProduct", resp);
      } catch(e) {
        console.error("Error: ", e);
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
        
        console.log(resp);
        context.commit("setUsers", resp);
      } catch (e) {
        console.error("Error: ", e);
      }
    },
    editProduct(context, updatedProduct) {
      return new Promise((resolve, reject) => {
        fetch(`${baseUrl}product/${updatedProduct.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct), 
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update product data');
          }
          return response.json();
        })
        .then(data => {
          context.commit("setProduct", data);
          resolve(data); 
        })
        .catch(error => {
          console.error("Error updating product data:", error);
          reject(error); 
        });
      });
    }
    
  },
  modules: {},
});
