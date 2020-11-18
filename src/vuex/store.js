import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state:{     //<-- создаём пустой массив
        products:[],
        cart:[]
    },
    mutations:{     //<-- мутация наполняет state
        SET_PRODUCTS_TO_STATE:(state, products) => {
            state.products = products;
        },
        SET_CART: (state, product) => {
            if(state.cart.length){
                let isProductExists = false;
                state.cart.map(function(item){
                    if(item.article === product.article){
                        isProductExists = true;
                        item.quantity++;
                    }
                })
                if(!isProductExists){
                    state.cart.push(product);
                }
            }else{
                state.cart.push(product);
            }
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1);
        }
    },
    actions:{
        GET_PRODUCTS_FROM_API({commit}){     //<-- получает данные по API и отправляет в state используя мутацию
            return axios(' http://localhost:3000/products', {
                method: "GET"
            })
                .then((products) => {
                    commit('SET_PRODUCTS_TO_STATE', products.data);
                    return products;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        ADD_TO_CART({commit}, product){
            commit('SET_CART', product);
        },
        DELETE_FROM_CART({commit}, index){
            commit('REMOVE_FROM_CART', index);
        }
    },
    getters:{     //<-- получает и возвращает данные из state в компонент
        PRODUCTS(state){
            return state.products;
        },
        CART(state){
            return state.cart;
        }
    }
});

export default store;