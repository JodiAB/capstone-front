<!-- <template>
    <div>
      <div class="main">
        <div class="cartpg">
          <h2 class="text-center">Your Cart</h2>
              <div
              class="eachitem" v-for="item in cart" :key="item.prodID">
              <div class="flec">
                <div class="img-cont">
                  <img :src="item.prodUrl" class="hero-img" alt="" />
                </div>
                <div class="info">
                <p class="prodname">{{ item.prodName }}</p>
                <p class="proddesc">{{ item.prodDesc }}</p>
                <p class="prodcat">{{ item.Category }}</p>
                <p class="price">Price: R{{ item.Price }}</p>
                <div class="buttons">
                <button @click="removeFromCart(item.prodID)" class="button">
                  <svg viewBox="0 0 448 512" class="svgIcon">
                    <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                    ></path>
                  </svg>
                </button>
        
                <button @click="toCheckout" class="Btn">
      Pay
      <svg class="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
    </button>
                </div>
                </div>
                </div>
              </div>
          <br />
          <br />
          <p class="total">Total Price: R{{ cartTotalPrice }}</p>
        </div>
      </div>
      <Footer />
      </div>
    </template>
    
    <script>

    export default {
      props: {
        cartItems: Array,
      },
      computed: {
        cart() {
          return this.$store.state.cart;
        },
        cartTotalPrice() {
          return this.$store.getters.cartTotalPrice;
        },
      },
      methods: {
        removeFromCart(prodID) {
          this.$store.dispatch("removeFromCart", prodID);
        },
        toCheckout(){
          this.$router.push("/checkout")
        }
      },
    };
    </script>
    
    <style scoped>
    .main {
      height: 100%;
      padding-bottom: 5.25rem;
    }
    .buttons{
      display:flex;
      gap:10px;
    }
    .flec {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      height: 100%;
      width: 100vw;
      /* border: 2px solid white; */
      padding-top: 4rem;
    }
    
    .img-cont {
      /* border: 2px solid green; */
      width: 32%;
      height: 44vh;
      
    }
    
    ul {
      list-style: none;
    }
    
    button {
      background-color: red;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    
    .eachitem {
      /* position: relative; */
      text-decoration: none;
      /* padding-top: 4rem; */
    }
    
    .info {
      text-align: left;
      font-size: 2.4rem !important;
      font-weight: 750;
      width: 40%;
      /* border: 2px solid red; */
    }
    
    .price {
      font-size: 1.4rem !important;
    }
    
    .prodname {
      font-size: 1.4rem !important;
      
    }
    
    ul {
      text-decoration: none;
    }
    .hero-img {
      /* position: relative; */
      /* right: 100%; */
      width: 32vw;
      height: 48vh;
    }
    h2 {
      padding-top: 8rem;
      font-size: 2.4rem;
      color: white;
    }
    
    p {
      color: white;
      font-size: 1.4rem !important;
      text-decoration: none;
    }
    .total {
      padding-top: 12rem;
      /* padding-bottom: 0rem; */
      font-size: 2rem !important;
      font-weight: 750;
    }
    
    .button {
      /* position: absolute; */
      /* bottom: 25%; */
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgb(255, 255, 255);
      border: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 20px rgba(43, 0, 255, 0.537);
      cursor: pointer;
      transition-duration: 0.3s;
      overflow: hidden;
    }
    
    .svgIcon {
      width: 12px;
      transition-duration: 0.3s;
    }
    
    .svgIcon path {
      fill: rgb(34, 0, 255);
    }
    
    .button:hover {
      width: 140px;
      border-radius: 50px;
      transition-duration: 0.3s;
      background-color: rgb(255, 255, 255);
      align-items: center;
    }
    
    .button:hover .svgIcon {
      width: 50px;
      transition-duration: 0.3s;
      transform: translateY(60%);
    }
    
    .button::before {
      position: absolute;
      top: -20px;
      content: "Remove item";
      color: rgb(0, 0, 0);
      font-weight: 700 ;
      transition-duration: 0.3s;
      font-size: 2px;
    }
    
    .button:hover::before {
      font-size: 13px;
      opacity: 1;
      transform: translateY(30px);
      transition-duration: 0.3s;
    }
    
    
    
    .Btn {
      width: 130px;
      height: 50px;
      font-size: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(15, 15, 15);
      border: none;
      color: white;
      font-weight: 600;
      gap: 8px;
      cursor: pointer;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
      position: relative;
      overflow: hidden;
      transition-duration: .3s;
    }
    
    .svgIcon {
      width: 16px;
    }
    
    .svgIcon path {
      fill: rgb(255, 0, 0);
    }
    
    .Btn::before {
      width: 130px;
      height: 130px;
      position: absolute;
      content: "";
      background-color: white;
      border-radius: 50%;
      left: -100%;
      top: 0;
      transition-duration: .3s;
      mix-blend-mode: difference;
    }
    
    .Btn:hover::before {
      transition-duration: .3s;
      transform: translate(100%,-50%);
      border-radius: 0;
    }
    
    .Btn:active {
      transform: translate(5px,5px);
      transition-duration: .3s;
    }
    
    @media screen and (max-width: 300px) {
      .cartpg {
        padding-top: 2rem; /* Adjust as needed for smaller screens */
      }
    
      .eachitem {
        flex-direction: column; /* Adjust item layout for smaller screens */
        align-items: center;
      }
    
      .img-cont {
        width: 80%;
        height: 20vh; 
      }
      .hero-img {
        width: 100%;
        height: 20vh;
      }
    
      .prodname {
        font-size: .8rem!important;
        font-weight: 800;
      }
      .proddesc {
        font-size: .5rem!important;
        font-weight: 800;
      }
      .prodcat {
        font-size: .7rem!important;
        font-weight: 800;
      }
      .price {
        font-size: .7rem!important;
        font-weight: 800;
      }
    
      .info {
        width: 80%;
        font-size: .6rem !important;
        font-weight: normal;
        text-align: center;
      }
    
      .buttons {
        margin-left: 1rem;
        flex-direction: row;
        align-items: center;
        margin-top: 1rem;
      }
    
      .button {
        width: 2rem;
        height: 2rem;
        margin-top: 0.5rem;
      }
    
      .total {
        padding-top: 1rem; 
        font-size: 1rem !important; 
      }
    
      h2 {
        font-size: 1.8rem;
      }
    }
    </style> -->
    <template lang="">
      <div>
        
      </div>
    </template>
    <script>
    export default {
      
    }
    </script>
    <style lang="">
      
    </style>