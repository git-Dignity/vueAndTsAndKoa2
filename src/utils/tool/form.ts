
/**
 * 循环对象，将name作为键，value作为值
 * @param form = info: {
        "roleName": {
            label: 'sys.roleName',
            name: "roleName",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "角色名不能为空"
            }
        },
        "enName": {
            label: 'sys.enName',
            name: "enName",
            value: "",
            disabled: false,
            hidden: false,
            rule: {
                required: true, message: "英文名不能为空"
            }
        }
        ...
  * result = {
      roleName: value,
      enName: value
      ... : ...
  }
  * 应用场景：from表单上传，获取参数的值
  * 应用地方： sys-role.vue
 */
export function getFormValue(form: any) {
    const tmpArr: any = {};
    for (const element in form) {
        tmpArr[form[element].name] = form[element].value;
    }

    return tmpArr;
}

/**
 * 循环验证form表单是否满足rule的规则
 * @param form : 多个el-form的ref的值
 * result = ["true", "false"]   => 只要有一个false则表单不提交
 * 应用场景：from表单上传，验证rule规则
 * 应用地方： sys-role.vue
 */
export const validateForm = (form: Array<any>) => {
    const tmp: Array<any> = [];

    form.forEach(element => {
        element.validate((valid: boolean) => {
          if (valid) {
            tmp.push("true");
          } else {
            tmp.push("false");
            console.log("error submit!!");
            return false;
          }
        });
      });

      return tmp;
};
