<template>
 <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">Multi Lists</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="mr-3" :to="{ path: '/' }">Hem</b-nav-item>
        <b-nav-item :to="{ path: '/MinaListor' }">Mina Listor</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
* {
    font-family: 'Poppins', sans-serif;
}

body {
    background: #161623;
}

body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#f00, #f0f);
    clip-path: circle(30% at right 70%);
    z-index: -1;
}

body::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(#2196f3, #e91e63);
    clip-path: circle(20% at 10% 10%);
    z-index: -9999;
}

.container {
    position: relative;
    z-index: 1;
}

.container .card {
    position: relative;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    color: #fff;
    border-top: 1.5px solid rgba(255, 255, 255, 0.5) !important;
    border-left: 1.5px solid rgba(255, 255, 255, 0.5) !important;
    border-radius: 15px;
    background-color:rgba(204, 204, 204, 0.1);
    backdrop-filter: blur(5px);
}

.navbar {
    z-index: 1;
}

.navbar-dark .navbar-nav .nav-link {
    color:rgba(255, 255, 255, 1);
    border-bottom: 2px solid rgba(0, 0, 0, 0); 
}

.navbar-dark .navbar-nav .nav-link:hover {
    border-bottom: 2px solid #1779ff; 
    color: white;
}

.home-page-btns {
    text-decoration: none !important;
    padding: 0 1rem;
}

.card-title {
    font-size: 32px;
    text-align: center;
    text-transform: capitalize;
}

.card-text {
    margin: 5rem 0 0 0;
}

.card .card-body {
    position:relative;
    overflow:hidden;
    border-radius: 15px;
}

.card .card-body span {
    transition: 0.5;
    opacity: 0;    
}

.card .card-body:hover span{
    opacity: 1;
}

#fp-content .card:hover {
    border: 0px solid rgba(0, 0, 0, 0) !important;
}

.card .card-body span:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:0.5rem;
    background: linear-gradient(to right, transparent, #1779ff  );
    animation: animate1 2s linear infinite;   
}

@keyframes animate1 {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.card .card-body span:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    width:0.5rem;
    height:100%;
    background: linear-gradient(to bottom, transparent, #1779ff);
    animation: animate2 2s linear infinite;
    animation-delay: 1s;
}

@keyframes animate2 {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(100%);
    }
}

.card .card-body span:nth-child(3) {
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    height:0.5rem;
    background: linear-gradient(to left, transparent, #1779ff);
    animation: animate3 2s linear infinite;
}

@keyframes animate3 {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
}

.card .card-body span:nth-child(4) {
    position: absolute;
    top: 0;
    left: 0;
    width:0.5rem;
    height:100%;
    background: linear-gradient(to top, transparent, #1779ff);
    animation: animate4 2s linear infinite;
    animation-delay: 1s;
}

@keyframes animate4 {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(-100%);
    }
}

/* Media queries */


@media only screen and (max-width: 768px) {
    .d-flex {
        display: flex;
        flex-wrap: wrap;
    }

}

</style>

