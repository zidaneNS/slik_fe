import { Form } from "@/lib/type"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import useAuth from "./AuthContext";
import { baseUrl } from "@/lib/baseUrl";
import { CreateFormDto } from "@/lib/dto";

type FormContextType = {
    forms: Form[] | null,
    createForm: (createFormDto: CreateFormDto) => Promise<{ message?: string }>;
    deleteForm: (id: string | number) => Promise<{ message?: string }>
}

const initContext: FormContextType = {
    forms: [],
    createForm: async () => {return {}},
    deleteForm: async () => {return {}},
}

const formContext = createContext<FormContextType>(initContext);

export default function useForm() {
    return useContext(formContext);
}

export function FormProvider({ children }: { children: React.ReactNode }) {
    const [forms, setForms] = useState<Form[] | null>(null);
    const { user } = useAuth();

    const getForms = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/forms`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.token}`,
                    "Accept": "application/json"
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('form', data);
                setForms(data);
            }
        } catch(err) {
            console.log(err);
        }
    }, [user]);
    
    useEffect(() => {
        if (user) {
            getForms();
        }
    }, [user, getForms]);

    const createForm = async (createFormDto: CreateFormDto) => {
        if (user) {
            try {
                const response = await fetch(`${baseUrl}/forms`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    },
                    body: JSON.stringify(createFormDto)
                });

                if (response.status === 201) {
                    getForms();

                    return {}
                } else {
                    const result = await response.json();
                    return { message: result.error }
                }
            } catch(err) {
                console.log(err);
                return { message: 'error' }
            }
        } else {
            return { message: 'user not defined' }
        }
    }

    const deleteForm = async (id: string | number) => {
        if (user) {
            try {
                const response = await fetch(`${baseUrl}/forms/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    }
                });

                if (response.status === 204) {
                    getForms();

                    return {}
                } else {
                    const result = await response.json();
                    return { message: result.error }
                }
            } catch(err) {
                console.log(err);
                return { message: 'error' }
            }
        } else {
            return { message: 'user not defined' }
        }
    }

    return <formContext.Provider value={{ forms, createForm, deleteForm }}>{children}</formContext.Provider>
}