// 歌手表单信息
const singerInfo = {
    name: "singerInfo",
    position: "left",
    labelWidth: 100,
    size: "medium",
    info: {
        singerName: {
            label: "music.singerName",
            name: "singerName",
            value: "",
            disabled: false,
            hidden: false,
            // 规则必须也得定义在form绑定的model中
            rule: {
                required: true, message: "歌手名不能为空"
            }
        }
    }
};

export {
    singerInfo
};
