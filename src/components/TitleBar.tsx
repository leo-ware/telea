

const TitleBar = ({ children, backgroundImage }: { children: React.ReactNode, backgroundImage?: string }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="bg-blue-200 w-full h-96 text-[48px] text-white font-bold flex flex-col justify-center items-center">
            {children}
        </div>
    )
}

export default TitleBar