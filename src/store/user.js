const user = {
    state:{
        loggedUser: ''
    },
    mutations:{
        setLoggedUser(state, newUser) {
            state.loggedUser = newUser;
        }
    }
};
export default user