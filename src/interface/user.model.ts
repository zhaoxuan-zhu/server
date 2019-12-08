export interface Register {name: string,phone: string,password: string}
export interface PasswordLogin {name: string,password: string}
export interface MenuList {id:string}
export interface ChangeUserPruview {operatorId:string,changeUserId:string,pruview:string}
export interface AddAdmin {name:string,password:string,phone:string,securityCode:string}