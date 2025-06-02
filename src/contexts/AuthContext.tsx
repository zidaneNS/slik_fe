import { baseUrl } from "@/lib/baseUrl";
import { LoginDto } from "@/lib/dto"
import { User } from "@/lib/type";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    user: User | null,
    login: (loginDto: LoginDto) => Promise<{ message?: string }>;
    logout: () => void;
}

const initContext: AuthContextType = {
    user: null,
    login: async () => { return {}},
    logout: () => {}
}

const authContext = createContext<AuthContextType>(initContext);

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (loginDto: LoginDto) => {
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(loginDto)
            });

            if (response.status === 200) {
                const data = await response.json();
                const { token } = data;
                setUser({
                    name: 'Test User',
                    token
                });
                return {}
            } else {
                const result = await response.json();
                return { message: result.error as string }
            }
        } catch (err) {
            console.log(err);
            return { message: 'Uncatch error' }
        }
    }

    const logout = () => {
        console.log('logout');
    }

    return <authContext.Provider value={{ user, login, logout }}>{children}</authContext.Provider>
}