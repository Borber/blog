const dp = new DPlayer({
    container: document.getElementById("dplayer"),
    video: {
    url:"//aliregistry-cn-shanghai.oss-cn-shanghai.aliyuncs.com/docker/registry/v2/blobs/sha256/45/45c46393a808b2e5eaf49111aa920a8df9afaeaf78278ff54f41cf3cb92c27bc/data?Expires=1609305624&OSSAccessKeyId=LTAI4FyN99sZuwGQsaDkPxbv&Signature=vB87SP8j6jGPABXtg1a6hmNrJj0%3D",
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
