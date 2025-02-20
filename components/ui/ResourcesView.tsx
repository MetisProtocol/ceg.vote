import React from "react";
import { ExternalLink } from "lucide-react";

interface ResourcesViewProps {
  resources: string[];
}

const ResourcesView: React.FC<ResourcesViewProps> = ({ resources }) => {
  return (
    <div className="rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
      <ul className="space-y-2">
        {resources?.map((resource, index) => (
          <li key={index} className="flex items-center">
            <span className="flex items-center">
              <a href={resource} target="_blank" rel="noreferrer">
                {resource}
              </a>
              <ExternalLink className="ml-1 h-4 w-4" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesView;
