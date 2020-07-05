/**
 * session 缓存user信息
 */

const userSession: string = sessionStorage.getItem("user") || "";


export const getUserSessionName = () => {
    if (userSession !== "") {
        return JSON.parse(userSession).name;
    }
    return "";
}

export const setUserSessionName = (name: string) => {
    sessionStorage.setItem("user", JSON.stringify({
        name: name
    }))
}








// class UserSessionTmp {
//     name: string;
//     userSession: string;


//     constructor(name: string) {
//         this.name = name;
//         this.userSession = sessionStorage.getItem("user") || "";
//     }

//     getUserSessionName() {
//         if (this.userSession !== "") {
//             return JSON.parse(this.userSession).name;
//         }
//         return "";
//     }

//     setUserSessionName(): void {
//         sessionStorage.setItem("user", JSON.stringify({
//             name: this.name
//         }))
//     }

// }


// //工厂
// class UserSession {
//     create(name: string) {
//         return new UserSessionTmp(name)
//     }
// }



// export const userSessionClass = new UserSession()

// 使用userSessionClass.create("zheng").getUserSessionName()，报错说不是一个函数，所以就没有用class



