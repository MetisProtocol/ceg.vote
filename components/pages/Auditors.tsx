"use client";
import { useState, useEffect } from "react";
import Navigation from "@/components/ui/Navigation";
import SummaryView from "@/components/ui/SummaryView";
import CompanyView from "@/components/ui/CompanyView";
import ResourcesView from "@/components/ui/ResourcesView";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface FirmData {
  [key: string]: Array<
    | {
        company?: string;
        price?: string;
        timeframe?: string;
        Price?: string;
        Timeframe?: string;
        Contact?: string;
        "Additional Incentives"?: string;
        Website?: string;
        Process?: string;
        Notes?: string;
        Partners?: string;
      }
    | string
  >;
}

export default function Auditors() {
  const [activeTab, setActiveTab] = useState("Summary");
  const [firmData, setFirmData] = useState<FirmData>({});
  const [disclaimer, setDisclaimer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auditors");
        const data = await response.json();
        setFirmData(data.sheets);
        setDisclaimer(data.disclaimer);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const tabs = [
    "Summary",
    ...Object.keys(firmData).filter(
      (key) =>
        key !== "Summary" &&
        key !== "Other Resources" &&
        firmData[key]?.length > 0
    ),
    "Other Resources",
  ];

  return (
    <main className="min-h-screen">
      <div className="space-y-6 p-6 max-w-6xl mx-auto">
        {disclaimer && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4">
            <p className="text-sm text-blue-700">{disclaimer}</p>
          </div>
        )}

        <Navigation
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="mt-6">
          {activeTab === "Summary" && (
            <SummaryView
              firmData={firmData["Summary"]?.filter(
                (
                  item
                ): item is {
                  company: string;
                  price: string;
                  timeframe: string;
                } => typeof item !== "string"
              )}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "Other Resources" && (
            <ResourcesView
              resources={firmData["Other Resources"] as string[]}
            />
          )}
          {activeTab !== "Summary" && activeTab !== "Other Resources" && (
            <CompanyView
              companyData={firmData[activeTab]?.filter(
                (
                  item
                ): item is {
                  Price: string;
                  Timeframe: string;
                  Contact: string;
                  "Additional Incentives": string;
                  Website: string;
                  Process: string;
                  Notes: string;
                  Partners: string;
                } => typeof item !== "string"
              )}
            />
          )}
        </div>
      </div>
    </main>
  );
}
