import React from 'react';

interface ProjectHeaderProps {
  name: string;
  type: string;
  status: string;
  icon: React.ReactNode;
  iconBackgroundColor: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 rounded-md text-xs font-medium";
  const statusClasses = {
    'Active': 'bg-success-100 text-success-600 border border-success-300',
    'Pending': 'bg-warning-100 text-warning-600 border border-warning-300',
    'Closed': 'bg-gray-100 text-gray-600 border border-gray-300',
    'Sold Out': 'bg-error-100 text-error-600 border border-error-300',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status}
    </span>
  );
};

export default function ProjectHeader({ name, type, status, icon, iconBackgroundColor }: ProjectHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${iconBackgroundColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-sans">{name}</h1>
          <p className="text-lg text-gray-600 font-sans">{type}</p>
        </div>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}
