<template>
  <div class="desire">
  <div class="about">
    <h1 class="us">About Us</h1>
    <h2 class="subheading">Welcome to Our Spa Store</h2>
    <p class="description">At our spa store, we are dedicated to providing you with the ultimate relaxation experience. Our team of experts is committed to offering top-notch spa services and products tailored to your needs.</p>
    
    <div class="card-container">
      <!-- Card 1: Spa Services -->
      <div class="card">
        <div class="card-header">
          <i class="fas fa-spa"></i>
          <h3>Spa Services</h3>
        </div>
        <div class="card-content">
          <p>Indulge in our luxurious spa services, including massages, facials, and body treatments, designed to rejuvenate your mind and body.</p>
        </div>
      </div>
      
      <!-- Card 2: Premium Products -->
      <div class="card">
        <div class="card-header">
          <i class="fas fa-shopping-bag"></i>
          <h3>Premium Products</h3>
        </div>
        <div class="card-content">
          <p>Explore our collection of high-quality spa products, from skincare essentials to aromatherapy items, to enhance your at-home spa experience.</p>
        </div>
      </div>
      
      <!-- Card 3: Expert Tips -->
      <div class="card">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h3>Expert Tips</h3>
        </div>
        <div class="card-content">
          <p>Discover valuable tips from our spa experts on skincare routines, relaxation techniques, and maintaining overall wellness.</p>
        </div>
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

.desire{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 110vh;
  background: linear-gradient(-50deg, red, #a82d2d, black, #a82d2d);
  background-size: 200% 200%; 
  animation: fire 7s ease infinite;

}

@keyframes fire {
  0%{
  background-position: 0% 50%;
}
50%{
  background-position: 100% 50%;
}
100%{
  background-position: 0% 50%;
}
}

.about {
  margin: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.us {
  text-align: left;
  margin-bottom: 20px;
  color: #333; /* Added color */
}

.subheading {
  font-size: 24px;
  margin-bottom: 10px;
  color: #555; 
}

.description {
  margin-bottom: 30px;
  color: #777; 
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
  background-color: #f8d64e; /* Added background color */
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
  color: #777; 
}

.card-content {
  padding-top: 10px;
}

.card-content p {
  margin-top: 0;
  color: #444; 
}
</style>
