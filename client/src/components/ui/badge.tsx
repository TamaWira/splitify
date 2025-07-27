type BadgeProps = {
  children: React.ReactNode;
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
};

export function Badge({ children, variant }: BadgeProps) {
  const variants = {
    primary: "bg-hue-blue text-primary-blue",
    secondary: "bg-hue-gray text-primary-gray",
    success: "bg-hue-green text-primary-green",
    danger: "bg-hue-red text-danger-red",
    warning: "bg-hue-yellow text-primary-yellow",
    info: "bg-hue-cyan text-info-cyan",
    light: "bg-hue-white text-light-white",
    dark: "bg-hue-black text-dark-black",
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </div>
  );
}
