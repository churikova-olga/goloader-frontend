import axios from "axios";

export default {
    state: {
        reviews: [],
    },

    actions:{
        GET_REVIEWS_FROM_API({commit}, data){

            return axios.get(`api/review/${data.id}`, {
                params: data
            })
                .then((review )=>{
                    commit('SET_COMMENTS_TO_STATE', review.data);
                    return review
                })
                .catch((error)=>{
                    console.log(error)
                    return error;
                })
        },

    },
    mutations: {
        SET_COMMENTS_TO_STATE(state, reviews){
            state.reviews = reviews;
        },

    },
    getters: {
        REVIEWS(state){
            return state.reviews;
        },


    }

}
