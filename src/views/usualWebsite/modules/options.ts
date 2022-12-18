/*
 * @Author: zemin zheng
 * @Date: 2021-10-06 14:50:44
 * @LastEditTime: 2022-02-28 15:25:56
 * @LastEditors: Please set LastEditors
 * @Description: 常用网站 -- option类型下拉框选项
 * @FilePath: \vueAndTsAndKoa2\src\views\usualWebsite\modules\options.ts
 */

// 编程program的option
const programTypeOptions = [
    { value: "前端", label: "前端" },
    { value: "后端", label: "后端" },
    { value: "前后端", label: "前后端" },
    { value: "其他", label: "其他" }
];

// github的option
const githubTypeOptions = [
    { value: "前端", label: "前端" },
    { value: "后端", label: "后端" },
    { value: "前后端", label: "前后端" },
    { value: "工具", label: "工具" },
    { value: "游戏", label: "游戏" },
    { value: "其他", label: "其他" }
];

// 设计design的option
const designTypeOptions = [
    { value: "设计", label: "设计" }
];

// 工具tool的option
const toolTypeOptions = [
    { value: "算法", label: "算法" },
    { value: "工具", label: "工具" },
    { value: "颜色", label: "颜色" }
];

// 电影movie的option
const movieTypeOptions = [
    { value: "电影Vip观看", label: "电影Vip观看" },
    { value: "视频格式转换", label: "视频格式转换" }
];

// 电影movie的option
const otherTypeOptions = [
    { value: "其他", label: "其他" }
];

export {
    programTypeOptions,
    githubTypeOptions,
    designTypeOptions,
    toolTypeOptions,
    movieTypeOptions,
    otherTypeOptions
};
