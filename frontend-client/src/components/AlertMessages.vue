<template>
  <b-alert 
        class="alert-response"
        :show="dismissCountDown"
        dismissible
        :variant="color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        >
        {{message}}
    </b-alert>
</template>

<script>
export default {
    data: function() {
        return {
            dismissSecs: 5,
            dismissCountDown: 0,
        }
    },
    props: {
        color: String,
        message: String
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        
        showAlert() {
        this.dismissCountDown = this.dismissSecs
        },

    },
    created() {
    this.showAlert();
  }
}
</script>