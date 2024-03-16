<template scoped>
  <div class="body">
    <div class="clouds">
      <div class="clouds">
        <div class="clouds">
      <h1 class="header">Spa Store</h1>
      <h3 class="sub-heading">Where your peace is a priority</h3>
      <div class="clik">
        <button class="but">View More</button>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.body {
  height: 100vh;
  border: 2px solid white;
  background-image: url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/sauna.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 20;
  position: relative; /* Add this line */
}

.header, .sub-heading, .but {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: aliceblue;
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
    font-size: 153px;
  }
.sub-heading {
  top: 59%;
  font-size: 40px;
}

.but {
  top: calc(100% - 70px); /* Adjust as needed */
  padding: 10px;
  background: none;
  color: #ccc434;
  text-transform: uppercase;
  text-decoration: none;
  border: 0.2em solid #ccc434;
  transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
}

.but::before, .but::after {
  content: "";
  display: block;
  position: absolute;
  width: 10%;
  background: #222;
  height: 0.3em;
  transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
}

.but::before {
  right: 20%;
  top: -0.21em;
  transform: skewX(-45deg);
}

.but::after {
  left: 20%;
  bottom: -0.25em;
  transform: skewX(45deg);
}

.but:hover::before {
  right: 80%;
}

.but:hover::after {
  left: 80%;
}

@keyframes move-clouds-back {
  from { background-position: 0 0; }
  to { background-position: 10000px 0; }
}

.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: url(http://www.script-tutorials.com/demos/360/images/clouds3.png) repeat top center;
  z-index: 10;
  animation: move-clouds-back 200s linear infinite;
  background-size: cover;
  filter: grayscale(100%) brightness(120%);
}
</style>
