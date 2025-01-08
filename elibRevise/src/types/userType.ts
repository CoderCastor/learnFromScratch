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

export interface googleUsers {
    _id : number;
    userFullName: userFullName;
    profileImgURL : string;
    email : string;
}

export interface RegisterUserRequestType {
    body : User
}

//Google token
export interface decodedToken {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    nbf: number;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
  }