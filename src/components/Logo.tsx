import Image from "next/image"
import Telea from "./img/Logo.svg"

const Logo = ({width}: {width: number}) => (
    <Image
        src={Telea.src}
        alt="Telea"
        width={width}
        height={(width / Telea.width) * Telea.height}
        />
)

export default Logo