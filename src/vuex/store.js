import { createStore } from 'vuex'

import catalogGame from './modules/catalog_game'
import catalogReview from './modules/catalog_review'
const store = createStore({
    modules: {
        catalogGame,
        catalogReview
    }
})

export default store