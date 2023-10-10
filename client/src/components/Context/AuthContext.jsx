import { createContext, useEffect, useReducer } from "react";
import api from '../../helpers/AxiosConfig';

export const AuthContext = createContext();

const initalState = { user: null };

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    function login({ token, payload }) {
        localStorage.setItem("access-token", JSON.stringify(token))
        dispatch({
            type: "LOGIN",
            payload: payload
        })
    }

    function Logout() {
        localStorage.removeItem("access-token")
        dispatch({
            type: "LOGOUT"
        })
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("access-token"));
        async function checkUser() {
            if (token) {
                try {
                    const { data } = await api.post('/user/get-current-user', { token });
                    if (data?.success) {
                        dispatch({
                            type: "LOGIN",
                            payload: data?.user
                        })
                    }
                } catch (error) {
                    console.log(error, "error here")
                }
            }
        }
        checkUser();
    }, [])

    return (
        <AuthContext.Provider value={{ state, login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}