function now_playing(callback) {
    $.getJSON('http://83.212.120.112:5050/now-playing/', function(data) {
        if (data.success) {
            data.result = data.result.replace(/\+/gi, ' ');
            return callback(data);
        }
    });
}

var now;

var played_songs = [];

now_playing(function(data) {
    if (data !== now) {
        if (now) {
            played_songs.unshift(now);
        }
        now = data;
    }
});
setInterval(
    function () {
        now_playing(function(data) {
            now = data;
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
            console.log(played_songs);
            self.setState({played: played_songs});
        }, 2000);
    },
    render: function () {
        return (
            <div className="last-played col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6 row">
                <div className="row col-xs-10">
                    {
                        this.state.played.map(
                            function(object, i){
                                return <Player song={object}/>;
                            }
                        )
                    }
                </div>
            </div>
        )
    }
})

var Player = React.createClass({
    defaultImage: 'http://placehold.it/150x150?text=no+image',
    render: function () {
        return (
            <div className="now-playing col-xs-10">
                <div className="now centerFlex row">
                    <div className="img col-xs-4 col-sm-3 col-md-2">
                        <img src={this.props.song.image ? this.props.song.image: this.defaultImage} alt=""/>
                    </div>
                    <div className="col-xs-8 col-sm-9 col-md-10">
                        <div className="playing">
                            {this.props.song.result}
                        </div>
                    </div>
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
                <div className="player container-fluid " id="player">
                    <div className="controls row col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6">
                        <div className="centerFlex row ">
                            <Player song={this.state.now}/>
                            <div className="buttons col-xs-2">
                                <a id="play">
                                    <span  className="fui-play"></span>
                                </a>
                                <a id="pause" className="hidden">
                                    <span className="fui-pause"></span>
                                </a>
                            </div>
                        </div>
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
