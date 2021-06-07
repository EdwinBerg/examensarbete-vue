<template>
<div class="container">
    <div class="d-flex align-items-center justify-content-around" id="fp-content" style="height: 100vh;">
      <router-link class="home-page-btns" :to="`/Lista/${recentlyCreatedList.id}`" v-if="recentlyCreatedList"> 
      <div class="card" style="width: 18rem; height: 22rem;">
        <div class="card-body">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <h5 class="card-title mt-5">{{recentlyCreatedList.list_name}}</h5>
              <p class="card-text">Snabb tillgång till din lista som du gjorde senast!</p>
          </div>
        </div>
      </router-link>
      
      <router-link class="home-page-btns" to="/MinaListor">
      <div class="card" style="width: 18rem; height: 22rem;">
        <div class="card-body">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <h5 class="card-title mt-5">Mina Listor</h5>
            <p class="card-text">Här har du ett ställe att samla alla dina listor du vill ha koll på!</p>
        </div>
       </div>
     </router-link>
    </div>
  </div>    
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data: function() {
    return {
      recentlyCreatedList: null,
    }
  },

  components: {
   
  }, 
  methods: {
    getRecentlyCreatedList() {
      fetch('http://localhost:3000/Listor')
      .then(response => response.json())
      .then(result => {
        console.log(result.rows)
        this.recentlyCreatedList = result.rows[0];
        console.log(this.recentlyCreatedList)
      });
    },

  },

  created() {
    this.getRecentlyCreatedList();
  }
}

</script>
