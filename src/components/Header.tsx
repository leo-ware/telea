

const Header = ({children, level}: {children: React.ReactNode, level: 1 | 2 | 3 | 4}) => {
    if (level === 1) {
        return (
            <h1 className="text-3xl mb-4 font-bold">{children}</h1>
        )
    } else if (level === 2) {
        return (
            <h2 className="text-2xl mb-4 font-bold">{children}</h2>
        )
    } else if (level === 3) {
        return (
            <h3 className="text-xl mb-4 font-bold">{children}</h3>
        )
    } else {
        return (
            <h4 className="text-lg mb-2 font-bold">{children}</h4>
        )
    }
}

export default Header