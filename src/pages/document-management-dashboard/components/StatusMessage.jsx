import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const StatusMessage = ({ type, message, onDismiss, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const getStatusConfig = () => {
    const configs = {
      success: {
        bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        icon: 'CheckCircle',
        iconColor: 'text-emerald-500',
        progress: 'bg-gradient-to-r from-emerald-400 to-green-500'
      },
      error: {
        bg: 'bg-gradient-to-r from-red-50 to-rose-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: 'AlertCircle',
        iconColor: 'text-red-500',
        progress: 'bg-gradient-to-r from-red-400 to-rose-500'
      },
      warning: {
        bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
        border: 'border-amber-200',
        text: 'text-amber-800',
        icon: 'AlertTriangle',
        iconColor: 'text-amber-500',
        progress: 'bg-gradient-to-r from-amber-400 to-yellow-500'
      },
      info: {
        bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'Info',
        iconColor: 'text-blue-500',
        progress: 'bg-gradient-to-r from-blue-400 to-cyan-500'
      }
    };
    return configs?.[type] || configs?.info;
  };

  const config = getStatusConfig();

  if (!isVisible && !isAnimating) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'
    }`}>
      <div className={`
        relative overflow-hidden max-w-md w-full mx-4 rounded-2xl border-2 shadow-lg backdrop-blur-sm
        ${config?.bg} ${config?.border}
      `}>
        {/* Animated progress bar */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gray-200">
          <div 
            className={`h-full ${config?.progress} transition-all duration-300 ease-out`}
            style={{ 
              width: `${100 - ((Date.now() % duration) / duration) * 100}%`,
              animation: `shrink ${duration}ms linear`
            }}
          />
        </div>

        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* Animated icon */}
            <div className={`flex-shrink-0 transform transition-all duration-300 ${
              isAnimating ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <Icon 
                name={config?.icon} 
                size={24} 
                className={`${config?.iconColor} animate-pulse`} 
              />
            </div>
            
            {/* Message content */}
            <div className="flex-1 min-w-0">
              <p className={`${config?.text} font-medium leading-relaxed animate-fade-in`}>
                {message}
              </p>
            </div>
            
            {/* Dismiss button */}
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onDismiss, 300);
              }}
              className={`flex-shrink-0 p-1 rounded-lg transition-all duration-200 hover:bg-white/50 ${config?.iconColor} hover:scale-110`}
              aria-label="Dismiss notification"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-50">
          <div className={`absolute inset-0 rounded-2xl ${config?.progress} opacity-10 animate-pulse`} />
        </div>
      </div>
    </div>
  );
};

export default StatusMessage;