import Link from "next/link"

const ImpactConsulting = () => {
    return (
        <div className="">
            <div className="w-full flex flex-col items-center bg-[#ffb703] px-10 py-10">
                <div className={" font-bold text-[80px]"}>Impact Consulting</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    Transforming Vision into Impact Across Sectors
                </div>
            </div>

            <img src="/img/speech_2.jpeg" className="w-full h-auto max-h-[700px] object-cover" />

            <div className={" font-thin text-[40px] p-10 md:px-40 leading-tight"}>
                <p className="mb-8 md:mb-4">
                    Telea Insights partners with organizations across diverse sectors—non-profits, social enterprises, and media ventures—offering tailored strategies to scale their operations and achieve sustainable impact. Our multi-disciplinary approach ensures that each organization can maximize its potential for social good.
                </p>
            </div>

            <div className="relative flex flex-col gap-12 grid grid-cols-12 py-20 leading-tight px-20 text-[24px]">
                <>
                    <div className=" col-span-2 col-start-3 font-bold">Non-Profits</div>
                    <div className="font-thin col-span-6 col-start-5">
                        <div>
                            We help non-profit organizations strengthen their missions, improve operational efficiency, and scale their impact. From strategic planning to program evaluation, we tailor our services to meet the specific needs of your organization.
                        </div>
                        <div className="mt-4">
                            <Link href="/clients/non-profits" className="underline">Learn more about how we support Non-Profits</Link>
                        </div>
                    </div>
                </>
                <>
                    <div className=" col-span-2 col-start-3 font-bold">Social Enterprises</div>
                    <div className="font-thin col-span-6 col-start-5">
                        <div>
                            We collaborate with social enterprises to build sustainable business models, attract funding, and expand their market reach. Our goal is to ensure that social impact and financial viability go hand in hand.
                        </div>
                        <div className="mt-4">
                            <Link href="/clients/social-enterprises" className="underline">Discover how we help Social Enterprises grow</Link>
                        </div>
                    </div>
                </>
                <>
                    <div className=" col-span-2 col-start-3 font-bold">Media Ventures</div>
                    <div className="font-thin col-span-6 col-start-5">
                        <div>
                            We partner with media ventures to create powerful content that educates, inspires, and drives change. Whether through documentary films, digital campaigns, or strategic storytelling, we help amplify the message of social change.
                        </div>
                        <div className="mt-4">
                            <Link href="/clients/media-ventures" className="underline">Explore our work with Media Ventures</Link>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default ImpactConsulting