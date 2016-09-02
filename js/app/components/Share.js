import React from 'react'
import { connect } from 'react-redux'


let ShareState = (state) => {
    return {
        now: state.playerReducer.now,
    }
}


let Share = ({now}) => {
	const share = {
		summary: 'Listening at home again',
	    caption: 'By ari5',
	    location: document.location
	}
	return (
		<a target="_blank" href={'https://facebook.com/sharer.php?u=' + encodeURIComponent(share.location) + '&title=' + now.title + '&description=' + share.summary + ', ' + share.caption + '&picture=' + now.image} className="fb-share"><span className="fui-facebook"></span> Share</a>
	)
}

Share = connect(
  ShareState,
  {}
)(Share)

export default Share
