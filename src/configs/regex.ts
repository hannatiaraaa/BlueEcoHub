export const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const phoneValidation = /^[+](62)\d{9,14}$/;
export const phoneReplace = /^0+/;
export const usernameValidation = /^[a-z0-9_.]{3,20}$/;
export const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
