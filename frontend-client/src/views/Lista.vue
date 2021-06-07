<template>
  <div class="Lista">  
       <AlertMessages :key="index" v-for="(alert, index) in alerts" :message="alert.message" :color="alert.color"></AlertMessages>
     <b-container>
        <router-link to="/MinaListor"><b-icon class="tillbaka-btn" icon="arrow-left" scale="1.5"></b-icon></router-link>
      <b-row class="justify-content-center lists-layout">
        <b-col cols="12" md="9">
          <b-row>
            <b-col class="d-flex align-items-center" md="4" cols="12">
              <b-row>
              <b-col class="mb-2 mb-md-5 pr-0 pl-4 " cols="12" order="1" v-if="listItems">
                <h2 class="listor-title ml-5 ml-md-0">{{listItems[0].list_name}}</h2>
              </b-col>
              <b-col class="mb-md-5 mt-md-5 mt-2 mb-4 p-0" cols="12" order="2" >  
                <radial-progress-bar class="task-progress-bar ml-5 ml-md-0" 
                  :diameter="200"
                  :completed-steps="itemsChecked"
                  :total-steps="listItems.length"
                  startColor="#1779ff"
                  stopColor="#90FFF"
                  v-if="listItems"
                  >
                  <h6 class="progress-bar-shares">{{itemsChecked}} / {{listItems.length}}</h6>
                  <p class="progress-bar-persent">{{ itemsCheckedText }}</p>
              </radial-progress-bar>
              </b-col>
                <b-col cols="12" order="3">
                  <b-input-group class="my-btn-layout mt-2 mt-md-5">
                    <b-form-input placeholder="Lägg till ny artikel" @keyup.enter="createNewArticle(addArticle, $route.params.id)" v-model="addArticle" class="my-btn-input"></b-form-input>
                    <b-input-group-append>
                      <b-icon @click="createNewArticle(addArticle, $route.params.id)" class="my-btn-icon" icon="plus" scale="1.5" variant="success">Lägg till</b-icon>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="8" cols="12" class="mt-3">
              <b-row class="justify-content-center ml-md-0 mr-md-0 mr-2 ml-2 make-it-scrollable mt-3">
                <div class="options-add-list d-flex justify-content-between mb-3"> 
                  <b-form-group class="d-flex justify-content-center">
                    <span :key="listItem.id" v-for="(listItem, index) in listItems">
                     <div class="d-flex justify-content-between justify-content-md-center align-items-center checkbox-with-icons-layout" v-if="listItem.id">
                      <b-form-checkbox 
                        :checked="Boolean(listItem.checked)" 
                        @change="checkboxIsChecked(listItem, index, $event)" 
                        class="d-flex justify-content-between checkbox-list checkbox-list-label ml-md-5" 
                        v-if="listItem.id"
                      >
                        {{listItem.text}} 
                      </b-form-checkbox>
                        <b-icon @click="modalShowEditArt = !modalShowEditArt; currentListItem = listItem" class="m-2 add-icon" icon="pencil" scale="1" variant="secondary"></b-icon>
                        <b-icon @click="modalShowDeleteArt = !modalShowDeleteArt; currentListItem = listItem" class="m-2 mr-3 add-icon" icon="trash" scale="1" variant="danger"></b-icon>
                     </div> 
                    </span>
                  </b-form-group>
                </div>
              </b-row> 
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!-- edit modal -->
      <b-modal
        ref="modal"
        title="Byt namn på din artikel"
        v-model="modalShowEditArt"
      >
        <form ref="form" @submit.stop.prevent="updateArticle(updateArticleText, currentListItem.id); Alert(`${currentList.text} har uppdaterats till ${updateArticleText}`, 'success')">
          <b-form-group
            label="Nytt namn"
            label-for="updateArticleText-input"
          >
            <b-form-input
              autofocus
              id="updateArticleText-input"
              v-model="updateArticleText"
              required
            ></b-form-input>
          </b-form-group>
        </form>
        <template #modal-footer>          
          <b-button
            variant="secondary"
            size="sm"
            class="float-left"
            @click="modalShowEditArt = false"
          >
            Avbryt
          </b-button>
            <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="updateArticle(updateArticleText, currentListItem.id); Alert(`${currentListItem.text} har uppdaterats till ${updateArticleText}`, 'success')"
          >
            Uppdatera
          </b-button>
        </template>
      </b-modal>
        <!-- delete modal -->
    <b-modal 
      ref="modal"
      :title="currentListItem.text"
      v-model="modalShowDeleteArt"
    >
      <p>
        Är du säker på att du vill ta bort listan?
      </p>

      <template #modal-footer>          
        <b-button
          variant="danger"
          size="sm"
          class="float-left"
          @click="modalShowDeleteArt = false"
        >
          Avbryt
        </b-button>

          <b-button
          variant="primary"
          size="sm"
          class="float-right"
           @click="deleteArticle(currentListItem.id); Alert(`${currentListItem.text} har tagits bort`, 'danger')"
        >
          Ja
        </b-button>
      </template>
    </b-modal>
    </b-container>
  </div>
