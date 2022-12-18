import request from "@/utils/request";
import { ISysRoleData } from "@/api/types";

export const defaultSysRoleData: ISysRoleData = {
  id: "",
  roleName: "",
  roleKey: "",
  roleType: "",
  isSys: 0,
  remarks: "",
  routes: []
};

export const getSysRole = (params: any) =>
  request({
    url: "/role/getRole",
    method: "get",
    params
  });

export const getArticle = (id: number, params: any) =>
  request({
    url: `/SysRole/${id}`,
    method: "get",
    params
  });

export const createSysRole = (data: any) =>
  request({
    url: "/role/save",
    method: "post",
    data
  });

  export const delSysRole = (data: any) =>
  request({
    url: "/role/del",
    method: "post",
    data
  });

export const updateSysRole = (data: any) =>
  request({
    url: "/role/edit",
    method: "put",
    data
  });

export const deleteArticle = (id: number) =>
  request({
    url: `/SysRole/${id}`,
    method: "delete"
  });

export const getPageviews = (params: any) =>
  request({
    url: "/pageviews",
    method: "get",
    params
  });
