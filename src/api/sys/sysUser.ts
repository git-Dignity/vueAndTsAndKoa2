import request from "@/utils/request";
import { ISysUserData } from "@/api/sys/types";

export const defaultSysUserData: ISysUserData = {
    id: "",
    userName: "",
    photo: "",
    phone: "",
    roles: "",
    token: ""
};

export const getSysUser = (params: any) =>
  request({
    url: "/user",
    method: "get",
    params
  });

export const createSysUser = (data: any) =>
  request({
    url: "/user/",
    method: "post",
    data
  });

  export const delSysRole = (data: any) =>
  request({
    url: "/role/del",
    method: "post",
    data
  });

export const updateSysUser = (data: any) =>
  request({
    url: "/user/ID",
    method: "put",
    data
  });
