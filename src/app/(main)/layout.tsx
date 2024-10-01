import Footer from "@/components/Footer";
import Toolbar from "@/components/Toolbar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="h-full w-full flex flex-col justify-between">
            <div className="h-fit w-full">
                <Toolbar />
            </div>
            
            <div className="grow z-10 w-full bg-white">
                {children}
            </div>
            <div className="h-fit w-full">
                <Footer />
            </div>
        </div>
    )
}