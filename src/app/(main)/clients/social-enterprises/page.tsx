import RollingImage from "@/components/RollingImage"

const NonProfits = () => {
    return (
        <div className="">
            <div className="w-full flex flex-col items-center bg-selective-yellow px-10 py-10">
                <div className={" font-bold text-[80px]"}>Social Enterprises</div>

                <div className={ " text-[25px] font-[100] mt-[-15px]"}>
                Scaling Social Enterprises for Sustainable Success
                </div>
            </div>

            <div className={" font-thin text-[40px] p-10 md:px-40 leading-tight"}>
                <p className="mb-8 md:mb-4">
                Telea Insights offers business development, strategic planning, and fundraising services to social enterprises, enabling them to grow sustainably and amplify their social impact.
                </p>
            </div>

            <div className="flex items-stretch text-[30px] px-10 md:px-40 border-y-4 border-selective-yellow">
                <div className="flex items-center w-1/3 font-bold border-r-4 border-selective-yellow">
                    <div>What we can do</div>
                </div>
                <div className="pl-8 w-2/3 py-10 font-[400]">
                    {[
                        "Business Model Development",
                        "Market Research and Analysis",
                        "Funding Strategy and Capital Raising",
                        "Operational Scaling",
                        "Impact Measurement and Reporting"
                        
                    ].map(item => <div className="mt-1">{item}</div>)}
                </div>
            </div>

            <RollingImage imageSrc={"/img/kula-landing.png"} desiredHeight={500} />

            <div className="flex text-[30px] p-10 md:px-40 border-black">
                <div id="fds" className="w-1/3 font-bold">
                    <div>Kula</div>
                </div>
                <div className="w-2/3">
                    <div className="mb-4">
                        Executive Coaching and Leadership Transition
                    </div>
                    <div className="text-[18px]">
                        Kula Project is dedicated to eradicating poverty through the development of female entrepreneurs in Rwanda. By providing comprehensive business training, mentorship, and access to capital, Kula Project empowers women to build profitable businesses and create sustainable futures for their families and communities. The organization focuses on holistic support, ensuring that participants not only gain business skills but also grow in personal development and leadership. Through this integrated approach, Kula Project helps women entrepreneurs transform their lives, stimulate local economies, and foster long-term community development.

                        At Kula, Telea Insights played a pivotal role in facilitating a major organizational shift through executive coaching. Recognizing the need for sustainable leadership, we guided the CEO through a successful transition from a founder-led structure to a more robust leadership model. This involved intensive coaching on transition strategies, internal communication, and aligning the team with the new vision. The impact was profound, resulting in increased operational efficiency and a stronger organizational foundation. Kula's evolution post-transition has positioned them for future success, with a leadership team that is better equipped to navigate the challenges and opportunities ahead.

                    </div>
                </div>
            </div>

            <RollingImage imageSrc={"/img/imani-instagram.jpg"} desiredHeight={500} />

            <div className="flex text-[30px] p-10 md:px-40 border-black">
                <div id="fds" className="w-1/3 font-bold">
                    <div>Imani Collective</div>
                </div>
                <div className="w-2/3">

                    <div className="mb-4">
                        Financial Stability and Operational Efficiency
                    </div>
                    <div className="text-[18px]">
                        Imani Collective is a social enterprise that empowers artisans in Kenya and Ethiopia by providing them with sustainable employment opportunities and skill development. By combining traditional craftsmanship with contemporary design, Imani Collective produces a wide range of ethically made home decor products. The organization focuses on holistic development, offering education, childcare, and personal growth programs to its artisans. Through fair wages and supportive community initiatives, Imani Collective enables artisans to achieve financial independence, support their families, and create a brighter future. The collective's commitment to ethical practices and high-quality products also promotes responsible consumerism and global social impact.
                        <br /><br />
                        Telea Insights has been instrumental in strengthening Imani Collective’s financial stability and operational efficiency. Our team implemented loan restructuring for greater financial flexibility and also advised on increasing capital investment, enhancing Imani Collective’s ability to manage resources effectively. Additionally, we facilitated a free website revamp, improving their online presence and engagement. These efforts have not only stabilized Imani Collective financially but also positioned them for sustainable growth, empowering them to continue their impactful work.

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NonProfits