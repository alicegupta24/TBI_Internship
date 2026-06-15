function Navbar() {
return ( <nav className="flex justify-between items-center p-4 bg-gray-800 text-white"> <h1 className="text-2xl font-bold">StayInsight</h1> <div className="space-x-4"> <a href="/">Home</a> <a href="/about">About</a> <a href="/dashboard">Dashboard</a> <a href="/login">Login</a> </div> </nav>
)
}

export default Navbar
