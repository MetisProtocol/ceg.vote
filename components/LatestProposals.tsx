import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GRAPHQL_ENDPOINT = "https://hub.snapshot.org/graphql";
const SPACE = "metislayer2.eth";
const SPACE_URL = `https://snapshot.box/#/s:${SPACE}`;
const COUNT = 3;

interface SnapshotProposal {
  id: string;
  title: string;
  start: number;
  end: number;
  state: string;
  link: string;
  votes: number;
}

async function fetchLatestProposals(): Promise<SnapshotProposal[] | null> {
  const query = `
    query {
      proposals(
        first: ${COUNT},
        where: { space_in: ["${SPACE}"] },
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        title
        start
        end
        state
        link
        votes
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      next: { revalidate: 600 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data?.proposals ?? null;
  } catch (error) {
    console.error("Error fetching latest proposals:", error);
    return null;
  }
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function describe(p: SnapshotProposal) {
  if (p.state === "active") return `Voting open, ends ${formatDate(p.end)}`;
  if (p.state === "pending") return `Voting starts ${formatDate(p.start)}`;
  return `Closed ${formatDate(p.end)}`;
}

export default async function LatestProposals() {
  const proposals = await fetchLatestProposals();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Latest proposals</CardTitle>
      </CardHeader>
      <CardContent>
        {proposals && proposals.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border dark:divide-darkBorder">
            {proposals.map((p) => (
              <li key={p.id} className="py-3">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                >
                  {p.title}
                </a>
                <p className="mt-1 text-sm text-text/70 dark:text-darkText/70">
                  {p.state === "active" && (
                    <span className="mr-2 rounded bg-green-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                      Live
                    </span>
                  )}
                  {describe(p)} · {p.votes} votes
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">Proposals could not be loaded right now.</p>
        )}
        <a
          href={SPACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold hover:underline"
        >
          All proposals on Snapshot →
        </a>
      </CardContent>
    </Card>
  );
}
