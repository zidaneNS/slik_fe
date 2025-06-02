export default function ErrorInputField({ errMsg }: { errMsg: string | string[] }) {
    return (
        <div className="text-red-500 text-sm py-2 px-4 rounded-md bg-red-400/10">{errMsg}</div>
    )
}