import type { AnchorHTMLAttributes, ReactNode } from "react";
import { navigate, useLocation } from "@/lib/navigation";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children: ReactNode;
  activeProps?: { className?: string };
  activeOptions?: { exact?: boolean };
};

export function Link({
  to,
  children,
  className = "",
  activeProps,
  activeOptions,
  onClick,
  ...props
}: LinkProps) {
  const { pathname } = useLocation();
  const isActive =
    activeOptions?.exact || to === "/"
      ? pathname === to
      : pathname === to || pathname.startsWith(`${to}/`);
  const resolvedClassName = [className, isActive ? activeProps?.className : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={to}
      className={resolvedClassName}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey
        ) {
          return;
        }

        event.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
