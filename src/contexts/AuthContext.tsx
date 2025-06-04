import { baseUrl } from "@/lib/baseUrl";
import { LoginDto } from "@/lib/dto"
import { User } from "@/lib/type";
import { redirect } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    user: User | null,
    login: (loginDto: LoginDto) => Promise<{ message?: string }>;
    logout: () => Promise<void>;
}

const initContext: AuthContextType = {
    user: null,
    login: async () => { return {}},
    logout: async () => {}
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

    const logout = async () => {
        try {
            const response = await  fetch(`${baseUrl}/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user!.token}`
                }
            });

            if (response.status === 204) {
                setUser(null);
                redirect('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <authContext.Provider value={{ user, login, logout }}>{children}</authContext.Provider>
}