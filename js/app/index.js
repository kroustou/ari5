import jquery from 'jquery'
import {createStore} from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import player from './reducers'
import PlayerWrapper from './components/Player'
import Share from './components/Share'
import {fetchNowPlaying} from './actions'


const App = (a) => (
    <div>
        <PlayerWrapper stream='http://213.239.218.99:7136/stream' type="audio/mpeg" preload="auto"/>
        <Share/>
    </div>
)


let store = createStore(player)


// we need to render the app first...
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main')
)

