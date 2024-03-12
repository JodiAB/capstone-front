<template>
  <div class="about">
    <h1 class="us">About Us</h1>
    <h2 class="subheading">Welcome to Our Spa Store</h2>
    <p class="description">At our spa store, we are dedicated to providing you with the ultimate relaxation experience. Our team of experts is committed to offering top-notch spa services and products tailored to your needs.</p>
    
    <div class="card-container">
      <!-- Card 1: Spa Services -->
      <div class="card" @mouseover="activeCard = 1" @mouseleave="activeCard = null">
        <div class="card-header">
          <i class="fas fa-spa"></i>
          <h3>Spa Services</h3>
        </div>
        <div class="card-content" v-show="activeCard === 1">
          <p>Indulge in our luxurious spa services, including massages, facials, and body treatments, designed to rejuvenate your mind and body.</p>
        </div>
      </div>
      
      <!-- Card 2: Premium Products -->
      <div class="card" @mouseover="activeCard = 2" @mouseleave="activeCard = null">
        <div class="card-header">
          <i class="fas fa-shopping-bag"></i>
          <h3>Premium Products</h3>
        </div>
        <div class="card-content" v-show="activeCard === 2">
          <p>Explore our collection of high-quality spa products, from skincare essentials to aromatherapy items, to enhance your at-home spa experience.</p>
        </div>
      </div>
      
      <!-- Card 3: Expert Tips -->
      <div class="card" @mouseover="activeCard = 3" @mouseleave="activeCard = null">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h3>Expert Tips</h3>
        </div>
        <div class="card-content" v-show="activeCard === 3">
          <p>Discover valuable tips from our spa experts on skincare routines, relaxation techniques, and maintaining overall wellness.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      activeCard: null
    };
  }
}
</script>

<style>
.about {
  margin: 20px;
}

.us {
  text-align: center;
  margin-bottom: 20px;
}

.subheading {
  font-size: 24px;
  margin-bottom: 10px;
}

.description {
  margin-bottom: 30px;
}

.card-container {
  display: flex;
  justify-content: space-between;
}

.card {
  width: 30%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-header i {
  font-size: 24px;
  margin-right: 10px;
}

.card-content {
  display: none;
  padding-top: 10px;
}

.card-content p {
  margin-top: 0;
}

.card:hover .card-content {
  display: block;
}

.card-content:not(:hover) {
  display: none;
}

/* Add any additional styling as needed */
</style>
