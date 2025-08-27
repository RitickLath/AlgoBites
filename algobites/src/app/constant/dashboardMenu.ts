interface IDashboard {
  name: string;
  href: string;
}

export const dashboardMenu: IDashboard[] = [
  { name: "Overview", href: "/dashboard" },
  { name: "Progress", href: "/dashboard/progress" },
  { name: "Stats", href: "/dashboard/stats" },
];
