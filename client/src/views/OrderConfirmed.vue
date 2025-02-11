<template>
<div>
  <side-bar/>
  <page-header title="Order Confirmed">
      <!-- confirmation message -->
      <div v-if="state.orders">
        <h1
        class="
          manrope-bold
          left-0
          -top-3.5
          text-gray-600 text-md
          pt-8
          px-8
          "
          >Thank you for ordering! Here are the details of your order/s:</h1
        >

        <!-- delivery information details -->
        <h1
          class="
            manrope-bold
            left-0
            -top-3.5
            text-gray-600 text-md
            pt-5
            px-8
          "
          >Name: {{ state.orderSet.name }} </h1
        >
        <h1
          class="
            manrope-bold
            left-0
            text-gray-600 text-md
            pt-2
            px-8
          "
          >E-mail Address: {{ state.orderSet.email }} </h1
        >
        <h1
          class="
            manrope-bold
            left-0
            text-gray-600 text-md
            pt-2
            px-8
          "
          >Contact Number: {{ state.orderSet.contactNo }} </h1
        >
        <h1
          class="
            manrope-bold
            left-0
            text-gray-600 text-md
            pt-2
            px-8
          "
          >Delivery Address: {{ state.orderSet.address }} </h1
        >

        <h1
          class="
            manrope-extrabold
            text-primary-blue
            left-0
            text-gray-600 text-md
            pt-2
            px-8
            mt-5
            mb-5
          "
          >Please check your email ({{ state.orderSet.email }}) for future updates regarding the order/s. </h1
        >

        <!-- display all recently placed orders of user -->
        <div class="overflow-y-auto max-h-screen scrollbar-hidden pt-2 pb-2">
          <OrderCard v-for="order in state.orders" :key="order.id" :order="order"/>
        </div>
        
        <!-- go back button -->
        <router-link
          class="
            manrope-regular
            text-white
            transition
            duration-300
            inline-block
            ease-in-out
            text-center text-md
            hover:bg-link-water hover:text-primary-blue
            p-2
            px-5
            mb-8
            mt-8
            ml-8
            rounded-xl
            bg-primary-blue"
            to="/order">Go Back</router-link>
      </div>
  </page-header>
</div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import PageHeader from '../components/PageHeader.vue';
import OrderCard from '../components/OrderCard.vue';
import { reactive, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import * as api from '../api/index.js';

export default {
  name: 'OrderConfirmed',
  components: {
    SideBar,
    PageHeader,
    OrderCard,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      orders: null,
      orderSet: null,
    });

    async function getPlacedOrders() {
      // get recently placed orders
      state.orders = JSON.parse(localStorage.getItem('confirmedOrders'));

      // get delivery information details from order set
      state.orderSet = JSON.parse(localStorage.getItem('orderSet'));
      
      // reset or empty cart after getting the data for display
      store.dispatch('resetOrder');
    }

    onBeforeMount(() => {
      // to get placed orders to be rendered and displayed in the page
      getPlacedOrders();
    });

    return { state, getPlacedOrders };
  },
}
</script>

<style>
.next-btn {
  width: 10rem;
  height: 5rem;
  border-radius: 20px;
}

.sidebar {
  width: 20rem;
  height: 100vh;
  background: #e7edf2;
}

.header {
  width: 100vw;
  height: 11rem;
}

.content-box {
  display: flex;
  flex-flow: row wrap;
}

.sidebar-btn {
  width: 10rem;
  height: 5rem;
  border-radius: 20px;
}

.manrope-regular {
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
}

.manrope-bold {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
}

.manrope-extrabold {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
</style>