export const HOST = import.meta.env.VITE_SERVER

export const AUTHROUTES = "api/auth";

export const SIGNUPROUTE = `${AUTHROUTES}/signup`;

export const LOGINROUTE = `${AUTHROUTES}/login`;

export const GETUSER = `${AUTHROUTES}/userinfo`;

export const UPDATEPROFILEROUTE = `${AUTHROUTES}/update-profile`;

export const ADDPROFILEIMAGEROUTE = `${AUTHROUTES}/add-profile-image`;

export const DELETEPROFILEIMAGEROUTE = `${AUTHROUTES}/delete-profile-image`;

export const LOGOUTROUTE = `${AUTHROUTES}/logout`;



export const CONTACTSROUTES ="api/contacts";

export const SEARCHCONTACTSROUTES = `${CONTACTSROUTES}/search`;