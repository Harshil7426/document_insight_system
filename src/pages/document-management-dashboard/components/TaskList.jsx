import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, selectedTaskId, onTaskSelect }) => {
  if (!tasks?.length) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center transform animate-pulse">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No Tasks Yet</h3>
          <p className="text-gray-500 leading-relaxed">
            Upload your documents and create your first analysis task to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl transform hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
              <p className="text-gray-600">Manage your document analysis workflows</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-blue-600">{tasks?.length} Active</span>
          </div>
        </div>
        
        {/* Animated underline */}
        <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full animate-pulse" />
      </div>

      {/* Task Cards Grid */}
      <div className="grid gap-6">
        {tasks?.map((task, index) => (
          <div 
            key={task?.id}
            className={`transform transition-all duration-500 hover:scale-[1.02] ${ 
              index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
            }`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <TaskCard
              task={task}
              isSelected={selectedTaskId === task?.id}
              onSelect={() => onTaskSelect(task?.id)}
              className="hover:shadow-2xl transition-all duration-300"
            />
          </div>
        ))}
      </div>
      
      {/* Bottom spacing for better UX */}
      <div className="h-8" />
    </div>
  );
};

export default TaskList;