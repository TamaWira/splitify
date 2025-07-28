import { NavbarWithBackButton } from "@/components/shared/navbar-with-back-button";

type GroupDetailProps = {
  title: string;
};

export function GroupDetailNavbar({ title }: GroupDetailProps) {
  return (
    <NavbarWithBackButton backHref="/">
      <h1>{title}</h1>
    </NavbarWithBackButton>
  );
}
