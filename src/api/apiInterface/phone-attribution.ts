import request from "@/utils/request";

/**
 * 手机号码归属地
 * @param params
 * {
      key,
      phone
   }
 */
export const mobile = (params: any) =>
  request({
    url: "/apiInterface/mobile",
    method: "get",
    params
  });
