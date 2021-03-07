import { IDialogData } from '@/components/Dialog/types/index'




class AgentEvent {
  childrenDialogData: IDialogData;
  tHeader: Array<string>;
  constructor(childrenDialogData: IDialogData) {
    this.childrenDialogData = childrenDialogData;
    this.tHeader = ['开始时间','id', '通知方式', '结束时间', '标题', '类型；postpone：延后）', '内容', '备注'];
  }
  /**
   * 
   * @param title 对话框标题
   * @param isShowSubmit 是否显示提交取消按钮
   * @param isCloseModal 是否可点击对话框之外的空间，关闭对话框
   * @param show 是否显示对话框（默认是打开）
   */
  showDialog(title: string,isShowSubmit: boolean, isCloseModal: boolean, show: boolean = true ) {
    this.childrenDialogData.title = title;
    this.childrenDialogData.isShowSubmit = isShowSubmit;
    this.childrenDialogData.isCloseModal = isCloseModal;

    this.childrenDialogData.show = show;
  }
 
}




export {
  AgentEvent
}