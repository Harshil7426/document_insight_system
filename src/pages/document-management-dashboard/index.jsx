import React, { useState, useEffect } from 'react';
import FileUploadSection from './components/FileUploadSection';
import TaskList from './components/TaskList';
import ActionButtons from './components/ActionButtons';
import StatusMessage from './components/StatusMessage';

const DocumentManagementDashboard = () => {
  // File upload states
  const [bulkFiles, setBulkFiles] = useState([]);
  const [freshFile, setFreshFile] = useState(null);
  
  // Task management states
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // UI states
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('documentTasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading saved tasks:', error);
      }
    }
    // Add loading animation delay
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks?.length > 0) {
      localStorage.setItem('documentTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Mock task data for demonstration
  const mockTasks = [
    {
      id: 'task-1',
      name: 'Contract Analysis Task',
      bulkFiles: [
        { name: 'contract_template_v1.pdf', size: 245760 },
        { name: 'legal_framework.pdf', size: 512000 },
        { name: 'compliance_guide.pdf', size: 389120 }
      ],
      freshFile: { name: 'new_contract_draft.pdf', size: 198400 },
      timestamp: Date.now() - 3600000,
      status: 'created'
    },
    {
      id: 'task-2',
      name: 'Policy Comparison Task',
      bulkFiles: [
        { name: 'hr_policy_2023.pdf', size: 156800 },
        { name: 'employee_handbook.pdf', size: 445440 }
      ],
      freshFile: { name: 'updated_policy_draft.pdf', size: 167936 },
      timestamp: Date.now() - 7200000,
      status: 'created'
    }
  ];

  // Initialize with mock data if no tasks exist
  useEffect(() => {
    if (tasks?.length === 0) {
      setTasks(mockTasks);
    }
  }, []);

  const showStatusMessage = (type, message, duration = 5000) => {
    setStatusMessage({ type, message });
    setTimeout(() => {
      setStatusMessage({ type: '', message: '' });
    }, duration);
  };

  const validateTaskCreation = () => {
    if (bulkFiles?.length === 0) {
      showStatusMessage('error', 'Please upload at least one bulk PDF file.');
      return false;
    }
    if (!freshFile) {
      showStatusMessage('error', 'Please upload a fresh PDF file.');
      return false;
    }
    return true;
  };

  const handleCreateTask = () => {
    if (!validateTaskCreation()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      name: `Document Analysis Task - ${new Date()?.toLocaleDateString()}`,
      bulkFiles: [...bulkFiles],
      freshFile: { ...freshFile },
      timestamp: Date.now(),
      status: 'created'
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Clear form after successful creation
    setBulkFiles([]);
    setFreshFile(null);
    
    showStatusMessage('success', `Task "${newTask?.name}" created successfully!`);
  };

  const handleStartTask = async () => {
    if (!selectedTaskId) {
      showStatusMessage('error', 'Please select a task to start analysis.');
      return;
    }

    const selectedTask = tasks?.find(task => task?.id === selectedTaskId);
    if (!selectedTask) {
      showStatusMessage('error', 'Selected task not found.');
      return;
    }

    setIsProcessing(true);
    showStatusMessage('info', `Starting analysis for "${selectedTask?.name}"...`);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      showStatusMessage('success', `Analysis completed for "${selectedTask?.name}". Results are ready for review.`);
      
      // Update task status
      setTasks(prevTasks => 
        prevTasks?.map(task => 
          task?.id === selectedTaskId 
            ? { ...task, status: 'completed', completedAt: Date.now() }
            : task
        )
      );
    }, 3000);
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  const canCreateTask = bulkFiles?.length > 0 && freshFile;
  const canStartTask = selectedTaskId && !isProcessing;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Animated Header */}
        <div className={`text-center mb-12 transform transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-pulse">
              Document Intelligence Hub
            </h1>
            <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-lg blur-xl -z-10 animate-pulse"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your document analysis workflow with intelligent PDF processing and comparison
          </p>
        </div>

        {/* Status Message */}
        <div className={`transition-all duration-500 ${statusMessage?.message ? 'mb-8' : 'mb-0'}`}>
          {statusMessage?.message && (
            <StatusMessage
              type={statusMessage?.type}
              message={statusMessage?.message}
              onDismiss={() => setStatusMessage({ type: '', message: '' })}
            />
          )}
        </div>

        {/* File Upload Sections */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 transform transition-all duration-700 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <FileUploadSection
              title="Bulk PDFs"
              description="Upload multiple PDF documents for comprehensive analysis"
              files={bulkFiles}
              onFilesChange={setBulkFiles}
              multiple
              className="h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 border-2 hover:border-blue-200"
            />
          </div>
          
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <FileUploadSection
              title="Fresh PDF"
              description="Upload a single fresh PDF document to compare against bulk files"
              files={freshFile}
              onFilesChange={setFreshFile}
              className="h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 border-2 hover:border-indigo-200"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`transform transition-all duration-700 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <ActionButtons
            onCreateTask={handleCreateTask}
            onStartTask={handleStartTask}
            canCreateTask={canCreateTask}
            canStartTask={canStartTask}
            isProcessing={isProcessing}
            className="mb-12"
          />
        </div>

        {/* Task List */}
        <div className={`transform transition-all duration-700 delay-800 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <TaskList
            tasks={tasks}
            selectedTaskId={selectedTaskId}
            onTaskSelect={handleTaskSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentManagementDashboard;