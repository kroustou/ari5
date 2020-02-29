
export const FetchNowPlaying = (callback) => {
    return fetch('http://165.22.88.231/api/nowplaying/1').then(response => {
        return response.json().then(json => {
            let history = []
            json.song_history.map(item => history.push({
                title: item.song.text,
                image: item.song.art

            }))
            let response = {
                now: {
                    title: json.now_playing.song.text,
                    image: json.now_playing.song.art
                },
                history
            }

            callback(response)
        })
    })
}