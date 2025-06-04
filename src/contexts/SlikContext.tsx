import { Slik } from "@/lib/type"

type SlikContextType = {
    sliks: Slik[] | null
}

const initContext: SlikContextType = {
    sliks: []
}