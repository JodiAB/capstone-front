<template>
    <div>
   
    </div>
</template>
<script>
import AddPro from '@/components/AddPro'
export default {
    components: {
        AddPro
    },
    name: "addUser",
    data(){
        return {
            newProduct: {
        name: '',
        description: '',
        price: '',
        image: null,
      },
        };
    },
    computed:{
        fetchPro(){
            return this.$store.state.product
        }
    },
    newProducts(){
        try{
            this.$store.dispatch("addProduct", this.$data);
        }catch(e){
            console.error(error);
        }
    },
    mounted(){
        this.$store.dispatch('getProducts')
    }
}

</script>
<style>
.modal-open {
    overflow: hidden;
  }
  
  .modal-open .modal {
    display: block;
  }
</style>