import {combineReducers} from 'redux'
import 'mediaelement/build/mediaelement-and-player'


let initialNow = {
	title: 'Loading...',
    image: 'http://placehold.it/150x150?text=no+image'
}

let initialState = {
    now: initialNow,
    playing: false,
    history: [],
    player: undefined
}

const nowPlaying = (prev) => {
	return Object.assign({}, prev, {title: 'lalas'})
}

const playerReducer = (state=initialState, action) => {
  switch (action.type) {
  	case 'INIT_PLAYER':
	  	let mediaPlayer = new MediaElementPlayer('audio', {
		    features: [
		        'playpause',
		        'current',
		        'volume',
		        'fullscreen'
		    ],
		})
  		return Object.assign({}, state, {player: mediaPlayer})
    case 'TOGGLE_PLAY_STOP':
    	if (state.playing) {
    		state.player.pause()
    	} else {
    		state.player.load()
    		state.player.play()
    	}
    	return Object.assign({}, state, {playing: !state.playing})
    case 'UPDATE_NOW_PLAYING':
    	let newNow = nowPlaying(state.now)
    	return Object.assign({}, state, {now: newNow})
    default:
      return state
  }
}


const player = combineReducers({
  playerReducer
})

export default player
