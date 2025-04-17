import { RootState } from "@/app/store/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";

function Loader() {
    const loading = useSelector((state: RootState) => state.auth.loading);    
    const pathname = usePathname()
    return (
        <>
            {(loading || pathname === "/") && <div className={`fixed z-50 inset-0  ${pathname === "/" ? "bg-black/20" : "bg-black/60"}  bg-opacity-50 backdrop-blur-sm flex justify-center items-center`}>
                <ClockLoader size={80}
                    speedMultiplier={2} color={`${pathname === "/" ? "#fff" : "#FF6B00"}`} />
            </div>}
        </>
    );
}

export default Loader;
