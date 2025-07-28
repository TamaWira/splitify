import Link from "next/link";
import { Button } from "../ui/button";

type PrimaryButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | "link";
  href?: string;
  className?: string;
};

export function PrimaryButton({
  children,
  type,
  href,
  className,
}: PrimaryButtonProps) {
  return (
    <Button
      type={type !== "link" ? type : undefined}
      asChild={type === "link"}
      className={`bg-primary-green text-white px-4 py-2 rounded-md hover:bg-primary-green-dark ${className}`}
    >
      {type === "link" ? (
        <Link href={href!} className="text-white">
          {children}
        </Link>
      ) : (
        children
      )}
    </Button>
  );
}
