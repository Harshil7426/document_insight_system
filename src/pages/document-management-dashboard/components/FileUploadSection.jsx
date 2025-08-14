import React, { useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';

const FileUploadSection = ({ 
  title, 
  description, 
  files, 
  onFilesChange, 
  multiple = false,
  accept = ".pdf",
  className = "" 
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e?.dataTransfer?.files);
    const pdfFiles = droppedFiles?.filter(file => file?.type === 'application/pdf');
    
    if (multiple) {
      onFilesChange([...files, ...pdfFiles]);
    } else {
      onFilesChange(pdfFiles?.[0] || null);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e?.target?.files);
    const pdfFiles = selectedFiles?.filter(file => file?.type === 'application/pdf');
    
    if (multiple) {
      onFilesChange([...files, ...pdfFiles]);
    } else {
      onFilesChange(pdfFiles?.[0] || null);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    if (multiple) {
      const updatedFiles = files?.filter((_, index) => index !== indexToRemove);
      onFilesChange(updatedFiles);
    } else {
      onFilesChange(null);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef?.current?.click();
  };

  const hasFiles = multiple ? files?.length > 0 : files !== null;
  const displayFiles = multiple ? files : (files ? [files] : []);

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl p-6 transform transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 transform transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}`}>
              <Icon name={multiple ? "FolderOpen" : "FileText"} size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 transform ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50 scale-105 shadow-lg' 
              : isHovered
                ? 'border-blue-300 bg-blue-25 scale-[1.02]'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-25'
          }`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
        >
          {/* Animated upload icon */}
          <div className={`mb-4 transform transition-all duration-500 ${isDragOver ? 'scale-110 animate-bounce' : 'scale-100'}`}>
            <Icon 
              name="Upload" 
              size={48} 
              className={`mx-auto transition-colors duration-300 ${
                isDragOver ? 'text-blue-500' : 'text-gray-400'
              }`} 
            />
          </div>
          
          <div className="space-y-2">
            <p className={`font-semibold transition-colors duration-300 ${
              isDragOver ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {isDragOver ? 'Drop files here!' : 'Drag and drop file here'}
            </p>
            <p className="text-sm text-gray-500">
              or <span className="text-blue-500 hover:text-blue-600 font-medium">click to browse</span>
            </p>
            <p className="text-xs text-gray-400">
              {multiple ? 'Multiple PDF files supported' : 'Single PDF file only'}
            </p>
          </div>

          {/* Animated border effect */}
          <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
            isDragOver ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-10 animate-pulse" />
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Animated File Chips */}
        {hasFiles && (
          <div className="mt-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-700">
                Selected Files ({displayFiles?.length})
              </h4>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex-1 ml-4 animate-pulse" />
            </div>
            
            <div className="grid gap-3">
              {displayFiles?.map((file, index) => (
                <div
                  key={`${file?.name}-${index}`}
                  className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon name="FileText" size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{file?.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 group-hover:scale-110"
                    aria-label={`Remove ${file?.name}`}
                  >
                    <Icon name="X" size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;