"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS } from "./NavigationData";
import { scrollToRegisterForm } from "./CTAButtons";

type MobileNavProps = {
  onClose: () => void;
};

function MobileNavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function MobileNav({ onClose }: MobileNavProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-black/5 border-t bg-neutral-50 py-4 lg:hidden dark:border-white/5 dark:bg-black/3">
      <nav className="flex flex-col gap-2">
        {NAVIGATION_ITEMS.map((item) =>
          item.href ? (
            <MobileNavLink
              className="flex w-full items-center justify-between rounded-md px-3 py-2 font-medium text-black/80 text-sm transition-colors hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
              href={item.href}
              key={item.name}
              onClick={onClose}
            >
              {item.name}
            </MobileNavLink>
          ) : (
            <div key={item.name}>
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 font-medium text-black/80 text-sm transition-colors hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === item.name ? null : item.name
                  )
                }
                type="button"
              >
                {item.name}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === item.name ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === item.name && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.categories
                    ? item.categories.map((category) => (
                        <div className="py-1" key={category.name}>
                          <div className="px-3 py-1">
                            <span className="font-medium text-black/40 text-xs uppercase tracking-tight dark:text-white/40">
                              {category.name}
                            </span>
                          </div>
                          {category.items.map((subItem) => (
                            <MobileNavLink
                              className="flex items-center justify-between rounded-md px-3 py-2 text-black/70 text-sm tracking-tight transition-colors hover:bg-black/5 hover:text-black/80 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white/80"
                              href={subItem.href}
                              key={subItem.name}
                              onClick={onClose}
                            >
                              <span>{subItem.name}</span>
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4 text-black/30 dark:text-white/30" />
                              )}
                            </MobileNavLink>
                          ))}
                        </div>
                      ))
                    : item.items?.map((subItem) => (
                        <MobileNavLink
                          className="flex items-center justify-between rounded-md px-3 py-2 text-black/70 text-sm tracking-tight transition-colors hover:bg-black/5 hover:text-black/80 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white/80"
                          href={subItem.href}
                          key={subItem.name}
                          onClick={onClose}
                        >
                          <span>{subItem.name}</span>
                          {subItem.icon && (
                            <subItem.icon className="h-4 w-4 text-black/30 dark:text-white/30" />
                          )}
                        </MobileNavLink>
                      ))}
                </div>
              )}
            </div>
          )
        )}
        <div className="mt-4 px-3">
          <Button
            className="w-full rounded-lg bg-[#A8F1F7] font-medium text-neutral-900 text-sm tracking-tighter shadow-sm transition-all hover:bg-[#A8F1F7]/80 dark:bg-[#A8F1F7] dark:text-neutral-900 dark:hover:bg-[#A8F1F7]/80"
            size="sm"
            onClick={() => {
              onClose();
              scrollToRegisterForm();
            }}
          >
            Register Your Agent
          </Button>
        </div>
      </nav>
    </div>
  );
}
