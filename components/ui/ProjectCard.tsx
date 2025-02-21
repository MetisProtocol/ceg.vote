import { Proposal } from "@/lib/const";

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
  return (
    <a
      href={proposal.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 no-underline"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {proposal.approved && (
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
                Approved
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {proposal.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p>
            <span className="font-medium">State:</span> {proposal.state}
          </p>
          <p>
            <span className="font-medium">Votes:</span> {proposal.votes}
          </p>
          <p>
            <span className="font-medium">Yes:</span> {proposal.formatted_score}
            K ({proposal.yes}%)
          </p>
          <p>
            <span className="font-medium">Start:</span>{" "}
            {new Date(proposal.start * 1000).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">End:</span>{" "}
            {new Date(proposal.end * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>
    </a>
  );
}
