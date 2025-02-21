import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = "https://hub.snapshot.org/graphql";
const DateStrategyChange = 1704992400;

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
          flagged: false,
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
  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.title.includes("Ecosystem Proposal") ||
      proposal.title.includes("CVP Proposal") ||
      proposal.title.includes("CEG Program")
  );

  return filteredProposals.map((proposal) => {
    const scores_total = proposal.scores_total || 1;
    const score = proposal.scores?.[0] || 0;

    let approved = false;

    // Determine approval status
    if (proposal.start > DateStrategyChange) {
      if (
        proposal.title.includes("Infrastructure - LST") ||
        proposal.title.includes("Infrastructure - LSD")
      ) {
        if (score >= 50000 && proposal.votes >= 500) {
          approved = true;
        }
      } else if (score >= 10000 && proposal.votes >= 500) {
        approved = true;
      }
    } else {
      approved = true;
    }

    proposal.title = cleanProjectName(proposal.title);

    return {
      ...proposal,
      approved,
      formatted_score: (score / 1000).toFixed(1),
      yes: ((score * 100) / scores_total).toFixed(2),
    };
  });
}

function cleanProjectName(name: string): string {
  // Check for the "through" pattern first
  const throughMatch = name.match(
    /through\s+([^,]+?)(?:\s+(?:with|on|to|for|in|at|Chain|Protocol|Platform|Integration).*)?$/i
  );
  if (throughMatch) {
    return throughMatch[1].trim();
  }

  // Remove specific prefixes
  let cleaned = name
    .replace(
      /^(?:Ecosystem Proposal|CVP Proposal|CVP vote|CVP Episode \d+|May CVP vote week \d+|April CVP vote Part \d+)[:\s-]+/i,
      ""
    )
    .replace(/^(?:Metis CEG Program|Temperature Check)[:\s-]+/i, "")
    .replace(/^for\s+/, "")
    .replace(/^(?:The|A)\s+/, "");

  // Remove specific suffixes and extra information
  cleaned = cleaned
    .replace(/\s*(?:\(.*|\|.*|<.*|–.*|x\s*Metis.*|-\s*.*)\s*$/, "")
    .replace(/\s*[-—]\s*.*$/, "")
    .replace(/\s*revote\s*$/i, "")
    .replace(/^.*?:\s*/, "")
    .replace(/,.*$/, "")
    .replace(/\s+in\s+.*$/i, "")
    .replace(/\s+on\s+.*$/i, "")
    .replace(/\s+to\s+.*$/i, "")
    .replace(/\s+at\s+.*$/i, "");

  // Remove common suffixes
  const suffixes = [
    "Integration",
    "Platform",
    "Protocol",
    "Chain",
    "Metis",
    "GameFi",
    "with",
    "on",
    "for",
    "to",
    "The",
    "the",
  ];

  for (const suffix of suffixes) {
    const regex = new RegExp(`\\s+${suffix}\\s+.*$`, "i");
    cleaned = cleaned.replace(regex, "");
  }

  // Final cleanup
  return cleaned.replace(/\s+/g, " ").trim();
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
