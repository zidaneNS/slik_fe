import { baseUrl } from "@/lib/baseUrl"
import { Kredit } from "@/lib/type"
import { createContext, useContext, useEffect, useState } from "react"
import useAuth from "./AuthContext"

type KreditContextType = {
    kredits: Kredit[] | null
}

const initContext: KreditContextType = {
    kredits: null
}

const kreditContext = createContext<KreditContextType>(initContext);

export default function useKredit() {
    return useContext(kreditContext);
}

export function KreditProvider({ children }: { children: React.ReactNode }) {
    const [kredits, setKredits] = useState<Kredit[] | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const getKredit = async () => {
            try {
                const response = await fetch(`${baseUrl}/kredits`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user?.token}`,
                        "Accept": "application/json"
                    }
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setKredits(data);
                } else {
                    console.log('cupu');
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (user) {
            getKredit();
        }
    }, [user]);

    return <kreditContext.Provider value={{ kredits }}>{children}</kreditContext.Provider>
}