import { FaArrowRight } from "react-icons/fa6"
import Link from "next/link"


const About = () => {
    return (
        <main className="bg-[#F1EAE0]">
            <div className="w-full flex flex-col items-center bg-[#1E589E] text-white px-10 py-10">
                <div className="text-[80px]">About</div>

                <div className={" text-[30px] font-[100] pt-12 pb-8 w-full md:w-7/12 text-center leading-tight"}>
                    We help visionary leaders turn their bold ideas into lasting impact. We believe in the power of
                    strategic action and unwavering support to make a difference in the world.
                </div>
            </div>

            <div className="w-full">
                <img className="w-full" src={"/img/happy_people.jpeg"} />
            </div>

            <div className="relative flex flex-col gap-8 md:gap-12 md:grid md:grid-cols-14 py-20 leading-tight px-8 md:px-20 text-[24px]">

                <>
                    <div className="text-[26px] col-span-4 col-start-1 md:pb-10 ">
                        <div className="font-bold">Our Story</div>
                        <div className="font-thin text-[26px] mt-8">
                            Our name, derived from the Greek word Telos, signifies our commitment to helping leaders find and
                            achieve their highest purposes. We specialize in guiding initiatives that champion social justice,
                            empower women, foster African prosperity and protect nature.
                        </div>
                    </div>

                    <div className="md:col-start-5 md:col-span-8">
                        <video controls poster="/img/videoframe.png">
                            <source src="/video/telea_insights_overview (720p).mp4" type="video/mp4" />
                        </video>
                    </div>
                </>

                <div className="col-start-1 col-span-4 md:col-span-12 border-b border-black"/>
                
                < >
                    <div className="md:col-span-2 md:col-start-3 flex md:justify-end">
                        We <strong className="ml-1">identify</strong>
                    </div>
                    <div className="font-thin col-start-2 col-span-4 md:col-span-6 md:col-start-5">
                        and <strong>mobilize</strong> the human and financial resources necessary to bring visions to
                        life, from recruitment and training to fund development.
                    </div>
                </ >

                <>
                    <div className="md:col-span-2 md:col-start-3 flex md:justify-end">We{" "} <strong className="ml-1">partner</strong></div>
                    <div className="font-thin col-start-2 col-span-4 md:col-span-6 md:col-start-5">
                        with clients to define their vision and develop strategic plans
                        that set the stage for impactful, sustainable change.
                    </div>
                </>

                < >
                    <div className="md:col-span-2 md:col-start-3 flex md:justify-end">
                        We <strong className="ml-1">create</strong>
                    </div>
                    <div className="font-thin col-start-2 col-span-4 md:col-span-6 md:col-start-5">
                        robust operational frameworks that allow initiatives to launch and scale with a
                        solid foundation for long-term success.
                    </div>
                </>

                <>
                    <div className="md:col-span-2 md:col-start-3 flex md:justify-end">
                        We <strong className="ml-1">offer</strong>
                    </div>
                    <div className="font-thin col-start-2 col-span-4 md:col-span-6 md:col-start-5">
                        deep, actionable insights through our experience, influential networks, and
                        cross-sector collaborations, equipping clients with the knowledge needed to drive meaningful change.
                    </div>
                </>

                {/* <div className="col-start-1 col-span-12 border-b border-black"/> */}

                <Link href="contact" className="flex items-center gap-4 col-start-3 col-span-6">
                    Contact Us <FaArrowRight />
                </Link>
            </div>
        </main>
    )
}

export default About