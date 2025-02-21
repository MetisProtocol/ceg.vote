import { ProjectListProps, Proposal } from "@/lib/const";
import ProposalCard from "./ProjectCard";

export default function ProjectList({
  proposals,
  searchQuery,
  showApproved,
}: ProjectListProps) {
  const filteredProposals = proposals.filter((proposal: Proposal) => {
    const matchesSearchQuery = proposal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesApprovedFilter = showApproved ? proposal.approved : true;
    return matchesSearchQuery && matchesApprovedFilter;
  });

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
