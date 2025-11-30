"use client";;
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import faviconLogo from "@/assets/image/faviconLogo.png";
import { navLinks } from "@/utils/navLinks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ProfileAvatar from "./ProfileAvatar";

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
      <ProfileAvatar collapsed={collapsed} />
      {
        <h1
          className={cn(
            "text-[#00000066] mb-4 ",
            collapsed ? "hidden" : "3px "
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
