import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = "https://hub.snapshot.org/graphql";
const DateStrategyChange = 1741737600;

interface Proposal {
  id: string;
  title: string;
  start: number;
  end: number;
  state: string;
  scores: number[];
  scores_total: number;
  link: string;
  votes: number;
  approved?: boolean;
  formatted_score?: string;
  yes?: string;
}

async function fetchProposals(): Promise<Proposal[]> {
  const query = `
    query {
      proposals(
        first: 1000,
        skip: 0,
        where: {
          space_in: ["metislayer2.eth"],
          labels_in: "f504ebf4"
        },
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        title
        start
        end
        state
        scores
        scores_total
        link
        votes
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return processProposalData(data.data.proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    throw new Error("Failed to fetch proposals from Snapshot");
  }
}

function processProposalData(proposals: Proposal[]): Proposal[] {
  return proposals.map((proposal) => {
    const scores_total = proposal.scores_total || 1;
    const score = proposal.scores?.[0] || 0;

    let approved = false;

    // Determine approval status
    if (proposal.end < DateStrategyChange) {
      if (score >= 10000 && proposal.votes >= 500) {
        approved = true;
      }
    } else {
      if (proposal.scores[2] < 5000) {
        approved = true;
      }
    }

    return {
      ...proposal,
      approved,
      formatted_score: (score / 1000).toFixed(1),
      yes: ((score * 100) / scores_total).toFixed(2),
    };
  });
}

// Export HTTP method handlers
export async function GET() {
  try {
    const proposals = await fetchProposals();
    return NextResponse.json(proposals);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch proposals" },
      { status: 500 }
    );
  }
}
