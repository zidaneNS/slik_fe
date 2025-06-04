'use client';

import useForm from "@/contexts/FormContext";
import useSlik from "@/contexts/SlikContext";
import { CreateSlikSchema } from "@/lib/definition";
import { CategoryType, CreateSlikState } from "@/lib/type";
import { Dispatch, SetStateAction, useActionState } from "react";
import { MdClose } from "react-icons/md";
import ErrorInputField from "./ErrorInputField";
import InputField from "./InputField";

export default function SlikCreate({ setIsCreate }: { setIsCreate: Dispatch<SetStateAction<boolean>> }) {
    const { forms } = useForm();
    const { createSlik } = useSlik();

    const categories: CategoryType[] = [
        {
            id: 1,
            category_name: 'nik'
        },
        {
            id: 2,
            category_name: 'nama'
        }
    ];

    const createAction = async (state: CreateSlikState, formData: FormData) => {
        const validatedFields = CreateSlikSchema.safeParse({
            form_id: formData.get('form_id'),
            category_id: formData.get('category_id'),
            number: formData.get('number')
        });

        console.log(validatedFields.data);

        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors }
        }

        const { form_id, category_id, number } = validatedFields.data;

        const { message } = await createSlik({ form_id, category_id, number });

        if (message) {
            return { message }
        }

        setIsCreate(false);
    }

    const [state, action, pending] = useActionState(createAction, undefined);

    return (
        <div className="w-1/3 bg-white rounded-md px-4 py-6 shadow-xl flex flex-col gap-y-3">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-lg font-semibold">Create New SLIK</h1>
                <button onClick={() => setIsCreate(false)} className="flex items-center justify-center text-black/70 hover:text-black cursor-pointer duration-300">
                    <MdClose className="size-6" />
                </button>
            </div>
            <form action={action} className="w-full flex flex-col text-sm gap-y-2">
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="form_id" className="text-lg font-semibold">Form :</label>
                    <select name="form_id" id="form_id" className="px-4 py-2 border border-slate-400 rounded-md">
                        <option value="">--Pilih Form--</option>
                        {forms && forms.map((form, idx) => (
                            <option key={idx} value={form.id}>{form.ktp.NIK}</option>
                        ))}
                    </select>
                    {state?.errors?.form_id && (<ErrorInputField errMsg={state.errors.form_id} />)}
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="category_id" className="text-lg font-semibold">Kategori :</label>
                    <select name="category_id" id="category_id" className="px-4 py-2 border border-slate-400 rounded-md">
                        <option value="">--Pilih Kategori--</option>
                        {categories && categories.map((category, idx) => (
                            <option key={idx} value={category.id}>{category.category_name}</option>
                        ))}
                    </select>
                    {state?.errors?.category_id && (<ErrorInputField errMsg={state.errors.category_id} />)}
                </div>
                <InputField type="number" name="number" placeholder="Enter number" displayText="Number :">
                        {state?.errors?.number && (<ErrorInputField errMsg={state.errors.number} />)}
                </InputField>
                    {state?.message && (<ErrorInputField errMsg={state.message} />)}
                {pending ? (
                    <div className="w-full text-center">Loading...</div>
                ): (
                    <button type="submit" className="w-full py-2 rounded-md shadow-xl text-white bg-purple-800 cursor-pointer hover:bg-purple-600 duration-300">Submit</button>
                )}
            </form>
        </div>
    )
}