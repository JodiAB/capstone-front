<template scoped>
  <div class="body">
    <h1 class="header" >Spa Store </h1>
  <h3 class="sub-heading">Where your peace is a priority</h3>
  <div class="clik">
  <button class="but">View More</button>
  </div>
</div>
</template>
<script>
export default {
  
}
</script>
<style scoped>

  .body{
    height: 100vh;
    border: 2px solid white;
    background-image: url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/sauna.jpg);
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat;
    z-index: 20;
  }

  .header {
    display: flex;
    justify-content: center;
    color: aliceblue;
    align-content: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10;
    font-size: 165px;

  }

  .sub-heading {
    display: flex;
    justify-content: center;
    color: aliceblue;
    align-content: center;
    position: absolute;
    top: 59%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 40px;

  }

  .but{
    position: absolute;
    top: 455px;
    left: 0%;
    padding: 10px;
    position: relative;
  background: none;
  color: #ccc434;
  text-transform: uppercase;
  text-decoration: none;
  border: 0.2em solid #ccc434;
  padding: 0.5em 1em;
}

.but::before {
  content: "";
  display: block;
  position: absolute;
  width: 10%;
  background: #222;
  height: 0.3em;
  right: 20%;
  top: -0.21em;
  transform: skewX(-45deg);
  transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
}

.but::after {
  content: "";
  display: block;
  position: absolute;
  width: 10%;
  background: #222;
  height: 0.3em;
  left: 20%;
  bottom: -0.25em;
  transform: skewX(45deg);
  transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
}

.but:hover::before {
  right: 80%;
}

.but:hover::after {
  left: 80%;
}
  
</style>