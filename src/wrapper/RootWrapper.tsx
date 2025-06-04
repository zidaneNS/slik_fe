'use client';

import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { FormProvider } from "@/contexts/FormContext";
import { KreditProvider } from "@/contexts/KreditContext";
import { SlikProvider } from "@/contexts/SlikContext";
import React from "react";

export default function RootWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Navbar />
            <KreditProvider>
                <FormProvider>
                    <SlikProvider>
                        {children}
                    </SlikProvider>
                </FormProvider>
            </KreditProvider>
        </AuthProvider>
    )
}