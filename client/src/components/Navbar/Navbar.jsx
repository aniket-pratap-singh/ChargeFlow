import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-400">
          ChargeFlow
        </h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-sm font-medium">

          <li className="cursor-pointer hover:text-green-400 transition-colors">
            <Link to="/"> Home </Link>
          </li>

          <li className="cursor-pointer hover:text-green-400 transition-colors">
            <Link to="/stations"> Stations </Link>
          </li>

          <li className="cursor-pointer hover:text-green-400 transition-colors">
            <Link to="/about"> About </Link>
          </li>

          <li className="cursor-pointer hover:text-green-400 transition-colors">
            <Link to="/login"> Login </Link>
          </li>

          <li className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition-colors">
            <Link to="/Register"> Register </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;