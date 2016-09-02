import React from 'react'
import { connect } from 'react-redux'


let PlayerState = (state) => {
    return {
        now: state.playerReducer.now,
        playing: state.playerReducer.playing,
        history: state.playerReducer.history
    }
}

let PlayerDispatch = (dispatch) => {
    return {
        togglePlay: () => {
            dispatch({
                type: 'TOGGLE_PLAY_STOP'
            })
        },
        initPlayer: () => {
            dispatch({
                type: 'INIT_PLAYER'
            })
        }
    }
}


class Player extends React.Component {
    youtube() {
        return "https://www.youtube.com/results?search_query=" + this.props.now.title
    }
    render () {
        return (
            <div className="now-playing col-xs-10">
                <div className="now centerFlex row">
                    <div className="img col-xs-4 col-sm-3 col-md-2">
                        <img src={this.props.now.image} alt=""/>
                    </div>
                    <div className="col-xs-8 col-sm-9 col-md-10">
                            {this.props.now.title}
                    </div>
                    <div className="col-xs-2 youtube">
                        <a className="fui-youtube col-sm-1" target="_blank" href={this.youtube()}></a>
                    </div>
                </div>
            </div>
        )
    }
}

class PlayerWrapper extends React.Component {
    render () {
        return (
            <div className="player container-fluid " id="player">
                <div className="controls row col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6">
                    <div className="centerFlex row ">
                        <Player now={this.props.now} ></Player>
                        <div className="buttons col-xs-2">
                            <a onClick={this.props.togglePlay} className="Toggle">
                                {this.props.playing ? <span  className="fui-pause"></span> : <span className="fui-play"></span>}
                            </a>
                        </div>

                        <audio src={this.props.stream} preload="auto"/>
                    </div>
                </div>
                <div className="last-played col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6 row">
                    <div className="row col-xs-12">
                        <h6>Previously</h6>
                        <div className="songs col-xs-12 row">
                            <Player now={this.props.now}/>
                            <Player now={this.props.now}/>
                            <Player now={this.props.now}/>
                            <Player now={this.props.now}/>
                            <Player now={this.props.now}/>
                            <Player now={this.props.now}/>
                            <Player now={this.props.now}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PlayerWrapper = connect(
  PlayerState,
  PlayerDispatch
)(PlayerWrapper)

export default PlayerWrapper
