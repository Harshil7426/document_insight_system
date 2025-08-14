import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ 
  onCreateTask, 
  onStartTask, 
  canCreateTask, 
  canStartTask, 
  isProcessing,
  className = ""
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${className}`}>
      {/* Upload Button */}
      <div className="relative group">
        <Button
          onClick={onCreateTask}
          disabled={!canCreateTask}
          className={`
            relative px-8 py-4 text-lg font-semibold rounded-xl transform transition-all duration-300
            ${canCreateTask 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-105 hover:shadow-xl text-white border-0' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
            ${!canCreateTask ? '' : 'animate-pulse hover:animate-none'}
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`transform transition-all duration-300 ${canCreateTask ? 'group-hover:scale-110 group-hover:rotate-12' : ''}`}>
              <Icon name="Upload" size={20} />
            </div>
            <span>Upload Documents</span>
          </div>
          
          {/* Animated background gradient for enabled state */}
          {canCreateTask && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          )}
        </Button>
        
        {/* Tooltip */}
        {!canCreateTask && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Upload both bulk and fresh PDFs to enable
          </div>
        )}
      </div>

      {/* Start Analysis Button */}
      <div className="relative group">
        <Button
          onClick={onStartTask}
          disabled={!canStartTask}
          className={`
            relative px-8 py-4 text-lg font-semibold rounded-xl transform transition-all duration-300
            ${canStartTask 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 hover:shadow-xl text-white border-0' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
            ${isProcessing ? 'animate-pulse' : ''}
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`transform transition-all duration-300 ${
              isProcessing ? 'animate-spin' : canStartTask ? 'group-hover:scale-110' : ''
            }`}>
              <Icon name={isProcessing ? "Loader2" : "Play"} size={20} />
            </div>
            <span>{isProcessing ? 'Processing...' : 'Start Analysis'}</span>
          </div>
          
          {/* Animated background gradient for enabled state */}
          {canStartTask && !isProcessing && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          )}
        </Button>
        
        {/* Tooltip */}
        {!canStartTask && !isProcessing && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Select a task to start analysis
          </div>
        )}
      </div>

      {/* Processing indicator */}
      {isProcessing && (
        <div className="flex items-center space-x-3 text-blue-600 animate-fade-in">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-150" />
        </div>
      )}
    </div>
  );
};

export default ActionButtons;