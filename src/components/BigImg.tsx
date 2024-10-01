"use client"

const BigImg = ({ children, src }: { children: React.ReactNode, src: string }) => {
    return (
        <div
            className="w-full h-lvh object-cover"
            style={{ backgroundImage: `url("${src}")` }}
        >
            {children}
        </div>
    )
}

export default BigImg