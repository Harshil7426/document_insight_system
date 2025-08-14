import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, className = '' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Home',
      path: '/document-management-dashboard',
      icon: 'Home',
      tooltip: 'Document Management Dashboard'
    },
    {
      label: 'About Us',
      path: '/about',
      icon: 'Info',
      tooltip: 'Company Information'
    },
    {
      label: 'Contact Us',
      path: '/contact',
      icon: 'Mail',
      tooltip: 'Support and Communication'
    }
  ];

  const isActivePath = (path) => {
    if (path === '/document-management-dashboard') {
      return location?.pathname === '/' || location?.pathname === path;
    }
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-sm hover:bg-muted transition-colors duration-150"
        aria-label="Toggle navigation menu"
      >
        <Icon 
          name={isMobileMenuOpen ? 'X' : 'Menu'} 
          size={24} 
          className="text-foreground"
        />
      </button>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileMenu}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-100
          transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
          w-60 lg:w-60
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-border">
            <Link 
              to="/document-management-dashboard"
              className="flex items-center space-x-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Icon name="FileText" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                  Document Insight
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  System
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems?.map((item) => (
                <li key={item?.path}>
                  <Link
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-3 py-3 rounded-lg
                      transition-all duration-150 ease-out group
                      hover:bg-muted hover:scale-105
                      ${isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:text-primary'
                      }
                    `}
                    title={item?.tooltip}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20}
                      className={`
                        transition-colors duration-150
                        ${isActivePath(item?.path) 
                          ? 'text-primary-foreground' 
                          : 'text-muted-foreground group-hover:text-primary'
                        }
                      `}
                    />
                    <span className="font-medium">
                      {item?.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground font-mono text-center">
              © 2025 Document Insight System
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content Spacer for Desktop */}
      <div className="hidden lg:block w-60 flex-shrink-0" />
    </>
  );
};

export default Sidebar;