const auth = {
    isAuthenticated : false,
    message:'',
    
    getSession(key){
        return JSON.parse(sessionStorage.getItem(key));
    },
    setSession(key,value){
        sessionStorage.setItem(key, value);
    }
    
}
export default auth;