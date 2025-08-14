import React from 'react';
import Input from '../../../components/ui/Input';

const ContextInputs = ({ persona, jobToBeDone, onPersonaChange, onJobChange, className = "" }) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div className="flex-1">
        <Input
          label="Persona"
          type="text"
          placeholder="e.g., Legal Analyst, Compliance Officer"
          value={persona}
          onChange={(e) => onPersonaChange(e?.target?.value)}
          description="Define the role or perspective for document analysis"
        />
      </div>
      <div className="flex-1">
        <Input
          label="Job to be Done"
          type="text"
          placeholder="e.g., Contract Review, Policy Comparison"
          value={jobToBeDone}
          onChange={(e) => onJobChange(e?.target?.value)}
          description="Specify the analysis objective or task purpose"
        />
      </div>
    </div>
  );
};

export default ContextInputs;