
<template>
  <div class="MinaListor">
    <AlertMessages :key="index" v-for="(alert, index) in alerts" :message="alert.message" :color="alert.color"></AlertMessages>
    <b-container>
        <router-link to="/"><b-icon class="tillbaka-btn" icon="arrow-left" scale="1.5" ></b-icon></router-link>
      <b-row class="justify-content-md-center lists-layout">
        <b-col cols="12" md="8">
          <div class="d-flex justify-content-between mb-3 mt-5 pl-3 pl-md-0 mt-md-0">
            <h2 class="listor-title">Listor</h2>
            <b-icon @click="modalShowAdd = !modalShowAdd" class="mr-2 align-self-center add-icon" icon="plus-circle-fill" scale="2" variant="primary" id="tooltip-target-1"></b-icon>
            <b-tooltip target="tooltip-target-1" triggers="hover">
              Skapa ny lista
            </b-tooltip>
          </div>
          <div class="make-it-scrollable p-2">
          <div class="each-row" :key="list.id" v-for="list in lists">
            <b-list-group class="mb-2">
              <b-list-group-item class="flex-column align-items-start card">
                <b-row class="d-flex w-100 justify-content-between;">
                  <b-col class="wipe-color-change">
                    <router-link :data-text="list.list_name" :to="`/Lista/${list.id}`" class="text-white;">
                      <h5 class="mb-1">{{list.list_name}}</h5>
                    </router-link>
                  </b-col>
                  <b-col>
                    <b-row>
                      <small class="created_at ml-auto" >{{list.created_at_date}}</small>
                    </b-row>
                  </b-col>
                  <div class="w-100"></div>
                  <b-col cols="8">
                    <p class="text-white mb-1">
                      {{'Kvar: ' + list.progress}}
                    </p>
                  </b-col>
                  <b-col cols="4">
                    <b-row>
                      <b-icon class="mr-2 ml-auto add-icon" @click="modalShowEdit = !modalShowEdit; currentList = list" icon="pencil" scale="1" variant="secondary"></b-icon>
                      <b-icon class="add-icon" @click="modalShowDelete = !modalShowDelete; currentList = list"  icon="trash" scale="1" variant="danger"></b-icon>
                    </b-row>
                  </b-col>
                </b-row>

              </b-list-group-item>
            </b-list-group>
          </div>
          </div>
        </b-col>
      </b-row>
       <!-- add modal -->
      <b-modal
        ref="modal"
        title="Skapa ny lista"
        v-model="modalShowAdd"
        class="modal-title"
      >
        <form ref="form" @submit.stop.prevent="createNewList(createList)">
          <b-form-group
            label="Namn"
            label-for="createList-input"
          >
            <b-form-input
              autofocus
              id="createList-input"
              v-model="createList"
              required
            ></b-form-input>
          </b-form-group>
        </form>
         <p v-if="checkIfValidNewList">
          <b-icon class="mr-2" icon="exclamation-triangle-fill" scale="1.5" variant="warning"></b-icon>
          Fyll i fältet ovanför eller klicka på avbryt!
        </p>
        <template #modal-footer>          
          <b-button
            variant="secondary"
            size="sm"
            class="float-left"
            @click="modalShowAdd = false"
          >
            Avbryt
          </b-button>

            <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="createNewList(createList)"
          > 
            Skapa
          </b-button>
        </template>
      </b-modal>

      <!-- edit modal -->
      <b-modal
        ref="modal"
        :title="`Byt namn på listan   &quot;${currentList.list_name}&quot; `"
        v-model="modalShowEdit"
      >
        <form ref="form" @submit.stop.prevent="editListName(currentList.id, updateListName)">
          <b-form-group
            label="Nytt namn"
            label-for="updateListName-input"
          >
            <b-form-input
              autofocus
              id="updateListName-input"
              v-model="updateListName"
              required
            ></b-form-input>
          </b-form-group>
        </form>
        <p v-if="checkIfValidEdit">
          <b-icon class="mr-2" icon="exclamation-triangle-fill" scale="1.5" variant="warning"></b-icon>
          Fyll i fältet ovanför eller klicka på avbryt!
        </p>
        <template #modal-footer>          
          <b-button
            variant="secondary"
            size="sm"
            class="float-left"
            @click="modalShowEdit = false;"
          >
            Avbryt
          </b-button>

            <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="editListName(currentList.id, updateListName)"
          >
            Uppdatera
          </b-button>
        </template>
      </b-modal>
      
      <!-- delete modal -->
      <b-modal
        ref="modal"
        :title="`&quot;${currentList.list_name}&quot;`"
        v-model="modalShowDelete"
      >
        <p>
          Är du säker på att du vill ta bort listan?
        </p>

        <template #modal-footer>          
          <b-button
            variant="danger"
            size="sm"
            class="float-left"
            @click="modalShowDelete = false"
          >
            Avbryt
          </b-button>

            <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="deleteList(currentList.id); Alert(`&quot;${currentList.list_name}&quot; har tagits bort!`, 'danger')"
          >
            Ja
          </b-button>
        </template>
      </b-modal>
    </b-container>
  </div>
</template>

