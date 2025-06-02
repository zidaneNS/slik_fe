'use client';

import useAuth from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { FaWpforms } from "react-icons/fa";
import { GoDatabase } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";

export default function Navbar() {
    const { user } = useAuth();
    const pathname = usePathname();

    type NavLink = {
        path: string,
        name: string,
        icon: IconType
    }

    const navLinks: NavLink[] = [
        {
            path: '/form',
            name: 'Form Management',
            icon: FaWpforms
        },
        {
            path: '/slik',
            name: 'SLIK Management',
            icon: GoDatabase
        }
    ]

    if (user) {
        return (
            <nav className="w-full fixed top-0 px-8 bg-white grid grid-rows-2 divide-y-2 divide-slate-200">
                <div className="py-4 flex w-full justify-between items-center">
                    <h1 className="text-xl font-semibold">Register SLIK Bank Jatim</h1>
                    <div className="flex gap-x-4 items-center">
                        <p className="text-slate-400">Welcome, {user.name}</p>
                        <button className="flex items-center gap-x-2 px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-slate-600 hover:text-white hover:border-none duration-300">
                            <LuLogOut className="w-4" />
                            <p>Logout</p>
                        </button>
                    </div>
                </div>
                <div className="flex w-full justify-between items-center border-b border-slate-200">
                    <div className="w-full flex gap-x-4 items-center">
                        {navLinks.map((link, idx) => (
                            <Link href={link.path} className={`py-4 flex gap-x-2 items-center ${pathname === link.path ? "text-blue-700 border-b border-blue-700" : "text-black border-none"} cursor-pointer hover:text-blue-700 hover:border-b hover:border-blue-700 duration-300`} key={idx}>
                                <link.icon className="w-4" />
                                <p>{link.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        )
    }

    return
}