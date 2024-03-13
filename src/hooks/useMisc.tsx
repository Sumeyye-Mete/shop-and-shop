import { useContext } from "react";
import MiscContext, { UseMiscContextType } from "@/context/MiscProvider";

const useMisc = (): UseMiscContextType => useContext(MiscContext);

export default useMisc;
