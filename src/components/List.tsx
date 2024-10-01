
const List = ({ children, ordered }: { children: React.ReactNode[], ordered?: boolean }) => {
    const items = children.map((child, index) => (
        <li key={index} className="flex gap-4 items-center">
            <div>{ordered? index : "•"}</div>
            <div>{child}</div>
        </li>
    ))

    return ordered ? (
        <ol className="ml-6">
            {items}
        </ol>
    ) : (
        <ul className="ml-6">
            {items}
        </ul>
    )
}

export default List