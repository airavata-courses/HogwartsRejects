export const logIn = (jwtToken) => {
    return{
        type:'SIGN_IN',
        payload:jwtToken,
    };

}
export const logOut = () => {
    return{
        type:'SIGN_OUT',
    };

}