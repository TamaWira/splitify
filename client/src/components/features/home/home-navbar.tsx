import { Logo } from "@/components/shared/logo";
import { NavbarContainer } from "../../shared/navbar-container";

export function HomeNavbar() {
  return (
    <div className="top-0 right-0 left-0 absolute">
      <NavbarContainer>
        <div className="flex items-center gap-3">
          <Logo />
          <p className="font-semibold text-primary-green text-2xl">Billo</p>
        </div>
      </NavbarContainer>
    </div>
  );
}
