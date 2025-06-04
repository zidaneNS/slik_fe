'use client';

import DeleteSlik from "@/components/DeleteSlik";
import Modal from "@/components/Modal";
import SlikCreate from "@/components/SlikCreate";
import useAuth from "@/contexts/AuthContext";
import useForm from "@/contexts/FormContext";
import useKredit from "@/contexts/KreditContext";
import useSlik from "@/contexts/SlikContext";
import { Slik } from "@/lib/type";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Page() {
    const { user } = useAuth();
    
    if (!user) {
        redirect('/');
    }
    
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [selectedSlik, setSelectedSlik] = useState<Slik | null>(null);
    
    const { forms } = useForm();
    const { sliks } = useSlik();
    const { kredits } = useKredit();
    
    const handleDelete = (slik: Slik) => {
        setSelectedSlik(slik);
        setIsDeleting(true);
    }

    const filteredSliks: Slik[] = sliks!.map(slik => {
        const selectedForm = forms!.filter(form => form.id === slik.form.id)[0];

        return {
            id: slik.id,
            form: {
                id: selectedForm.id,
                tanggal_pengajuan: selectedForm.tanggal_pengajuan,
                kredit_id: selectedForm.kredit_id,
                ktp: {
                    id: selectedForm.ktp.id,
                    nama: `${selectedForm.ktp.nama} ${slik.category.category_name === 'nama' ? "(nama)" : ""}`,
                    alamat: selectedForm.ktp.alamat,
                    NIK: selectedForm.ktp.NIK,
                    TTL: selectedForm.ktp.TTL
                }
            },
            category: slik.category,
            number: slik.number
        }
    });


    return (
        <main className="flex flex-col min-h-screen gap-y-4 bg-slate-100 px-8 pt-52">
            {isCreate && (
                <Modal>
                    <SlikCreate setIsCreate={setIsCreate} />
                </Modal>
            )}
            {isDeleting && (
                <Modal>
                    <DeleteSlik
                        slik={selectedSlik!}
                        setIsDeleting={setIsDeleting}
                    />
                </Modal>
            )}
            <section className="flex w-full justify-between items-center">
                <h1 className="text-4xl font-semibold">SLIK Management</h1>
                <button onClick={() => setIsCreate(true)} className="py-2 px-4 text-white rounded-md flex gap-x-3 items-center bg-slate-800 cursor-pointer hover:bg-slate-600 duration-300">
                    <IoIosAdd className="w-6" />
                    <p>Add SLIK</p>
                </button>
            </section>
            <section className="flex flex-col px-4 py-6 gap-y-4 rounded-md bg-white shadow-xl w-full">
                <h2 className="text-2xl font-semibold">SLIK List</h2>
                <div className="grid grid-cols-8 w-full">
                    <div className="col-span-9 grid grid-cols-9 bg-red-200 shadow-xl px-2 py-3 rounded-md">
                        <div className="w-full text-center">No</div>
                        <div className="w-full text-center">Tanggal Pengajuan</div>
                        <div className="w-full text-center">Nama</div>
                        <div className="w-full text-center">Alamat</div>
                        <div className="w-full text-center">NIK/ NPWP</div>
                        <div className="w-full text-center">TTL</div>
                        <div className="w-full text-center">Jenis Kredit</div>
                        <div className="w-full text-center">Kredit AO</div>
                        <div className="w-full text-center">Actions</div>
                    </div>
                    {filteredSliks && filteredSliks.map((slik, idx) => (
                        <div key={idx} className="col-span-9 grid grid-cols-9 px-2 py-3">
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{slik.number}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{slik.form.tanggal_pengajuan.toString()}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{slik.form.ktp.nama}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{slik.form.ktp.alamat}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{slik.form.ktp.NIK}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{slik.form.ktp.TTL}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{kredits?.filter(kredit => kredit.id === slik.form.kredit_id)[0]?.jenis_kredit.toString()}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{kredits?.filter(kredit => kredit.id === slik.form.kredit_id)[0]?.nama_ao.toString()}</div>
                            <div className="flex gap-x-2 w-full items-center justify-center">
                                <button onClick={() => handleDelete(slik)} className="flex justify-center items-center cursor-pointer text-red-500 hover:text-red-300 duration-300">
                                    <RiDeleteBin6Line className="size-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}