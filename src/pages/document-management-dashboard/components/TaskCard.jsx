import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TaskCard = ({ task, isSelected, onSelect, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (size) => {
    return (size / 1024 / 1024)?.toFixed(2);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return { name: 'CheckCircle', color: 'text-emerald-500' };
      case 'processing': return { name: 'Loader2', color: 'text-blue-500 animate-spin' };
      default: return { name: 'Clock', color: 'text-amber-500' };
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      created: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Ready' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Processing' },
      completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Completed' }
    };
    return badges?.[status] || badges?.created;
  };

  const statusIcon = getStatusIcon(task?.status);
  const statusBadge = getStatusBadge(task?.status);

  return (
    <div
      className={`
        relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
        ${isSelected 
          ? 'border-blue-500 shadow-xl ring-4 ring-blue-100 scale-[1.02]' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
        }
        ${className}
      `}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 transition-opacity duration-300 ${
        isSelected || isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse" />
      )}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 transform transition-all duration-300 ${
                isHovered ? 'scale-110 rotate-3' : 'scale-100'
              }`}>
                <Icon name="FileText" size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 truncate">{task?.name}</h3>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(task?.timestamp)}</span>
              </span>
              {task?.completedAt && (
                <span className="flex items-center space-x-1 text-emerald-600">
                  <Icon name="CheckCircle" size={14} />
                  <span>Completed {formatDate(task?.completedAt)}</span>
                </span>
              )}
            </div>
          </div>
          
          {/* Status badge */}
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusBadge?.bg} transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
            <Icon name={statusIcon?.name} size={14} className={statusIcon?.color} />
            <span className={`text-sm font-medium ${statusBadge?.text}`}>
              {statusBadge?.label}
            </span>
          </div>
        </div>

        {/* Files Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bulk Files */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-purple-100 rounded">
                <Icon name="FolderOpen" size={16} className="text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-700">Bulk Files</h4>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                {task?.bulkFiles?.length}
              </span>
            </div>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {task?.bulkFiles?.map((file, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 transform ${
                    isHovered ? 'translate-x-1' : 'translate-x-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Icon name="FileText" size={14} className="text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 truncate font-medium">{file?.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file?.size)} MB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fresh File */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-emerald-100 rounded">
                <Icon name="FileText" size={16} className="text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-700">Fresh PDF</h4>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                1
              </span>
            </div>
            
            {task?.freshFile && (
              <div className={`flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform ${
                isHovered ? 'translate-x-1 scale-105' : 'translate-x-0 scale-100'
              }`}>
                <Icon name="FileText" size={14} className="text-red-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate font-medium">{task?.freshFile?.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(task?.freshFile?.size)} MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selection indicator at bottom */}
        {isSelected && (
          <div className="mt-4 pt-4 border-t border-blue-200 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Selected for Analysis</span>
            </div>
          </div>
        )}
      </div>
      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 transition-opacity duration-300 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default TaskCard;