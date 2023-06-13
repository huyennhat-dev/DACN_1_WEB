<template>
    <a-result
      status="error"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <router-link :to="{ name: 'index' }">
          <a-button key="buy">Buy Again</a-button>
        </router-link>
      </template>
    </a-result>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  export default defineComponent({
    created() {
      this.createOrder();
    },
    methods: {
      async createOrder() {
       
        try {
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
  </script>
  