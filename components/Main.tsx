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
      <a
        href="https://projects.ceg.vote"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Block className="flex items-center justify-center gap-2 text-lg">
          <FaProjectDiagram className="h-6 w-6" />
          <span>Projects</span>
        </Block>
      </a>

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
