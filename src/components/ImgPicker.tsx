"use client"

import { createClient } from "@/supabase/client"
import { useEffect, useRef, useState } from "react"
import Spinner from "./Spinner"
import { MdClose } from "react-icons/md"

const ImgPicker = ({ img, setImg }: { img: string, setImg: (img: string) => void }) => {
    const client = createClient()
    const [open, setOpen] = useState(false)
    const [errorState, setErrorState] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const close = () => {
        if (selectedImage) {
            setImg(selectedImage)
        }
        setOpen(false)
        setSelectedImage(null)
        setAvailableImages([])
        setErrorState(null)
        setUploading(false)
    }

    const [availableImages, setAvailableImages] = useState<{ id: string, name: string }[]>([])
    useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await client.storage.from("imgs").list()
            console.log(data)
            if (error) {
                console.error(error)
            } else {
                setAvailableImages(data.map((img) => img))
            }
        }
        if (open) {
            fetchImages()
        }
        setSelectedImage(img)
    }, [open])

    const uploadImage = async (file: File) => {
        setUploading(true)
        const { data, error } = await client.storage.from("imgs").upload(file.name, file, {
            cacheControl: "3600",
            upsert: true
        })
        if (error) {
            console.error(error)
            setErrorState(error.message)
            return
        }

        const { data: { publicUrl } } = client.storage.from("imgs").getPublicUrl(data.path)
        setSelectedImage(publicUrl)
        setAvailableImages([{ id: data.path, name: file.name }, ...availableImages])

        setUploading(false)
    }

    if (!open) {
        return (
            <div className="my-2">
                <button onClick={() => setOpen(true)} className="border border-gray-300 rounded-md p-2">Edit Image</button>
            </div>
        )
    }

    return (
        <div onClick={close} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <div className="fixed top-10 right-10 p-4 cursor-pointer">
                <MdClose color="white" size={32} onClick={close} />
            </div>
            <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded-md w-3/4 h-1/2">
                <div className="w-full h-full flex flex-row gap-4">
                    <div className="flex flex-col justify-between w-1/2">
                        <div>
                            <div className="font-bold">Selected Image</div>
                            <div className="w-full h-96 max-h-full">
                                {(!selectedImage && !uploading) && <div className="italic text-gray-500">No image selected</div>}
                                {(selectedImage && !uploading) && <img className="w-64 max-w-full h-auto" src={selectedImage || ""} />}
                                {uploading && <Spinner />}
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div
                                onClick={() => inputRef.current?.click()}
                                className="border border-gray-300 bg-white rounded-md p-2 w-fit cursor-pointer"
                            >
                                Upload
                                <input
                                    ref={inputRef}
                                    className="hidden"
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            uploadImage(e.target.files[0])
                                        }
                                    }} />
                            </div>
                            <div onClick={close} className="border border-gray-300 bg-blue-500 text-white rounded-md p-2 w-fit cursor-pointer">
                                Done
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-4 flex flex-col gap-4 items-stretch">
                        <div className="font-bold">Available Images</div>
                        <div className="overflow-y-auto">
                            <div className="flex flex-row flex-wrap gap-2">
                                {!availableImages && <Spinner />}
                                {availableImages.map((img) => {
                                    const { data: { publicUrl } } = client.storage.from("imgs").getPublicUrl(img.name)
                                    return (
                                        <div key={img.id} onClick={() => setSelectedImage(publicUrl)} className="cursor-pointer">
                                            <img className="w-32 h-auto" src={publicUrl} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImgPicker