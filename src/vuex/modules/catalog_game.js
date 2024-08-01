import axios from "axios";

export default {
    state:{
        games: [],
        game: {}
    },

    actions:{
        GET_GAMES_FROM_API({commit}, data){

            return axios.get(`api/game`, {
                params: data
            })
                .then((game )=>{
                    commit('SET_GAMES_TO_STATE', game.data);
                    return game
                })
                .catch((error)=>{
                    console.log(error)
                    return error;
                })
        },
        GET_GAME_BY_ID({commit}, id){
            return axios(`http://localhost:3000/api/game/${id}`, {
                method: "GET",
            })
                .then((response)=>{
                    commit('SET_GAME_TO_STATE', response.data);

                    return response
                }).catch((error)=>{
                    console.log(error)
                    return error;
                })
        }
    },
    mutations: {
        SET_GAMES_TO_STATE(state, games){
            state.games = games;
        },
        SET_GAME_TO_STATE(state, game){
            state.game = game;
        }
    },
    getters: {
        GAMES(state){
            return state.games;
        },
        GAME(state){
            return state.game;
        }

    }

}
