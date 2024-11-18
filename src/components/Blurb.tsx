

const Blurb = ({ blurb }: { blurb: string }) => {
    return (
        <div className={"font-thin text-[20px] md:text-[30px] lg:text-[40px] pb-2 md:pb-4 py-4 px-8 md:px-20 lg:px-40 leading-tight"}>
            <p className="mb-4">
                {blurb}
            </p>
        </div>
    )
}

export default Blurb