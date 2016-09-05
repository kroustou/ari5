import * as settings from './settings'

export const FetchNowPlaying = (callback) => {
    return fetch(settings.server + '/now-playing/').then(response => {
        return response.json().then(json => {
            let newNow = {'title': json.result.replace(/\+/gi, ' ')}
            if (json.image) {
                newNow.image = json.image
            }
            callback(newNow)
        })
    })
}


export const FetchHistory = callback => {
    return fetch(settings.server + '/history/').then(response => {
        return response.json().then(json => {
            callback(json)
        })
    })
}
