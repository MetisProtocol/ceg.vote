import React from "react";

interface SummaryViewProps {
  firmData: Array<{
    company: string;
    price: string;
    timeframe: string;
  }>;
  setActiveTab: (tab: string) => void;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const SummaryView: React.FC<SummaryViewProps> = ({
  firmData,
  setActiveTab,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-0 mb-0">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Average Timeframe
            </th>
          </tr>
        </thead>
        <tbody>
          {firmData?.map((firm, index) => (
            <tr
              key={index}
              className="cursor-pointer"
              onClick={() => setActiveTab(firm.company)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {firm.company}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                {truncateText(firm.price || "N/A", 20)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                {truncateText(firm.timeframe || "N/A", 40)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryView;
