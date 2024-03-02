const dp = new DPlayer({
    container: document.getElementById("dplayer"),
    video: {
    url:"https://cdn.jsdelivr.net/gh/Borber/PubVideos1@master/gamesci_wukong/gamesci_wukong.m3u8",
    type: "customHls",
    customType: {
        customHls: function (video, player) {
        const hls = new Hls();
        hls.loadSource(video.src);
        hls.attachMedia(video);
        },
    },
    },
});
