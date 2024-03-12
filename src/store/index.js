import { createStore } from "vuex";
import axios from 'axios';
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
      const index = state.product.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        state.product.splice(index, 1, updatedProduct);
      }
    },
    deleteProduct(state, id) {
      state.product = state.product.filter(product => product.id !== id);
    },
    // addProduct(state, product) {
    //   state.product.push(product);
    // },
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
        const updatedData = response.data; // Assuming response contains updated product data
        commit('updateProduct', updatedData); // Commit mutation to update state
        console.log('Product data updated successfully:', updatedData);
        return updatedData; // Optionally return the updated product data
      } catch (error) {
        console.error('Error updating product data:', error);
        throw error; // Propagate the error to the calling code
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
    


    // async addProduct(context, product) {
    //   try {
    //     const res = await fetch(`${baseUrl}product/`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(product),
    //     });
    //     if (!res.ok) {
    //       throw new Error("Failed to add product");
    //     }
    //     const data = await res.json();
    //     context.commit("addProduct", data);
    //     return data;
    //   } catch (error) {
    //     console.error("Error adding product:", error);
    //     throw error;
    //   }
    // },


      //   add({
      //     name: '',
      //     description: '',
      //     price: '',
      //     image: null,
      //     timer: 3000,
      //   });
      // }catch (e){
      //   add({
      //     name: '',
      //     description: '',
      //     price: '',
      //     image: null,
      //     timer: 3000,
      //   });     
      //  }
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
  },
  modules: {},
});
