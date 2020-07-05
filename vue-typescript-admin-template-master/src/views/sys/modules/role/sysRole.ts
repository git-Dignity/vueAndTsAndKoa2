import { RouteConfig } from 'vue-router'
import path from 'path'
import { IDialogData } from 'component/Dialog/types/index'


// Reshape the routes structure so that it looks the same as the sidebar
const reshapeRoutes = (routes: RouteConfig[], basePath = '/') => {
  const reshapedRoutes: RouteConfig[] = []
  for (let route of routes) {
    // Skip hidden routes
    if (route.meta && route.meta.hidden) {
      continue
    }
    const onlyOneShowChild = onlyOneShowingChild(route.children, route)
    if (route.children && onlyOneShowChild && (!route.meta || !route.meta.alwaysShow)) {
      route = onlyOneShowChild
    }

    const data: RouteConfig = {
      path: path.resolve(basePath, route.path),
      meta: {
        title: route.meta && route.meta.title
      }
    }
    // Recursive generate child routes
    if (route.children) {
      data.children = reshapeRoutes(route.children, data.path)
    }
    reshapedRoutes.push(data)
  }

  return reshapedRoutes
}


// Reference: src/layout/components/Sidebar/SidebarItem.vue
const onlyOneShowingChild = (children: RouteConfig[] = [], parent: RouteConfig) => {
  let onlyOneChild = null
  const showingChildren = children.filter(item => !item.meta || !item.meta.hidden)
  // When there is only one child route, the child route is displayed by default
  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0]
    onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
    return onlyOneChild
  }
  // Show parent if there are no child route to display
  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '' }
    return onlyOneChild
  }
  return false
}


const flattenRoutes = (routes: RouteConfig[]) => {
  let data: RouteConfig[] = []
  routes.forEach(route => {
    data.push(route)
    if (route.children) {
      const temp = flattenRoutes(route.children)
      if (temp.length > 0) {
        data = [...data, ...temp]
      }
    }
  })
  return data
}


const generateTree = (routes: RouteConfig[], basePath = '/', checkedKeys: string[]) => {
  const res: RouteConfig[] = []
  for (const route of routes) {
    const routePath = path.resolve(basePath, route.path)
    // recursive child routes
    if (route.children) {
      route.children = generateTree(route.children, routePath, checkedKeys)
    }
    if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
      res.push(route)
    }
  }
  return res
}


class SysRole {
  childrenDialogData: IDialogData;
  tHeader: Array<string>;
  constructor(childrenDialogData: IDialogData) {
    this.childrenDialogData = childrenDialogData;
    this.tHeader = ['id','角色名称', 'roleKey', '角色类型', '是否系统数据(0:否；1:是)', '备注', '删除标志', '菜单'];
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
  reshapeRoutes,
  flattenRoutes,
  generateTree,
  SysRole
}