import Nav from "../Nav/Nav";

export default function NavLayout({children}) {
    return (
        <div className="min-h-screen bg-zinc-100">
            <Nav />  
            {children}
        </div>
    )
}

