export type User = {
    token: string,
    name: string
}

export type LoginFormState = | {
    errors?: {
        name?: string[],
        password?: string[]
    },
    message?: string
} | undefined

export type CreateFormState = | {
    errors?: {
        nama?: string[],
        NIK?: string[],
        alamat?: string[],
        TTL?: string[],
        tanggal_pengajuan?: string[],
        kredit_id?: string[]
    },
    message?: string
} | undefined

export type Kredit = {
    id: string | number,
    nama_ao: string,
    jenis_kredit: string
}

export type Form = {
    id: string | number,
    ktp: Ktp
    kredit_id: string,
    tanggal_pengajuan: Date
}

export type Ktp = {
    id: string | number,
    nama: string,
    NIK: string,
    alamat: string,
    TTL: string,
}