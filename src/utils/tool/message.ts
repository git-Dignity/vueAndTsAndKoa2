import { Message, MessageBox } from "element-ui";
import { sys_name } from "@/const/index";

// Message
export function MessageError(text = "错误") {
    Message({
        message: text,
        type: "error",
        duration: 3 * 1000
    });
}
export function MessageInfo(text = "取消") {
    Message({
        message: text,
        type: "info",
        duration: 3 * 1000
    });
}
export function MessageSuccess(text = "成功") {
    Message({
        message: text,
        type: "success",
        duration: 3 * 1000
    });
}

export function MessageWarning(text = "警告", offset = 300) {
    Message({
        message: text,
        type: "warning",
        offset: offset,
        duration: 3 * 1000
    });
}

// MessageBox
export function MesssageBoxQuestion(text = "Box询问") {
    return MessageBox.confirm(text, sys_name + "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });
  }

  export function MessageBoxSuccess(text = "Box成功") {
    return MessageBox.confirm(text, sys_name + "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "success"
    });
  }

  export function MessageBoxInfo(text = "Box取消") {
    return MessageBox.confirm(text, sys_name + "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "info"
    });
  }

  export function MessageBoxError(text = "Box错误") {
    return MessageBox.confirm(text, sys_name + "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "error"
    });
  }
