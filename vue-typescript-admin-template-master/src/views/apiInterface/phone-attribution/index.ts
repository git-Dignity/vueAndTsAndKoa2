import { Check } from "javascript-tool-class/src/App";

const itemList = [
    {
        name: "手机号码段",
        value: ""
    },
    {
        name: "卡号归属地",
        value: 0
    },
    {
        name: "运营商",
        value: 0
    },
    {
        name: "区号",
        value: 0
    },
    {
        name: "邮编",
        value: 0
    }
]


const myCheck = new Check();



export {
    itemList,
    myCheck
}