import Link from "next/link"

const PhilanthropicAdvising = () => {
    return (
        <div className="">
            <div className="w-full flex flex-col items-center bg-blue-green px-10 py-10">
                <div className={" font-bold text-[80px]"}>Philanthropic Advising</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    Empowering Philanthropic Leadership for Lasting Change
                </div>
            </div>

            <img src="/img/mountains.jpeg" className="w-full h-auto max-h-[700px] object-cover" />

            <div className={" font-thin text-3xl p-10 md:px-40 leading-tight"}>
                At Telea Insights, we specialize in providing comprehensive philanthropic advising to families,
                individuals, and foundations. Our personalized approach ensures that every client can design,
                implement, and scale high-impact strategies that align with their values and vision for social good.
                We guide clients through every step of their philanthropic journey, from strategy development to
                operational optimization and impact evaluation, helping them achieve their charitable goals with
                confidence and clarity.
            </div>

            <div className="relative flex flex-col gap-12 grid grid-cols-12 py-20 leading-tight px-20 text-[24px]">
                <>
                    <div className=" col-span-2 col-start-3 font-bold">Families, Individuals and Foundations</div>
                    <div className="font-thin col-span-6 col-start-5">
                        <div>
                            We work closely with families, individuals, and foundations to develop and implement
                            strategic giving plans. Our services include cause identification, impact assessment, and
                            grant-making strategies to maximize the effectiveness of your philanthropic investments.
                        </div>
                        <div className="mt-4">
                            <Link href="/clients/families-individuals-and-foundations" className="underline">Learn more about our Philanthropic Advising services</Link>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default PhilanthropicAdvising
