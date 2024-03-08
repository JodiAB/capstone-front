import { createStore } from "vuex";
import axios from "axios";
const baseUrl = "https://capstone-back-m8cq.onrender.com/";

export default createStore({
  state: {
    product: [],
    users: null,
  },
  getters: {
    // product: state => state.product
  },
  mutations: {
    setProduct(state, product) {
      state.product = product;
    },
    setUsers(state, data) {
      state.users = data;
    },
    // deleteProduct(state, id){
    //   state.data = state.data.filter(
    //     (product) => id !== product.id
    //   );
    // },
  },
  actions: {
    async getProducts(context) {
      try{
        const resp = await fetch(`${baseUrl}product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json())
        
        console.log(resp);
        context.commit("setProduct", resp)
      } catch(e) {
        console.error("Error: ", e)
      }
      
    },
    async getUsers(context) {
      try{
        const resp = await fetch(`${baseUrl}users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json())
        
        console.log(resp);
        context.commit("setUsers", resp)
      } catch(e) {
        console.error("Error: ", e)
      }
      
    },



    async editProduct(context, updatedProduct) {
      try {
        const res = await fetch(`${baseUrl}product/${updatedProduct.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct), // send updated product data in the request body
        }).then((response) => response.json());
    
        console.log(res);
        context.commit("setProduct", res);
      } catch (e) {
        console.error("Error: ", e);
      }
    }

    // async fetchProduct({commit}){
    //   const {results}= await axios.get(`${baseUrl}product`)
    //   console.log(response.data.results)c;
    //   commit('setProduct',response.data)
    //   console.log(err)
    //   return results;
    // }
  },
  modules: {},
});
