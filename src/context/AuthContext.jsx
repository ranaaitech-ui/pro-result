import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock Auth state observer
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Real Firebase auth logic:
        // return signInWithEmailAndPassword(auth, email, password);

        // Mock Login
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const user = { uid: '123', email, displayName: 'Teacher Admin' };
                    localStorage.setItem('mockUser', JSON.stringify(user));
                    setCurrentUser(user);
                    resolve(user);
                } else {
                    reject(new Error("Invalid Credentials"));
                }
            }, 800);
        });
    };

    const logout = () => {
        // return signOut(auth);
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.removeItem('mockUser');
                setCurrentUser(null);
                resolve();
            }, 500);
        });
    };

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
