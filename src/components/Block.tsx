

const Block = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={"p-6 md:px-20 md:py-10 " + className}>{children}</div>
)

export default Block