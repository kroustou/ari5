$(function () {
    var player = new MediaElementPlayer('video,audio', {
        features: [
            'playpause',
            'current',
            'volume',
            'fullscreen'
        ],
    });

    $('body').on('click', '#play', function () {
        player.play();
        $(this).addClass('hidden');
        $('body #pause').removeClass('hidden')
    });

    $('body').on('click', '#pause', function () {
        player.pause();
        $(this).addClass('hidden');
        $('body #play').removeClass('hidden')
    });
});
