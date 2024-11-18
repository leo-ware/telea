

const NewHeader = ({ title, subtitle, backgroundColor }: { title: string, subtitle: string, backgroundColor?: string }) => {
    return (
        <div className="w-full flex flex-col items-start px-10 py-10" style={{ backgroundColor }}>
            <div className={"w-full font-bold text-[35px] sm:text-[60px] md:text-[80px] leading-tight md:text-center"}>{title}</div>

            <div className={"w-full text-[25px] font-[100] mt-4 md:text-center"}>
                {subtitle}
            </div>
        </div>
    )
}

export default NewHeader