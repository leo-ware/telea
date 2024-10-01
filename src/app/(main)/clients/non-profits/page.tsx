import RollingImage from "@/components/RollingImage"

const NonProfits = () => {
    return (
        <div className="">
            <div className="w-full flex flex-col items-center bg-selective-yellow px-10 py-10">
                <div className={" font-bold text-[80px]"}>Non Profits</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    Empowering Non-Profits to Achieve Greater Impact
                </div>
            </div>

            <div className={" font-thin text-[40px] p-10 md:px-40 leading-tight"}>
                <p className="mb-8 md:mb-4">
                    Telea Insights provides strategic support, fundraising expertise, and
                    operational efficiency solutions to help non-profits maximize their
                    impact and achieve their missions.
                </p>
            </div>

            <div className="flex items-stretch text-[30px] px-10 md:px-40 border-y-4 border-selective-yellow">
                <div className="flex items-center w-1/3 font-bold border-r-4 border-selective-yellow">
                    <div>What we can do</div>
                </div>
                <div className="pl-8 w-2/3 py-10 font-[400] leading-tight">
                    {[
                        "Strategic Planning and Development",
                        "Fund Development and Grant Writing",
                        "Operational Efficiency and Process Improvement",
                        "Board Development and Governance",
                        "Program Evaluation and Impact Assessment",
                    ].map(item => <div className="mt-1">{item}</div>)}
                </div>
            </div>

            <RollingImage imageSrc={"/img/green.jpeg"} desiredHeight={500} />

            <div className="flex text-[30px] p-10 md:px-40 border-black">
                <div id="fds" className="w-1/3 font-bold">
                    <div>Filha Do Sol</div>
                </div>
                <div className="w-2/3">
                    <div className="mb-4">
                        Organizational Strategy, Fund Development <br /> and Visibility Enhancement
                    </div>
                    <div className="text-[18px]">
                        Filha do Sol is dedicated to empowering women and promoting environmental conservation in Brazil. The organization focuses on developing sustainable livelihoods for women by providing them with the tools, training, and support needed to become leaders in their communities. Through initiatives such as regenerative agriculture, eco-friendly product creation, and educational programs, Filha do Sol fosters economic independence and environmental stewardship. By combining women's empowerment with environmental action, the organization aims to create a more equitable and sustainable future for all. Filha do Sol's holistic approach enhances the lives of women and contributes to the preservation and restoration of Brazil's natural resources.
                        <br /><br />
                        Telea Insights has significantly contributed to Filha do Sol's growth by spearheading fundraising efforts and enhancing their visibility. We secured over $250,000 in donations through our impact fund, events, and connections to potential donors. Our team facilitated podcast appearances, obtained marketing contracts, and provided grant writing support, which resulted in successful grant applications to Lush, Global Greengrants Fund, and Brazil Foundation. These efforts led to significant financial support and introduced Filha do Sol to their largest funder. Additionally, we organized high-profile events, including those during New York Climate Week and at the Obama Foundation, further raising Filha do Sol’s profile. These strategic initiatives have not only bolstered Filha do Sol’s financial standing but also significantly raised their visibility and engagement.
                    </div>
                </div>
            </div>

            <RollingImage imageSrc={"/img/grip-tape.png"} desiredHeight={400} />

            <div className="flex text-[30px] p-10 md:px-40 border-black">
                <div id="fds" className="w-1/3 font-bold">
                    <div>GripTape</div>
                </div>
                <div className="w-2/3">

                    <div className="mb-4">
                        Restructuring and Donor Strategy
                    </div>
                    <div className="text-[18px]">
                        GripTape empowers youth by giving them the tools and resources to take control of their learning. Through a self-directed learning process, GripTape provides young people with a $500 Learning Challenge Grant, allowing them to pursue their interests, develop skills, and achieve personal goals outside traditional educational settings. Participants design their learning journey, set their milestones, and complete their projects with minimal adult intervention. GripTape's approach cultivates a sense of ownership, confidence, and self-efficacy in youth, preparing them for lifelong learning and success.
                        <br/><br/>
                        Telea Insights partnered with GripTape to address critical aspects of their revenue model and donor engagement strategy. By collaborating closely with CEO, we facilitated a comprehensive restructuring of GripTape's revenue model, ensuring a more sustainable and scalable financial framework. Our team also developed a targeted major donor strategy, focusing on outreach and engagement to secure significant contributions. Additionally, we refined donor communications materials, enhancing their effectiveness in conveying GripTape's mission and impact. This strategic approach not only bolstered GripTape’s financial health but also strengthened their relationships with key stakeholders, setting the foundation for long-term success.

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NonProfits