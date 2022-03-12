import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {     //<-- создаём пустой массив
        products: [],
        cart: [],
        searchValue: ''
    },
    mutations: {     //<-- мутация наполняет state
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        SET_CART: (state, product) => {
            if (state.cart.length) {
                let isProductExists = false;
                state.cart.map(function (item) {
                    if (item.article === product.article) {
                        isProductExists = true;
                        item.quantity++;
                    }
                })
                if (!isProductExists) {
                    state.cart.push(product);
                }
            } else {
                state.cart.push(product);
            }
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1);
        },
        INCREMENT: (state, index) => {
            state.cart[index].quantity++
        },
        DECREMENT: (state, index) => {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--
            }
        },
        SET_SEARCH_VALUE_TO_VUEX: (state, value) => {
            state.searchValue = value;
        }
    },
    actions: {
        async GET_PRODUCTS_FROM_API({commit}) {     //<-- получает данные по API и отправляет в state используя мутацию
            fetch('https://raw.githubusercontent.com/Konstantin108/vue_cli_store4/master/db.json')
                .then(response => response.json())    //<-- тут используется простой fetch на raw ссылку c github
                // return axios(' http://localhost:3000/products', {    //<-- тут используется axios и json-server, этот вариант не работает на хостинге
                //     method: "GET"
                // })
                //     .then((products) => {
                //         commit('SET_PRODUCTS_TO_STATE', products.data);
                //         return products;
                //     })
                .then((products) => {
                    commit('SET_PRODUCTS_TO_STATE', products.products);
                    return products;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        ADD_TO_CART({commit}, product) {
            commit('SET_CART', product);
        },
        INCREMENT_CART_ITEM({commit}, index) {
            commit('INCREMENT', index);
        },
        DECREMENT_CART_ITEM({commit}, index) {
            commit('DECREMENT', index)
        },
        DELETE_FROM_CART({commit}, index) {
            commit('REMOVE_FROM_CART', index);
        },
        GET_SEARCH_VALUE_TO_VUEX({commit}, value) {
            commit('SET_SEARCH_VALUE_TO_VUEX', value);
        }
    },
    getters: {     //<-- получает и возвращает данные из state в компонент
        PRODUCTS(state) {
            return state.products;
        },
        CART(state) {
            return state.cart;
        },
        SEARCH_VALUE(state) {
            return state.searchValue;
        }
    }
});

export default store;