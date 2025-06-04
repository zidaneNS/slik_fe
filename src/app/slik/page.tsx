import { IoIosAdd } from "react-icons/io";

export default function Page() {
    return (
        <main className="flex flex-col min-h-screen gap-y-4 bg-slate-100 px-8 pt-52">
            <section className="flex w-full justify-between items-center">
                <h1 className="text-4xl font-semibold">SLIK Management</h1>
                <button className="py-2 px-4 text-white rounded-md flex gap-x-3 items-center bg-slate-800 cursor-pointer hover:bg-slate-600 duration-300">
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
                    {/* {forms && forms.map((form, idx) => (
                        <div key={idx} className="col-span-9 grid grid-cols-9 px-2 py-3">
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{idx + 1}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{form.tanggal_pengajuan.toString()}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{form.ktp.nama}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{form.ktp.alamat}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{form.ktp.NIK}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{form.ktp.TTL}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{kredits?.filter(kredit => kredit.id === form.kredit_id)[0]?.jenis_kredit.toString()}</div>
                            <div className="w-full text-center h-auto break-words whitespace-normal px-2">{kredits?.filter(kredit => kredit.id === form.kredit_id)[0]?.nama_ao.toString()}</div>
                            <div className="flex gap-x-2 w-full items-center justify-center">
                                <button onClick={() => handleDelete(form)} className="flex justify-center items-center cursor-pointer text-red-500 hover:text-red-300 duration-300">
                                    <RiDeleteBin6Line className="size-6" />
                                </button>
                            </div>
                        </div>
                    ))} */}
                </div>
            </section>
        </main>
    )
}