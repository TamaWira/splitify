type NavbarContainerProps = {
  children: React.ReactNode;
};

export function NavbarContainer({ children }: NavbarContainerProps) {
  return (
    <header className="h-[50px] bg-white w-full shadow px-5 flex items-center">
      {children}
    </header>
  );
}
