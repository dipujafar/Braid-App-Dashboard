"use client";
import { Avatar, Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import faviconLogo from "@/assets/image/faviconLogo.png";
import { navLinks } from "@/utils/navLinks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import avatarImg from "@/assets/image/profile.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronRight } from "lucide-react";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {
  const [current, setCurrent] = useState("dashboard");
  const currentPath = usePathname();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      localStorage.removeItem("activeNav");
      return;
    }
    localStorage.setItem("activeNav", e.key);
  };

  useEffect(() => {
    const activeKey = localStorage.getItem("activeNav");
    if (!activeKey) return;
    if (activeKey && currentPath !== "/dashboard") {
      setCurrent(activeKey as string);
    } else {
      setCurrent("dashboard");
    }
  }, []);

  return (
    <Sider
      width={240}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        paddingInline: `${collapsed ? "10px" : "15px"}`,
        backgroundColor: "var(--color-secondary)",
        maxHeight: "100vh",
        overflowY: "auto",
        minHeight: "100vh",

      }}
    >
      {/* =============== User Profile ===============  */}

      <Menubar className="py-8 border-none shadow-none px-0 border ">
        <MenubarMenu>
          <MenubarTrigger className="shadow-none px-0">
            <div
              className={cn(
                " text-black flex items-center gap-x-1 cursor-pointer",
                collapsed && "flex-col"
              )}
            >
              <Avatar
                src={avatarImg.src}
                size={40}
                className="border border-main-color size-12"
              ></Avatar>
              <h4
                className={cn(
                  "text-base font-medium truncate flex-1",
                  collapsed && "hidden"
                )}
              >
                Istiak Ahmedh
              </h4>
            </div>
          </MenubarTrigger>
          <MenubarContent className="text-primary-gray">
            <Link href={"/personal-information"}>
            <MenubarItem className="hover:bg-gray-100 cursor-pointer">
              Profile{" "}
              <MenubarShortcut>
                <ChevronRight size={16} />
              </MenubarShortcut>
            </MenubarItem>
            </Link>
            <MenubarSeparator />
            <Link href={"/login"}>
              <MenubarItem className="hover:bg-gray-100 cursor-pointer">Logout</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {
        <h1
          className={cn(
            "text-[#00000066] mb-4",
            collapsed ? "5px text-[10px]" : "3px "
          )}
        >
          Dashboards
        </h1>
      }
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[current]}
        mode="inline"
        className="sidebar-menu text-lg bg-main-color !mt-1"
        items={navLinks}
      />
      <div className="fixed    bottom-1 flex justify-center items-center px-2">
        <div className="py-2 flex flex-col justify-center items-center gap-y-5 ">
          <Link href={"/"}>
            <Image
              src={faviconLogo}
              alt="logo_Image"
              className={cn(`lg:px-1 `, collapsed && "hidden")}
            />
          </Link>
          <Link href={"/"}>
            <Image
              src={faviconLogo}
              alt="logo_Image"
              className={cn(`lg:px-1`, !collapsed && "hidden")}
            />
          </Link>
        </div>
      </div>
    </Sider>
  );
};

export default SidebarContainer;
