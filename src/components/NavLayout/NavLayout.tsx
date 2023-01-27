import Nav from "../Nav/Nav";

export default function NavLayout({children}) {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-100">
            <Nav />  
            {children}
        </div>
    )
}

