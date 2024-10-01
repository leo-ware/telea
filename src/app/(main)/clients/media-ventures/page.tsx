import RollingImage from "@/components/RollingImage"

const MediaVentures = () => {
    return (
        <div className="">
            <div className="w-full flex flex-col items-center bg-selective-yellow px-10 py-10">
                <div className={" font-bold text-[80px]"}>Media Ventures</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                Elevating Stories that Inspire and Transform
                </div>
            </div>

            <div className={" font-thin text-[40px] p-10 md:px-40 leading-tight"}>
                <p className="mb-8 md:mb-4">
                Telea Insights partners with media ventures to produce compelling content that raises awareness and drives social change, from documentaries to digital campaigns.
                </p>
            </div>

            <div className="flex items-stretch text-[30px] px-10 md:px-40 border-y-4 border-selective-yellow">
                <div className="flex items-center w-1/3 font-bold border-r-4 border-selective-yellow">
                    <div>What we can do</div>
                </div>
                <div className="pl-8 w-2/3 py-10 font-[400] leading-tight">
                    {[
                        "Content Strategy and Development",
                        "Production Management",
                        "Campaign Planning and Execution",
                        "Audience Engagement and Analytics",
                        "Partnership and Sponsorship Development"
                    ].map(item => <div className="mt-1">{item}</div>)}
                </div>
            </div>

            <RollingImage imageSrc={"/img/uncharitable-guy.jpg"} desiredHeight={500} />

            <div className="flex text-[30px] p-10 md:px-40 border-black">
                <div id="fds" className="w-1/3 font-bold">
                    <div>Uncharitable</div>
                </div>
                <div className="w-2/3">
                    <div className="mb-4">
                        Fundraising and Launch Strategy
                    </div>
                    <div className="text-[18px]">
                        "Uncharitable" is a groundbreaking documentary that challenges conventional perceptions of charity and philanthropy. The film delves into the systemic issues and limitations within the charitable sector, advocating for a more effective and sustainable approach to social impact. By highlighting the stories of innovative non-profit leaders and examining the obstacles they face, "Uncharitable" calls for a reevaluation of the rules governing charitable organizations. The film aims to inspire change in how society supports and funds social initiatives, promoting a model that allows non-profits to thrive and create lasting, meaningful change.
                        <br /><br />
                        For Uncharitable, Telea Insights played a key role in raising more than $200,000 to support the production and national release of the documentary film. We meticulously planned the launch strategy, focusing on maximizing viewership and engagement. Our efforts resulted in substantial media coverage, with the documentary reaching a wide audience and generating significant discourse in communities around the United States and beyond. The success of this initiative is reflected in the extensive reach and positive reviews the film received. We helped secure 147 screening licenses with an estimated audience of 100 per screening, leading to over 26.2 million estimated views and extensive media engagement. This project highlights the importance of strategic fundraising and effective launch planning in amplifying impactful narratives.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaVentures