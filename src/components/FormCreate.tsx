'use client';

import { Dispatch, SetStateAction, useActionState } from "react";
import { MdClose } from "react-icons/md";
import InputField from "./InputField";
import useKredit from "@/contexts/KreditContext";
import { CreateFormState } from "@/lib/type";
import { CreateFormSchema } from "@/lib/definition";
import useForm from "@/contexts/FormContext";
import ErrorInputField from "./ErrorInputField";

export default function FormCreate({ setIsCreate }: { setIsCreate: Dispatch<SetStateAction<boolean>> }) {
    const { kredits } = useKredit();
    const { createForm } = useForm();

    const createAction = async (state: CreateFormState, formData: FormData) => {
        const rawDate = formData.get('tanggal_pengajuan')?.toString();
        const kreditId = formData.get('kredit_id')?.toString();
    
        const validatedFields = CreateFormSchema.safeParse({
            nama: formData.get('nama')?.toString(),
            NIK: formData.get('NIK')?.toString(),
            alamat: formData.get('alamat')?.toString(),
            TTL: formData.get('TTL')?.toString(),
            tanggal_pengajuan: rawDate,
            kredit_id: kreditId ? parseInt(kreditId) : NaN 
        });
    
        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors };
        }
    
        const { message } = await createForm(validatedFields.data);

        if (message) {
            return { message }
        }

        setIsCreate(false);
    }
    

    const [state, action, pending] = useActionState(createAction, undefined);
    return (
        <div className="w-1/2 bg-white rounded-md px-4 py-6 shadow-xl flex flex-col gap-y-3">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-lg font-semibold">Create New Form</h1>
                <button onClick={() => setIsCreate(false)} className="flex items-center justify-center text-black/70 hover:text-black cursor-pointer duration-300">
                    <MdClose className="size-6" />
                </button>
            </div>
            <form action={action} className="w-full grid grid-cols-2 text-sm gap-2">
                <InputField type="text" name="nama" placeholder="Masukkan Nama" displayText="Nama :">
                    {state?.errors?.nama && (<ErrorInputField errMsg={state.errors.nama} />)}
                </InputField>
                <InputField type="text" name="NIK" placeholder="Masukkan NIK" displayText="NIK :">
                    {state?.errors?.NIK && (<ErrorInputField errMsg={state.errors.NIK} />)}
                </InputField>
                <InputField type="text" name="alamat" placeholder="Masukkan Alamat" displayText="Alamat :">
                    {state?.errors?.alamat && (<ErrorInputField errMsg={state.errors.alamat} />)}
                </InputField>
                <InputField type="text" name="TTL" placeholder="Masukkan Tempat Tanggal Lahir" displayText="Tempat Tanggal Lahir :">
                    {state?.errors?.TTL && (<ErrorInputField errMsg={state.errors.TTL} />)}
                </InputField>
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="tanggal_pengajuan" className="text-lg text-semibold">Tanggal Pengajuan :</label>
                    <input type="date" id="tanggal_pengajuan" name="tanggal_pengajuan" autoComplete="off" required className="px-4 py-2 border border-slate-400 rounded-md" />
                    {state?.errors?.tanggal_pengajuan && (<ErrorInputField errMsg={state.errors.tanggal_pengajuan} />)}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="kredit_id" className="text-lg font-semibold">Kredit :</label>
                    <select name="kredit_id" id="kredit_id" className="px-4 py-2 border border-slate-400 rounded-md">
                        <option value="">--Pilih Kredit--</option>
                        {kredits && kredits.map((kredit, idx) => (
                            <option key={idx} value={kredit.id}>{kredit.jenis_kredit} - {kredit.nama_ao}</option>
                        ))}
                    </select>
                    {state?.errors?.kredit_id && (<ErrorInputField errMsg={state.errors.kredit_id} />)}
                </div>
                {state?.message && (<ErrorInputField errMsg={state.message} />)}
                {pending ? (
                    <div className="w-full text-center">Loading...</div>
                ) : (
                    <button className="col-span-2 w-full py-2 rounded-md bg-purple-800 text-white cursor-pointer hover:bg-purple-400 duration-300">Submit</button>
                )}
            </form>
        </div>
    )
}