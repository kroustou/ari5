$(function () {
    function now_playing(callback) {
        $.getJSON('http://83.212.120.112:5050/now-playing/', function(data) {
            if (data.success) {
                data.result = data.result.replace(/\+/gi, ' ');
                return callback(data);
            }
        });
    }

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
        var now = Math.floor(new Date().getHours()/2);
        $('header').css({'background-color': colors[now]});
    }

    setBackground();

    var now;
    var played_songs = [];

    function setNow(data) {
        if (!now  || (data.result != now.result)) {
            if (typeof now != 'undefined') {
                played_songs.unshift(now);
            }
            now = data;
        }
    }

    now_playing(function(data) {
        setNow(data);
    });

    function getHistory() {
        $.getJSON('http://83.212.120.112:5050/history/', function(data) {
            if (data.success) {
                for (var i=0;i < data.songs.length; i++) {
                    played_songs.push(data.songs[i]);
                }
            }
        });
    }
    getHistory();

    setInterval(
        function () {
            now_playing(function(data) {
                setNow(data);
            });
        },
        10000
    );

    var Share = React.createClass({
        summary: 'Listening at home again'  ,
        caption: 'By ari5',
        location: document.location,
        defaultImage: 'http://kroustou.github.io/ari5/images/fb.png',
        image: function () {
            return this.props.song.image ? this.props.song.image : this.defaultImage
        },
        link: function () {
            return 'https://facebook.com/sharer.php?u=' + encodeURIComponent(this.location) + '&title=' + this.props.song.result + '&description=' + this.summary + ', ' + this.caption + '&picture=' + this.image();
        },
        render: function () {
            return (
                <a target="_blank" href={this.link()} className="fb-share"><span className="fui-facebook"></span> Share</a>
            )
        }
    });

    var History = React.createClass({
         getInitialState: function() {
            return {played: played_songs}
        },
        componentDidMount: function() {
            var self = this;
            setInterval(function() {
                self.setState({played: played_songs});
            }, 2000);
        },
        render: function () {
            return (
                <div className="last-played col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6 row">
                    <div className="row col-xs-12">
                    { this.state.played.length ? <h6>Previously</h6>: '' }
                        <div className="songs col-xs-12 row">{
                                this.state.played.map(
                                    function(object, i){
                                        if (object) {
                                            return <Player song={object}/>;
                                        }
                                        return
                                    }
                                )
                            }</div>
                    </div>
                </div>
            )
        }
    });


    var Listeners = React.createClass({
        getListeners: function () {
            var self = this;
            $.getJSON('http://83.212.120.112:5050/listeners/', function(data) {
                if (data.listeners) {
                    return self.setState(data);
                }
            });
        },
        getInitialState: function() {
            return {listeners: '?'}
        },
        componentDidMount: function() {
            var self = this;
            var listeners;
            self.getListeners();
            setInterval(function() {
                self.getListeners();
            }, 15000);
        },
        render: function () {
            return (
                <div className="listeners centerFlex">
                    {this.state.listeners} <span className="fui-user"></span>
                </div>
            )
        }
    });



    var Player = React.createClass({
        defaultImage: 'http://placehold.it/150x150?text=no+image',
        youtube: function () {
            return "https://www.youtube.com/results?search_query=" + this.props.song.result
        },
        render: function () {
            return (
                <div className="centerFlex row ">
                    <div className="now-playing col-xs-10">
                        <div className="now centerFlex row">
                            <div className="img col-xs-4 col-sm-3 col-md-2">
                                <img src={this.props.song.image ? this.props.song.image: this.defaultImage} alt=""/>
                            </div>
                            <div className="col-xs-8 col-sm-9 col-md-10">
                                    {this.props.song.result}
                            </div>
                        </div>
                    </div>

                    <div className="buttons col-xs-2">
                        <a id="play">
                            <span  className="fui-play"></span>
                        </a>
                        <a id="pause" className="hidden">
                            <span className="fui-pause"></span>
                        </a>
                    </div>
                    <div className="col-xs-2 youtube">
                        <a className="fui-youtube col-sm-1" target="_blank" href={this.youtube()}></a>
                    </div>
                </div>
            )
        }
    });



    var PlayerAndShare = React.createClass({
        defaultImage: 'http://placehold.it/150x150?text=no+image',
        getInitialState: function() {
            return {
                now: {
                    image: this.defaultImage,
                    result: 'loading...'
                }
            }
        },
        componentDidMount: function() {
            var self = this;
            setInterval(function() {
                if (now) {
                    self.setState({now: now});
                }
            }, 2000);
        },
        render: function() {
            return (
                <div className="main-wrapper">
                    <Listeners></Listeners>
                    <div className="player container-fluid " id="player">
                        <div className="controls row col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6">
                            <Player song={this.state.now}/>
                        </div>
                        <History played={played_songs}/>
                    </div>
                    <div className="social col-md-12">
                        <Share song={this.state.now}/>
                    </div>
                </div>
            );
        }
    });

    ReactDOM.render(
        <PlayerAndShare />,
        document.getElementById('main')
    );
});
