export default {
  state: {
    orders: [],
    orderSet: null,
  },
  getters: {},
  mutations: {
    SET_ORDER(state, payload) {
      state.orders.push(payload);
      localStorage.setItem('order', JSON.stringify(state.orders));
    },
    DELETE_ORDER(state, payload) {
      state.orders.splice(payload, 1);
      localStorage.setItem('order', JSON.stringify(state.orders));
    },
    SET_ORDER_SET(state, payload) {
      state.orderSet = payload;
      localStorage.setItem('orderSet', JSON.stringify(state.orderSet));
    },
    GET_ORDER(state) {
      const orders = localStorage.getItem('order');
      console.log(orders);
      if (orders != null) {
        console.log('passing through');
        state.orders = JSON.parse(localStorage.getItem('order'));
      }
    },
    RESET_ORDER(state) {
      state.orders = [];
      localStorage.setItem('order', JSON.stringify(state.orders));
      localStorage.removeItem('order');
      localStorage.removeItem('orderSet');
    },
  },
  actions: {
    setOrder({ commit }, data) {
      commit('SET_ORDER', data);
    },
    deleteOrder({ commit }, data) {
      commit('DELETE_ORDER', data);
    },
    setOrderSet({ commit }, data) {
      commit('SET_ORDER_SET', data);
    },
    getOrder({ commit }) {
      commit('GET_ORDER');
    },
    resetOrder({ commit }) {
      commit('RESET_ORDER');
    },
  },
};
