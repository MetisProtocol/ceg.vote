import Block from "@/components/ui/block";
import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Main() {
  return (
    <section>
      <div className="flex flex-col gap-4">
        <HeaderBlock />
        <PodcastBlock />
        <SocialsBlock />
      </div>
    </section>
  );
}

function HeaderBlock() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Welcome to Community Ecosystem Governance</CardTitle>
      </CardHeader>
      <CardContent>
        CEG is the governance platform for the Metis Network.
      </CardContent>
    </Card>
  );
}

function SocialsBlock() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Link href="/docs/projects">
        <Block className="flex items-center justify-center gap-2 text-lg">
          <FaProjectDiagram className="h-6 w-6" />
          <span>Projects</span>
        </Block>
      </Link>

      <a
        href="https://proposals.ceg.vote"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Block className="flex items-center justify-center gap-2 text-lg">
          <MdHowToVote className="h-6 w-6" />
          <span>Proposals</span>
        </Block>
      </a>

      <a
        href="https://forum.ceg.vote"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Block className="flex items-center justify-center gap-2 text-lg">
          <BsFillChatSquareTextFill className="h-6 w-6" />
          <span>Forum</span>
        </Block>
      </a>

      <Link href="/docs">
        <Block className="flex items-center justify-center gap-2 text-lg">
          <IoDocumentTextOutline className="h-6 w-6" />
          <span>Docs</span>
        </Block>
      </Link>
    </div>
  );
}

function PodcastBlock() {
  return (
    <iframe
      title="Episode 3: Transition to Optimistic Quorum"
      height="300"
      width="100%"
      style={{ border: "none", minWidth: "min(100%, 430px)", height: "300px;" }}
      data-name="pb-iframe-player"
      src="https://www.podbean.com/player-v2/?i=bp6i8-183e22c-pb&from=pb6admin&square=1&share=1&download=1&rtl=0&fonts=Arial&skin=f6f6f6&font-color=auto&logo_link=episode_page&btn-skin=60a0c8&size=300"
      loading="lazy"
    />
  );
}
