import { useMemo, createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);

    const login = (userName, password) => {
        setUser({userName: userName, password: password});
    }

    const logout = () => {
        setUser(null);
    }

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={{value}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
