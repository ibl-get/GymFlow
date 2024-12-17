import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, UserCheck, Settings, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getGymSettings } from '../data/settings'
import type { GymSettings } from '../types/GymSettings'

const Navbar = () => {
  const [settings, setSettings] = useState<GymSettings>(getGymSettings())
  const navigate = useNavigate()

  useEffect(() => {
    setSettings(getGymSettings())
  }, [])

  const handleLogout = () => {
    if (window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      localStorage.removeItem('isAuthenticated')
      navigate('/lock')
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20" role="navigation" aria-label="القائمة الرئيسية">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {settings.logo && (
              <img 
                src={settings.logo} 
                alt={`شعار ${settings.name}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span className="text-white font-bold text-lg">{settings.name}</span>
          </div>

          <div className="flex items-center gap-8" role="menubar">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-white opacity-75 hover:opacity-100 group ${isActive ? 'opacity-100' : ''}`
              }
              role="menuitem"
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              <span>لوحة التحكم</span>
              <LayoutDashboard className="w-5 h-5 transition-colors group-hover:text-blue-400" aria-hidden="true" />
            </NavLink>

            <NavLink 
              to="/members" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-white opacity-75 hover:opacity-100 group ${isActive ? 'opacity-100' : ''}`
              }
              role="menuitem"
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              <span>الأعضاء</span>
              <Users className="w-5 h-5 transition-colors group-hover:text-purple-400" aria-hidden="true" />
            </NavLink>

            <NavLink 
              to="/present" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-white opacity-75 hover:opacity-100 group ${isActive ? 'opacity-100' : ''}`
              }
              role="menuitem"
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              <span>الحضور</span>
              <UserCheck className="w-5 h-5 transition-colors group-hover:text-green-400" aria-hidden="true" />
            </NavLink>

            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-white opacity-75 hover:opacity-100 group ${isActive ? 'opacity-100' : ''}`
              }
              role="menuitem"
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              <span>الإعدادات</span>
              <Settings className="w-5 h-5 transition-colors group-hover:text-orange-400" aria-hidden="true" />
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white opacity-75 hover:opacity-100 hover:text-red-400 transition-colors"
              role="menuitem"
            >
              <span>خروج</span>
              <LogOut className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
