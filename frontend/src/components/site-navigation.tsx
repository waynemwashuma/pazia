"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/content/site";
import { cn } from "@/lib/cn";

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-center justify-start gap-1.5 lg:justify-end">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs text-muted sm:text-sm",
                  isActive
                    ? "bg-accent text-panel-ink"
                    : "hover:bg-white/10 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
