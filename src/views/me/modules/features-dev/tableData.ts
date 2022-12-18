import { frontEndTypeOptions } from "./options";

const columns = {
    serialNum: {
        prop: "serialNum",
        label: "序号",
        width: "5%"
    },
    title: {
        prop: "title",
        label: "标题",
        width: "5%"
    },
    content: {
        prop: "content",
        label: "内容",
        width: "10%"
    },
    type: {
        prop: "type",
        label: "类型",
        width: "5%"
    },
    photo: {
        prop: "photo",
        label: "照片",
        width: "5%",
        isPhoto: true
    },
    auth: {
        prop: "auth",
        label: "作者",
        width: "5%"
    },
    remarks: {
        prop: "remarks",
        width: "10%",
        label: "备注"
    },
    handSolt: {
        prop: "handSolt",
        width: "20%",
        label: "操作"
    }
};

/**
 * 将类型转为对应的中文
 * @param row
 */
const formatterType = (row: any) => { // row, column
    let type = "";
    switch (row.type) {
        case `${frontEndTypeOptions[0].value}`:
            type = frontEndTypeOptions[0].label;
            break;
        case `${frontEndTypeOptions[1].value}`:
            type = frontEndTypeOptions[1].label;
            break;
        case `${frontEndTypeOptions[2].value}`:
            type = frontEndTypeOptions[2].label;
            break;
        default:
            type = frontEndTypeOptions[1].label;
    }

    return type;
};

export {
    columns,
    formatterType

};
