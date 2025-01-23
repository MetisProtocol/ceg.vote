import { twMerge } from "tailwind-merge";
import type { HTMLAttributes } from "react";

interface BlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Block({ className, ...rest }: BlockProps) {
  return (
    <div
      className={twMerge(
        "relative inline-block text-xl text-white bg-[#51A3B8] rounded-lg shadow-[0px_7px_0px_#387796] top-0 p-5 active:top-[3px] active:shadow-[0px_2px_0px_#387796] transition-all duration-200",
        className
      )}
      {...rest}
    ></div>
  );
}
export default Block;
