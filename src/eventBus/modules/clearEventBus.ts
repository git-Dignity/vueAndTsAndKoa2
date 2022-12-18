import { EventBus } from "@/eventBus/index";
const objectTmp: any = {};

export const clearEventBus = (data: string) => {
    EventBus.$off(data, objectTmp); // 用完之后便销毁
};
