import { getSpecialImage } from "@/app/actions"

const BigCaptionedImage = async ({ name }: { name: string }) => {
    const image = await getSpecialImage(name)
    if (!image) {
        return null
    }

    return (
        <div id={`img-${name}`} className="w-full h-fit relative">
            <img src={image.url} className="w-full" />
            <div className="absolute bottom-2 left-2 text-white text-sm sm:text-md md:text-xl font-thin">
                {image.caption}
            </div>
        </div>
    )
}

export default BigCaptionedImage