import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { to: "/admin/dashboard", icon: "🏠", label: "Dashboard" },
    { to: "/admin/modul", icon: "📚", label: "Modul" }, 
  ];

  return (
    <aside className="bg-gray-800 text-gray-200 min-h-screen transition-all duration-300 w-20 lg:w-64 shadow-2xl">
      
      <div className="p-4 border-b border-gray-700 bg-gray-900 h-16 flex items-center justify-center lg:justify-start">
        <span className="text-xl font-extrabold text-cyan-400">BP</span>
        <span className="text-xl font-extrabold hidden lg:block ml-2 text-white">Belajar Pintar</span>
      </div>
      
      <nav className="p-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3 rounded-xl transition duration-200 ease-in-out transform 
               ${isActive 
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/50 scale-[1.02] font-semibold" 
                  : "hover:bg-gray-700 hover:text-white"
               }`
            }
          >
            <span className="text-xl w-6 text-center">{item.icon}</span> 
            <span className="menu-text hidden lg:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
    </aside>
  );
};

export default Sidebar;