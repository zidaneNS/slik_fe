import React, { HTMLInputTypeAttribute } from "react"

export default function InputField({
    name,
    type,
    placeholder,
    displayText,
    children
}: {
    name: string,
    type: HTMLInputTypeAttribute,
    placeholder: string,
    displayText: string,
    children?: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor={name} className="text-lg text-semibold">{displayText}</label>
            <input type={type} id={name} name={name} autoComplete="off" required placeholder={placeholder} className="px-4 py-2 border border-slate-400 rounded-md" />
            {children}
        </div>
    )
}