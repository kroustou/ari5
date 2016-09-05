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



function setBackground() {
    var colors = [
        '#2c3e50',
        '#8e44ad',
        '#9b59b6',
        '#c0392b',
        '#f39c12',
        '#3498db',
        '#16a085',
        '#1abc9c',
        '#f1c40f',
        '#f39c12',
        '#95a5a6',
        '#7f8c8d',
    ]
    var now = Math.floor(new Date().getHours()/2)
    $('header').css({'background-color': colors[now]})
}

setBackground()
