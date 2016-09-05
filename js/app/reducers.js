import {combineReducers} from 'redux'
import 'mediaelement/build/mediaelement-and-player'


let defaultNow = {
  title: 'Loading...',
  image: 'http://placehold.it/150x150?text=no+image'
}
let initialNow = Object.assign({}, defaultNow, {initial: true})

let initialState = {
    now: initialNow,
    playing: false,
    history: [],
    player: undefined
}

const addToHistory = (history, song) => {
  let newHist = history
   if (song.initial) {
      return newHist
    }
    newHist.unshift(Object.assign({}, defaultNow, song))
    return newHist
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
    case 'SET_NOW_PLAYING':
      if (state.now.title !== action.new.title) {
        let newObj = Object.assign({}, defaultNow, action.new)
        let newHist = addToHistory(state.history, state.now)
        return Object.assign({}, state, {now: newObj, history: newHist})
      }
      return state
    case 'ADD_TO_HISTORY':
      // we have to add image in case it does not exist
      let newObj = Object.assign({}, defaultNow, action.item)
      let newHist = addToHistory(state.history.slice(), action.item)
      return Object.assign({}, state, {history: newHist})
    default:
      return state
  }
}


const player = combineReducers({
  playerReducer
})

export default player
