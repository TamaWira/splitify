import { NavbarContainer } from "../../shared/navbar-container";

export function HomeNavbar() {
  return (
    <div className="absolute top-0 left-0 right-0">
      <NavbarContainer>
        <div className="flex items-center">
          <p className="text-primary-green font-semibold text-2xl">SplitBill</p>
        </div>
      </NavbarContainer>
    </div>
  );
}
