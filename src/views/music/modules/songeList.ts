const songeList = [
    {
        header: {
            unique: "歌",
            rightText: "手榜",
            time: "05月31日更新",
            play: false
        },
        link: {
            path: "/music/music-singer",
            query: {}
        },
        bg: "linear-gradient(141deg,#9948ca 0%,#924fcb 51%,#9948ca 75%)",
        list: [{ songer: "", singer: "", index: 0 }]
    },
    {
        header: {
            unique: "轻",
            rightText: "音乐榜",
            time: "05月31日更新",
            play: true
        },
        link: {
            path: "/music/singer-song-list",
            query: {
                singerName: "轻"
            }
        },
        bg: "linear-gradient(141deg,#149AB4 0%,#46B8C3 51%,#30B3C3 75%)",
        list: [{ songer: "小朋友，你是否有很多问号？", singer: "周杰伦", index: 0 }]
    },
    {
        header: {
            unique: "音",
            rightText: "乐馆",
            time: "06月17日更新",
            play: true
        },
        link: {
            path: "/music/singer-song-list",
            query: {
                singerName: ""
            }
        },
        bg: "linear-gradient(141deg,#E64D7A 0%,#DC4673 51%,#CC446C 75%)",
        list: [{ songer: "暂无数据", singer: "阿泽", index: 0 }]
    }
];

export {
    songeList
};
