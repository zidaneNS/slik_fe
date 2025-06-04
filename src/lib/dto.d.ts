export type LoginDto = {
    name: string,
    password: string
}

export type CreateFormDto = {
    nama: string,
    NIK: string,
    alamat: string,
    TTL: string,
    tanggal_pengajuan: string,
    kredit_id: string | number
}

export type CreateSlikDto = {
    form_id: string | number,
    category_id: string | number
}