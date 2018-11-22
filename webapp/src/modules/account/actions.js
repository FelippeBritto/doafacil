import {userService} from '../user/service';
import * as types from './types'
import router from '../../router'

export const login = ({dispatch, commit}, {email, password}) => {
    commit(types.LOGINREQUEST, {email});

    return userService.login(email, password)
        .then(response => {
            if(response.data && response.data.data) {
                const data = response.data.data;
            console.log(response.data.data);
                if(data) {
                    if (data.token) {
                        localStorage.setItem('user', JSON.stringify(data.token));
                    }
                    commit(types.LOGINSUCCESS, data);
                    dispatch('alert/success', 'Login realizado com sucesso!', {
                        root: true
                    });

                    router.push({ name: 'home' })
                }
            }
        })
        .catch((error) => {
            if(error.response && error.response.data) {
                commit(types.LOGINFAILURE, error.response.data.error);
                dispatch('alert/error', error.response.data.error, {
                    root: true
                });
            }
        })
}
export const logout = ({commit}) => {
    userService.logout();
    commit(types.LOGOUT);
}
export const register = ({dispatch, commit}, user) => {
    commit(types.REGISTERREQUEST, user);

    userService.register(user)
        .then(
            user => {
                commit(types.REGISTERSUCCESS, user);
                router.push('/login')
                setTimeout(() => {
                    dispatch('alert/success', 'Registration successful', {root: true});
                })
            },
            error => {
                commit(types.REGISTERFAILURE, error);
                dispatch('alert/error', error, {root: true});
            }
        );
}