</template>
 
<style scoped>

</style>

<style>
  .my-btn-layout {
    border-bottom: 1px solid white !important;
  }

  .my-btn-icon {
    color: white !important;   
  }

  input.my-btn-icon:hover, input.my-btn-icon:focus, input.my-btn-input:focus, input.my-btn-input:hover {
    background: transparent;
    border: none !important;
    box-shadow: none !important;
    color: white;
  }

  .my-btn-input, .my-btn-icon {
    border: none !important;
    background: transparent;
    color: #fff;
  }

  .task-progress-bar {
    z-index: 3;
  }

  .progress-bar-persent {
    color: white;
    text-shadow: 0 0 20px #1779ff;
    transform: scale(1.5);
    font-weight: 800;
    letter-spacing: .2rem;
    padding: 0.5rem 0 1rem 0rem;
  }

  .progress-bar-shares {
    color: white;
    font-size: 12px;
    padding: 0;
  }

  ::-webkit-scrollbar{
    width: 5px;
    background: #333;
    z-index: 99999;
  }

  div.make-it-scrollable::-webkit-scrollbar {
    width: 3px;
     z-index: 99999;
  }

  div.make-it-scrollable::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color:  #1779ff;
    padding: 10rem 0 0 0;
     z-index: 9999;
  }

  div.make-it-scrollable {
    height: 550px;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
  }

  .MinaListor div.make-it-scrollable {
    height: 550px;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    padding: 0.5rem 0.5rem 10rem 0.5rem !important;
  }

  .MinaListor .make-it-scrollable:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  /* background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 0.35) 90%); */
   backdrop-filter: blur(2px);
  width: 96%;
  height: 6rem;
}

  .checkbox-list-label label{
    width: 100%;
    min-width: 100px;
    margin-right: 1rem;
  }

  .checkbox-list {
    color: white;
    padding: 2rem 0;
    cursor: pointer;
    text-transform: capitalize;
    width: 100%;
  }

  label {
    cursor: pointer;
  }

  .checkbox-list input[type=checkbox]:checked + label {
   text-decoration: line-through;
   color: rgba(255, 255, 255, 0.5);
 }
</style>

<script>
import AlertMessages from '../components/AlertMessages.vue'
import RadialProgressBar from 'vue-radial-progress'
export default {
  name: 'Lista',
  data: function() {
    return {
      listItems: null,
      addArticle: null,
      alerts: [],
      itemsChecked: 0,
      updateArticleText: null,
      modalShowEditArt: false,
      modalShowDeleteArt: false,
      itemsCheckedText: '',
      currentListItem: {}
    }
  },
  components: {
    AlertMessages,
    RadialProgressBar
  },
  methods: {
    getList() {
      console.log();
      fetch('http://localhost:3000/Lista/'+ this.$route.params.id)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.listItems = result.rows;
      });
    },

    createNewArticle(addArticle, listId) {
      console.log(addArticle, 'skapa ny artikel');
      fetch('http://localhost:3000/SkapaArtikel/', {
        body: JSON.stringify({
          "text": addArticle,
          "listDid": listId,
          "checked": 0
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.addArticle = null;
        this.getList();
      }); 
    },

    updateArticle(updateArticleText, articleId) {
      console.log(updateArticleText, 'uppdatera artikel text');
      fetch('http://localhost:3000/updateArticle/', {
        body: JSON.stringify({
          "text": updateArticleText,
          "id": articleId,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT"
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.updateArticleText = null;
        this.modalShowEditArt = false;
        this.getList();
      }); 
    },

       deleteArticle(articleId) {
      console.log(articleId, 'delete artikel');
      fetch('http://localhost:3000/deleteArticle/', {
        body: JSON.stringify({
          "id": articleId,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE"
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.modalShowDeleteArt = false;
        this.getList();
      }); 
    },

    checkboxIsChecked(listItem, index, checkboxValue) {
      console.log(this.listItems.filter(x => x.id === listItem.id), checkboxValue ,'update checkbox value');
      fetch('http://localhost:3000/updateCheckboxValue/', {
        body: JSON.stringify({
          "id": listItem.id,
          "checked": checkboxValue ? 1 : 0
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT"
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.listItems[index].checked = checkboxValue ? 1 : 0;
      }); 
    },

    Alert(alertMessage, alertColor) {
      this.alerts.push({
        color: alertColor,
        message: alertMessage
      })
    }
  },

  watch: {
    listItems: {
    handler() {
      this.itemsChecked = this.listItems.filter(x => x.checked === 1).length;
      if(this.itemsChecked / this.listItems.length === 1) {
        
        this.itemsCheckedText = 'Färdig!' 
      } else {
        this.itemsCheckedText = Math.round((this.itemsChecked / this.listItems.length)*100) + '%';
      }
    },
    deep: true
  },
  },

  created() {
    this.getList();
  }
}
</script>
