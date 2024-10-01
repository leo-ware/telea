import { ImSpinner8 } from "react-icons/im"

const Spinner = (props: {size?: number, color?: string}) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <ImSpinner8 className="animate-spin" size={props.size ?? 24} color={props.color ?? "black"} />
        </div>
    )
}

export default Spinner
