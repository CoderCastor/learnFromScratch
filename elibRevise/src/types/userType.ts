export interface userFullName {
    firstName : string;
    lastName : string;
}

export interface User {
    _id : number;
    userFullName: userFullName;
    profileImgURL : string;
    username : string;
    email : string;
    password : string;


}

export interface RegisterUserRequestType {
    body : User
}