<style>
  .modal-title {
    text-transform: capitalize;
  }

  .wipe-color-change a{
  position: relative;
  display: inline-block;
  color: white;
  padding-left: 1.7rem;
  }

  .wipe-color-change a::before {
    border-right: solid #1779ff 5px;
    content: attr(data-text);
    position: absolute;
    top: -3px;
    left: 10px;
    width: 0;
    overflow: hidden;
    color: #1770ff;
    height: 24px;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.2s cubic-bezier(0.29, 0.73, 0.74, 1.02);
    text-transform: capitalize;
  }

  .wipe-color-change [data-animation] a::before,
  .wipe-color-change a:hover::before {
    border-right: solid 5px #fff;
    width: 100%;
    padding-left: 1rem;
    transition: all 0.6s cubic-bezier(0.29, 0.73, 0.74, 1.02);
  }

  .wipe-color-change a:hover {
    color: rgba(0, 0, 0, 0);
  }

  .add-icon {
    cursor: pointer;
  }

  .tillbaka-btn {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 3;
  }

  .alert-response {
    margin: 1rem;
    transition: 0.5s;
    text-align: center;
    transition-timing-function: ease-in;
    text-transform: capitalize;
  }

  .listor-title {
    color: white;
    border-left: 5px solid #1779ff;
    padding: 0 1rem;
    text-transform: capitalize;
  }

  .list-group .list-group-item div h5 {
    text-transform: capitalize;
    text-decoration: none;
  }

  .row.lists-layout {
    background-color: #13131fb9;
    border-radius: 15px;
    padding: 2rem .5rem;
    margin: 3rem 0 0 0;
  }

  /* media query */
  @media only screen and (max-width: 769px) {
    .checkbox-with-icons-layout {
      flex-wrap: nowrap ;
    }
    .tillbaka-btn {
      left: 10px;
      top: 40px;
    }

    .MinaListor  .row.lists-layout {
      height: 100vh;
    }
  }

  @media only screen and (max-width: 440px) {
  .row.lists-layout {
    border-radius: 0;
    margin: 0;
    padding: 2rem 0;
  }
  .container {
    padding: 0;
    margin: 0;
  }
}

  .each-row:hover{
    transform: scale(1.02);
    transition-timing-function: ease-in;
    transition: 0.25s;
  }
</style>

<style scoped>
.container .card:hover { 
  backdrop-filter: none;
}
</style>

<script>
import AlertMessages from '../components/AlertMessages.vue'
import moment from 'moment';
moment.locale('sv');
export default {
  name: 'MinaListor',
  data: function() {
    return {
      lists: null,
      updateListName: null,
      currentList: {},
      modalShowEdit: false,
      modalShowDelete: false,
      modalShowAdd: false,
      createList: null,
      alertType: String,
      alerts: [],
      tasksDone: {},
      checkIfValidEdit: null,
      checkIfValidNewList: null
    }
  },
  components: {
    AlertMessages
  },
  methods: {
    getLists() {
      fetch('http://localhost:3000/Listor/')
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.lists = result.rows;
        this.lists.forEach((list, index) => {
          this.getTasksDone(list.id, index);
          list.created_at_date = moment(moment.utc(list.created_at_date + " " + list.created_at_time).toDate()).fromNow();
        }) 
      });
    },

    editListName(listId, updateListName) {
      if(updateListName !== null) {
        console.log(listId, updateListName, 'update');
        fetch('http://localhost:3000/updateListName/', {
          body: JSON.stringify({
            list_name: updateListName,
            id: listId
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT"
        })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          this.updateListName = null;
          this.modalShowEdit = false;
          this.Alert(`"${this.currentList.list_name}" har uppdaterats till "${updateListName}"`, 'success');
          this.getLists();
        }); 
      } else {
        this.checkIfValidEdit = true;
      }
    },

     deleteList(listId) {
      console.log(listId, 'delete');
      fetch('http://localhost:3000/deleteList/', {
        body: JSON.stringify({
          id: listId
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE"
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.modalShowDelete = false;
        this.getLists();
        
      }); 
    },

    createNewList(createList) {
      if(createList !== null || createList === '') {
        console.log(createList, 'skapa');
        fetch('http://localhost:3000/SkapaLista/', {
          body: JSON.stringify({
            list_name: createList
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          this.modalShowAdd = false;
          this.getLists();
          this.Alert(`"${this.createList}" har skapats!`, 'success');
          this.createList = null;
        }); 
      } else {
        this.checkIfValidNewList = true;
      }
    },

    getTasksDone(listDid, index) {
      fetch('http://localhost:3000/getTasksDone/' + listDid)
      .then(response => response.json())
      .then(result => {
        console.log(result.rows);
        console.log(index);
        this.$set(this.lists[index], 'progress', `${result.rows.filter(x => x.checked === 1).length} av ${result.rows.length}`);
      });
    },

    Alert(alertMessage, alertColor) {
      this.alerts.push({
        color: alertColor,
        message: alertMessage
      })
    },
  },
  
  created() {
    this.getLists();
  },

  watch: {
    modalShowEdit: function(val) {
      if(val) {
       this.checkIfValidEdit = false;
      } else {
        this.checkIfValidEdit = true;
      }
    },

    modalShowAdd: function(val) {
      if(val) {
       this.checkIfValidNewList = false;
      } else {
        this.checkIfValidNewList = true;
      }
    },
  }

}
</script>
