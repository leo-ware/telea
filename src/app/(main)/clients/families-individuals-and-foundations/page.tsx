import RollingImage from "@/components/RollingImage"

const MediaVentures = () => {
    return (
        <div className="">
            <div className="w-full flex flex-col items-center bg-blue-green px-10 py-10">
                <div className={" text-center font-bold text-[80px]"}>Families, Individuals <br />and Foundations</div>

                <div className={" text-[25px] font-[100] mt-[-15px]"}>
                    Empowering Philanthropic Leadership for Lasting Change
                </div>
            </div>

            <div className={" font-thin text-[40px] p-10 md:px-40 leading-tight"}>
                <p className="mb-8 md:mb-4">
                    Telea Insights provides strategic support, fundraising expertise, and
                    operational efficiency solutions to help non-profits maximize their
                    impact and achieve their missions.
                </p>
            </div>

            <div className="flex items-stretch text-[30px] px-10 md:px-40 border-y-4 border-blue-green">
                <div className="flex items-center w-1/3 font-bold border-r-4 border-sky-blue">
                    <div>What we can do</div>
                </div>
                <div className="pl-8 w-2/3 py-10 font-[400] leading-tight">
                    {[
                        "Personalized Philanthropic Planning",
                        "Family Foundation Management",
                        "Donor-Advised Funds (DAF) Guidance",
                        "Impact Measurement and Reporting",
                        "Legacy and Estate Planning",
                        "Grantmaking Strategy Development",
                        "Program and Portfolio Evaluation",
                        "Program Staff Training and Coaching",
                        "Grantee Capacity Building",
                        "Operational Efficiency and Process Improvement",
                        "Impact Reporting and Communication"
                    ].map(item => <div className="mt-1">{item}</div>)}
                </div>
            </div>

            <RollingImage imageSrc={"/img/ellen-fund-gorilla.jpg"} desiredHeight={500} />

            <div className="flex text-[30px] p-10 md:px-40 border-black">
                <div id="tef" className="w-1/3 font-bold">
                    <div>Ellen Fund</div>
                </div>
                <div className="w-2/3">
                    <div className="mb-4">
                        Built and Managed Organization and Media Production
                    </div>
                    <div className="text-[18px]">
                        The Ellen Fund, established by Ellen DeGeneres and Portia De Rossi, was dedicated to supporting global conservation efforts, with a particular focus on protecting endangered species and their habitats. The fund aims to raise awareness and mobilize resources for critical conservation projects around the world. One of its flagship initiatives includes the establishment of a sustainable 12-acre campus in Rwanda, dedicated to gorilla conservation and training the next generation of African conservationists. Through strategic investments, high-profile partnerships, and impactful media projects, including the production and release of a high-level film on Discovery, the Ellen Fund strives to make a significant impact on wildlife preservation and environmental sustainability.
                        <br /><br />
                        Telea Insights launched the Ellen Fund by developing the mission, funding priorities and key communications for the Ellen Fund and managed it from its inception to its successful conclusion, securing $11 million for global conservation efforts. We supported the establishment of a sustainable 12-acre campus in Rwanda, dedicated to gorilla conservation and training future African conservationists, which attracted over 50,000 visitors in its first two years. Additionally, we oversaw strategic planning, operational execution, and the eventual wrap-up of the organization. There were significant benefits felt by the 2,400 member construction team, including certification for new construction skills, ongoing employment even after the Ellen Campus construction concluded, and personal savings.  The Ellen Fund led the impact campaign for the film Ellen DeGeneres narrated titled Endangered, which deployed $1 million to conservation initiatives around the world including conservation for sharks, lemurs, Indonesian songbirds, frogs and clouded leopards. Our comprehensive management ensured the Ellen Fund's lasting impact and legacy, including the seed funding of a Rwandan film production company that grew to a 10-member team. One of the key highlights of our collaboration was the production and release of a powerful film on Discovery, which captivated a wide audience and significantly heightened awareness of critical conservation issues. This media project expanded the Ellen Fund’s reach and also amplified its mission to protect endangered species and their habitats on a global scale.
                    </div>
                </div>
            </div>

            <RollingImage imageSrc={"/img/happy_speech.jpg"} desiredHeight={500} />

            <div className="flex text-[30px] p-10 md:px-40 border-black">
                <div id="dfe" className="w-1/3 font-bold">
                    <div>Daughters for Earth</div>
                </div>
                <div className="w-2/3">
                    <div className="mb-4">
                        Organizational Development, Fundraising and Campaign Management
                    </div>
                    <div className="text-[18px]">
                        Daughters for Earth is an initiative that mobilizes women around the world to protect and restore the Earth. By focusing on the leadership and contributions of women in environmental conservation, the organization aims to address climate change and biodiversity loss. Daughters for Earth supports grassroots projects led by women that promote sustainable practices, protect natural habitats, and foster resilient communities. Through funding, resources, and a global network of advocates, the initiative empowers women to lead transformative environmental action. By amplifying the voices and efforts of women, Daughters for Earth seeks to create a more sustainable and equitable future for all.
                        <br /><br />
                        Telea Insights CEO, Casey Rogers, was instrumental in the early formation of Daughters for Earth as an advisor and thought partner to co-founder, Zainab Salbi, before the venture even launched. Advising on the organizational structure of Daughters for Earth was Telea Insights first contribution to the newly formed fund and movement.Telea Insights has achieved remarkable success with Daughters for Earth by focusing on fundraising and impactful campaign management. We helped raise over $10 million, providing essential financial resources to support their initiatives to support, celebrate and mobilize women-led protection and restoration of Earth. Our strategic campaigns have raised awareness and mobilized support, fostering a network of engaged stakeholders. Additionally, we expanded the team, bringing in talent and expertise to drive the mission forward. Through published articles and hosted events, Daughters for Earth has significantly contributed to the discourse on conservation and women's leadership, amplifying their impact on a global scale. These efforts have included securing substantial investments and building a robust organizational infrastructure to support ongoing and future growth.
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MediaVentures