import { IconType } from "react-icons";
import { IoDocumentsOutline, IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";

export type MenuItem = {
  name: string;
  icon: IconType;
  href: string;
};

export const menuItems: MenuItem[] = [
  { name: "Notes", icon: IoDocumentsOutline, href: "/notes" },
  { name: "Practice", icon: IoBookmarkOutline, href: "/practice" },
  { name: "Dashboard", icon: MdOutlineDashboardCustomize, href: "/dashboard" },
];
