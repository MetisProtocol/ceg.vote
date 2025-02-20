import React from "react";

interface NavigationProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm
              ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
