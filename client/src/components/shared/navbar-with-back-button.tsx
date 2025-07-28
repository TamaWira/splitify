import { ArrowLeft } from "lucide-react";
import { NavbarContainer } from "./navbar-container";
import Link from "next/link";

type NavbarWithBackButtonProps = {
  children: React.ReactNode;
  backHref: string;
};

export function NavbarWithBackButton({
  children,
  backHref,
}: NavbarWithBackButtonProps) {
  return (
    <div className="absolute top-0 left-0 right-0 font-bold text-xl">
      <NavbarContainer>
        <Link href={backHref}>
          <ArrowLeft size={18} />
        </Link>
        {children}
      </NavbarContainer>
    </div>
  );
}
