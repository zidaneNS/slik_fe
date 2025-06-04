'use client';

import useForm from "@/contexts/FormContext";
import { CreateFormState, Form } from "@/lib/type";
import { Dispatch, SetStateAction, useActionState } from "react";
import { CiWarning } from "react-icons/ci";
import ErrorInputField from "./ErrorInputField";

export default function DeleteModal({
    form,
    setIsDeleting
}: {
    form: Form,
    setIsDeleting: Dispatch<SetStateAction<boolean>>
}) {
    const { deleteForm } = useForm();
    const deleteAction = async (state: CreateFormState) => {
        const { message } = await deleteForm(form.id);

        if (message) {
            return { message };
        }

        setIsDeleting(false);
    }

    const [state, action, pending] = useActionState(deleteAction, undefined);
    return (
        <div className="w-fit bg-white rounded-md py-4 px-6 items-center flex flex-col gap-y-4">
            <div className="p-2 bg-red-100/50 rounded-full flex justify-center items-center">
                <CiWarning className="size-8 text-red-500" />
            </div>
            <h1 className="text-xl font-semibold">Are you sure delete this form ?</h1>
            <div className="w-full flex flex-col gap-y-2 text-slate-700 text-sm">
                <p className="w-full">Nama : {form.ktp.nama}</p>
                <p className="w-full">NIK : {form.ktp.NIK}</p>
                <p className="w-full">Tanggal Pengajuan : {form.tanggal_pengajuan.toString()}</p>
            </div>
            <form action={action} className="w-full">
                {pending ? (
                    <div className="w-full text-center">Loading...</div>
                ) : (
                    <button className="w-full py-2 rounded-md text-center text-white bg-red-500 cursor-pointer hover:bg-red-300 duration-300">Delete</button>
                )}
            </form>
            {state?.message && (<ErrorInputField errMsg={state.message} />)}
            <button onClick={() => setIsDeleting(false)} className="w-full py-2 rounded-md text-center text-slate-700 bg-none border border-slate-700 cursor-pointer hover:bg-slate-700 hover:text-white duration-300">Cancel</button>
        </div>
    )
}