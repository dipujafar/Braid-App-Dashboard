import { RiDashboardHorizontalFill, RiLogoutCircleLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import {
  BadgePlus,
  CalendarFold,
  Car,
  CarFront,
  CarTaxiFront,
  GitPullRequestCreateArrow,
  Megaphone,
  Menu,
  MessageSquareMore,
  NotepadText,
  ServerCog,
  SquareMenu,
  SquareTerminal,
  User,
  Users,
  UsersRound,
  Wallet,
  WalletCards,
} from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "categories",
    icon: <NotepadText size={18} />,
    label: <Link href={"/categories"}>Category</Link>,
  },
  {
    key: "requests",
    icon: <GitPullRequestCreateArrow size={18} />,
    label: <Link href={"/requests"}>Requests</Link>,
  },
  {
    key: "earning",
    icon: <Wallet size={18} />,
    label: <Link href={"/earning"}>Earning</Link>,
  },
  {
    key: "users",
    icon: <GoPeople size={18} />,
    label: <Link href={"/users"}>Users</Link>,
  },
  {
    key: "salon-owner",
    icon: <Users size={18} />,
    label: <Link href={"/salon-owner"}>Salon Owner</Link>,
  },
  {
    key: "freelance-braider",
    icon: <GoPeople size={18} />,
    label: <Link href={"/freelance-braider"}>Freelance Braider</Link>,
  },
  {
    key: "booking-services",
    icon: <CalendarFold size={18} />,
    label: <Link href={"/booking-services"}>Booking Services</Link>,
  },
  {
    key: "servicing-panel",
    icon: <ServerCog size={18} />,
    label: <Link href={"/servicing-panel"}>Servicing Panel</Link>,
  },

  {
    key: "support",
    icon: <MessageSquareMore size={18} />,
    label: <Link href={"/support"}>Support</Link>,
  },
  {
    key: "announcements",
    icon: <Megaphone size={18} />,
    label: <Link href={"/announcements"}>Announcements</Link>,
  },

  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
];
