import AutoGrowTextArea from "@/components/AutoGrowTextArea"
import Block from "@/components/Block"
import TitleBar from "@/components/TitleBar"
import Link from "next/link"


const Contact = () => {
    return (
        <div>
            <div className="w-full flex flex-col items-center bg-lapis-lazuli text-white py-10">
                <div className="text-[80px]">Contact Us</div>

                {/* <div className={" text-[30px] font-[100] pt-12 pb-8 w-7/12 text-center leading-tight"}>
                    Explore jobs at Telea and our parters.
                </div> */}
            </div>
            <Block className="flex flex-col items-center">
                <form className="lg:w-1/2 gap-2">
                    <label className="my-2">
                        <div>Name</div>
                        <input required type="text" className="border border-black px-2 py-1 " />
                    </label>

                    <label className="my-2">
                        <div>Email</div>
                        <input required type="email" className="border border-black px-2 py-1 " />
                    </label>

                    <label className="my-2">
                        <div>Purpose</div>
                        <select required className="w-fit border border-black px-2 py-1">
                            <option>Hire Telea’s Services</option>
                            <option>Collaborate with Telea</option>
                            <option>Speaking opportunities</option>
                            <option>Refer a client</option>
                            <option>Request Press Kit</option>
                            <option>Other</option>
                        </select>
                    </label>
                    

                    <AutoGrowTextArea required placeholder="Message" className="w-full h-fit border border-black px-2 py-1 my-4" />

                    <button className="w-fit border border-black px-2 py-1">Submit</button>
                </form>

                <p className="my-4">
                    For general and media inquiries, contact us at
                    <span className="underline ml-1">
                        contact@teleainsights.com
                    </span>
                </p>

            </Block>
        </div>
    )
}

export default Contact