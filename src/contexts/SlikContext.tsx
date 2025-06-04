import { Slik } from "@/lib/type"
import React, { createContext, useContext, useEffect, useState } from "react"
import useAuth from "./AuthContext"
import { baseUrl } from "@/lib/baseUrl"
import { CreateSlikDto } from "@/lib/dto"

type SlikContextType = {
    sliks: Slik[] | null,
    createSlik: (createSlikDto: CreateSlikDto) => Promise<{ message?: string }>,
    deleteSlik: (id: string | number) => Promise<{ message?: string }>
}

const initContext: SlikContextType = {
    sliks: [],
    createSlik: async () => { return {}},
    deleteSlik: async () => { return  {}}
}

const slikContext = createContext<SlikContextType>(initContext);

export default function useSlik() {
    return useContext(slikContext);
}

export function SlikProvider({ children }: { children: React.ReactNode }) {
    const [sliks, setSliks] = useState<Slik[] | null>(null);
    const { user } = useAuth();

    const getSliks = async () => {
        try {
            const response = await fetch(`${baseUrl}/sliks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user?.token}`
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);

                setSliks(data);
            } else {
                const result = await response.json();
                console.log(result.error);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user) {
            getSliks()
        }
    }, [user, getSliks]);

    const createSlik = async (createSlikDto: CreateSlikDto) => {
        if (user) {
            try {
                const response = await fetch(`${baseUrl}/sliks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    },
                    body: JSON.stringify(createSlikDto)
                });

                if (response.status === 201) {
                    getSliks();

                    return {};
                } else {
                    const result =  await response.json();
                    return { message: result.error }
                }
            } catch (err) {
                console.log(err);
                return { message: 'uncatch error' }
            }
        } else {
            return { message: 'user not login' }
        }
    }

    const deleteSlik = async (id: string | number) => {
        if (user) {
            try {
                const response = await fetch(`${baseUrl}/sliks/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    }
                });

                if (response.status === 204) {
                    getSliks();

                    return {}
                } else {
                    const result = await response.json();
                    return { message: result.error }
                }
            } catch (err) {
                console.log(err);
                return { message: 'uncatch error' }
            }
        } else {
            return { message: 'user not login' }
        }
    }

    return <slikContext.Provider value={{ sliks, createSlik, deleteSlik }}>{children}</slikContext.Provider>
}