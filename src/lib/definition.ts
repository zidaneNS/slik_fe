import { z } from "zod";

export const LoginFormSchema = z.object({
    name: z.string().min(1, 'name field required'),
    password: z.string().min(1, 'password field required')
});

export const CreateFormSchema = z.object({
    nama: z.string().min(1, 'nama field required'),
    NIK: z.string().min(1, 'NIK / NPWP field required').max(16, 'NIK / NPWP cannot more than 16 char'),
    alamat: z.string().min(1, 'alamat field required'),
    TTL: z.string().min(1, 'TTL field required'),
    tanggal_pengajuan: z.string().date(),
    kredit_id: z.number().min(1, 'kredit field required')
});

export const CreateSlikSchema =  z.object({
    form_id: z.string().min(1, 'form required'),
    category_id: z.string().min(1, 'category required'),
    number: z.string().min(1, 'number field required')
})