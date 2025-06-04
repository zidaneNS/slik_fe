import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
    return (
        <div className="inset-0 fixed top-0 left-0 h-screen bg-black/80 flex justify-center items-center backdrop-blur-xl">
            {children}
        </div>
    )
}