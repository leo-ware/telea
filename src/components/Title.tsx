import { open_sans } from "@/app/fonts"

const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={"w-full h-[66vh] flex items-center justify-center " + open_sans.className}>
            <h1 className="text-3xl font-bold">
                {children}
            </h1>
        </div>
    )
}

export default Title