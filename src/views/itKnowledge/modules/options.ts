/*
 * @Author: zemin zheng
 * @Date: 2021-09-04 17:39:18
 * @LastEditTime: 2022-01-22 15:28:27
 * @LastEditors: Please set LastEditors
 * @Description: IT知识 -- option类型下拉框选项
 * @FilePath: \vueAndTsAndKoa2\src\views\itKnowledge\modules\options.ts
 */

// 前端front-end的option
const frontEndTypeOptions = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "Javascript" },
    { value: "typeSrcipt", label: "TypeSrcipt" },
    { value: "h5", label: "H5" },
    { value: "vue", label: "Vue" },
    { value: "react", label: "React" },
    { value: "webpack", label: "Webpack" },
    { value: "ui", label: "Ui" },
    { value: "elementUi", label: "ElementUi" },
    { value: "svg", label: "Svg" },
    { value: "网络", label: "网络" },
    { value: "移动端", label: "移动端" },
    { value: "可视化", label: "可视化" },
    { value: "地图", label: "地图" },
    { value: "优化", label: "优化" },
    { value: "面试", label: "面试" },
    { value: "前端", label: "前端" }
];

// 后端rear-end的option
const rearEndTypeOptions = [
    { value: "java", label: "Java" },
    { value: "node", label: "Node" },
    { value: "mysql", label: "Mysql" },
    { value: "oracle", label: "Oracle" },
    { value: "nginx", label: "Nginx" },
    { value: "redis", label: "Redis" },
    { value: "python", label: "Python" },
    { value: "minio", label: "Minio" },
    { value: "docker", label: "Docker" },
    { value: "面试", label: "面试" },
    { value: "后端", label: "后端" }
];

// 算法algorithm的option
const algorithmTypeOptions = [
    { value: "算法", label: "算法" }
];

// 前后端frontRearEnd的option
const frontRearEndTypeOptions = [
    { value: "系统", label: "系统" },
    { value: "框架", label: "框架" },
    { value: "music", label: "Music" }
];

// 工具tool的option
const toolTypeOptions = [
    { value: "tool", label: "工具" },
    { value: "git", label: "Git" },
    { value: "杂七杂八", label: "杂七杂八" }
];

export {
    frontEndTypeOptions,
    rearEndTypeOptions,
    algorithmTypeOptions,
    frontRearEndTypeOptions,
    toolTypeOptions
};
