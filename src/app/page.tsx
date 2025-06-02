'use client';

import InputField from "@/components/InputField";
import useAuth from "@/contexts/AuthContext";
import { LoginFormSchema } from "@/lib/definition";
import { LoginFormState } from "@/lib/type";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export default function Page() {
  const { login } = useAuth();

  const loginAction = async (state: LoginFormState, formData: FormData) => {
      const validatedFields = LoginFormSchema.safeParse({
          name: formData.get('name'),
          password: formData.get('password')
      });

      if (!validatedFields.success) {
          return { errors: validatedFields.error.flatten().fieldErrors }
      }

      const { message } = await login(validatedFields.data);

      if (message) {
        return { message };
      }

      return redirect('/form');
  }

  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <main className="flex h-screen w-full justify-center items-center bg-sky-100">
      <div className="flex flex-col gap-y-4 rounded-md py-4 px-6 bg-white shadow-xl md:w-1/3">
        <div className="w-full flex flex-col items-center gap-y-2">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-sm text-slate-400">Input Valid Credentials</p>
        </div>
        <form action={action} className="flex flex-col gap-y-3 w-full">
          <InputField
            name="name"
            type="text"
            placeholder="Enter Your Name"
            displayText="Name :"
          />
          <InputField
            name="password"
            type="password"
            placeholder="Enter Your Password"
            displayText="Password :"
          />
          { state?.message && (<div className="text-red-500 text-sm py-2 px-4 rounded-md bg-red-400/10">{state.message}</div>)}
          {pending ? (
            <div className="w-full text-center">Loading...</div>
          ) : (
            <button type="submit" className="py-2 w-full text-center text-white rounded-md bg-slate-800 cursor-pointer hover:bg-slate-600 duration-300">Sign In</button>
          )}
        </form>
      </div>
    </main>
  )
}