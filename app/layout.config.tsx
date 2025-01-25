import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <img
          src="/assets/metis-logo.png"
          alt="Logo"
          width={24}
          height={24}
          style={{ width: 24, height: 24 }}
        />
        CEG.vote
      </>
    ),
    transparentMode: "none",
    url: "https://ceg.vote",
  },
  links: [
    {
      label: "X",
      url: "https://x.com/MetisGovernance",
      type: "icon",
      icon: <FaXTwitter />,
      text: "",
    },
    {
      label: "X",
      url: "https://github.com/MetisProtocol/ceg.vote",
      type: "icon",
      icon: <FaGithub />,
      text: "",
    },
  ],
};
