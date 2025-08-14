import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ className = '' }) => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    {
      label: 'Dashboard',
      path: '/document-management-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Document Management Dashboard'
    },
    {
      label: 'About',
      path: '/about',
      icon: 'Info',
      tooltip: 'Company Information'
    },
    {
      label: 'Contact',
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

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className={`bg-card border-b border-border shadow-sm ${className}`}>
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link 
            to="/document-management-dashboard"
            className="flex items-center space-x-3 group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Icon name="FileText" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                Document Insight System
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Professional Document Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg
                  transition-all duration-150 ease-out
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
                  size={18}
                  className={`
                    transition-colors duration-150
                    ${isActivePath(item?.path) 
                      ? 'text-primary-foreground' 
                      : 'text-muted-foreground'
                    }
                  `}
                />
                <span className="font-medium text-sm">
                  {item?.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden relative">
            <button
              onClick={toggleMoreMenu}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-150"
              aria-label="Open navigation menu"
            >
              <Icon name="Menu" size={20} />
              <span className="text-sm font-medium">Menu</span>
            </button>

            {/* Mobile Dropdown Menu */}
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 animate-scale-in">
                  <div className="py-2">
                    {primaryNavItems?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className={`
                          flex items-center space-x-3 px-4 py-3
                          transition-colors duration-150
                          hover:bg-muted
                          ${isActivePath(item?.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-popover-foreground'
                          }
                        `}
                        title={item?.tooltip}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18}
                          className={`
                            ${isActivePath(item?.path) 
                              ? 'text-primary-foreground' 
                              : 'text-muted-foreground'
                            }
                          `}
                        />
                        <span className="font-medium text-sm">
                          {item?.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;