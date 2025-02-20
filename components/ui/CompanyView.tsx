import React from "react";
import { ExternalLink } from "lucide-react";

interface CompanyViewProps {
  companyData: Array<{
    Price: string;
    Timeframe: string;
    Contact: string;
    "Additional Incentives": string;
    Website: string;
    Process: string;
    Notes: string;
    Partners: string;
  }>;
}

const CompanyView: React.FC<CompanyViewProps> = ({ companyData }) => {
  if (!companyData || companyData.length === 0) return null;
  const data = companyData[0];

  return (
    <div className="rounded-lg shadow p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Pricing</h3>
            <p className="mt-1 text-gray-500">
              {data.Price || "Contact for pricing"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Timeframe</h3>
            <p className="mt-1 text-gray-500">
              {data.Timeframe || "Varies by project"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Contact</h3>
            <p className="mt-1 text-gray-500">
              {data.Contact || "See website"}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Additional Incentives</h3>
            <p className="mt-1 text-gray-500 whitespace-pre-line">
              {data["Additional Incentives"] || "None specified"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Website</h3>
            <p className="mt-1">
              {data.Website && (
                <span className="flex items-center">
                  <a href={data.Website} target="_blank" rel="noreferrer">
                    {data.Website}
                  </a>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Process</h3>
        <p className="mt-1 text-gray-500 whitespace-pre-line">
          {data.Process || "Contact firm for process details"}
        </p>
      </div>

      {data.Notes && (
        <div>
          <h3 className="text-lg font-medium">Additional Notes</h3>
          <p className="mt-1 text-gray-500 whitespace-pre-line">{data.Notes}</p>
        </div>
      )}

      {data.Partners && (
        <div>
          <h3 className="text-lg font-medium">Partners & Case Studies</h3>
          <p className="mt-1 text-gray-500 whitespace-pre-line">
            {data.Partners}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyView;
