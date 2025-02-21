"use client";

import { useState, useEffect } from "react";
import FilterSidebar from "../ui/FilterSidebar";
import ProjectList from "../ui/ProjectList";

export default function Proposals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showApproved, setShowApproved] = useState(false);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await fetch("/api/proposals");
      const data = await response.json();
      setProposals(data);
    };

    fetchProposals();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showApproved={showApproved}
            setShowApproved={setShowApproved}
          />
          <ProjectList
            proposals={proposals}
            searchQuery={searchQuery}
            showApproved={showApproved}
          />
        </div>
      </div>
    </section>
  );
}
