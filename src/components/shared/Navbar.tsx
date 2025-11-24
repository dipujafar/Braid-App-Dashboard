"use client";
import { Badge, Flex } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";

import Link from "next/link";
import { X } from "lucide-react";
import useGreeting from "@/hooks/useGreeting";
import { useAppSelector } from "@/redux/hooks";
import { useGetProfileQuery } from "@/redux/api/profileApi";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const greeting = useGreeting();
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetProfileQuery(undefined, { skip: !user });
  return (
    <div className="flex items-center justify-between w-[97%] font-poppins text-text-color xl:px-8 px-4">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          {collapsed ? (
            <X size={20} className="text-primary-gray" />
          ) : (
            <FaBars size={20} className="text-primary-gray" />
          )}
        </button>
        <div className="flex flex-col ">
          <h2 className="text-lg  font-medium">
            Dashboard
            <span className="block  text-sm font-normal">
              {greeting}, <span className="font-medium"> {data?.data?.fullName?.split(" ")[0] || data?.data?.fullName}</span>
            </span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>
        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center items-center size-12  rounded-full cursor-pointer relative">
            <IoNotificationsOutline size={28} color="#AB9D6E" />

            <Badge
              count={1}
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                position: "absolute",
                top: "-24px",
                right: "-8px",
              }}
            ></Badge>
          </div>
        </Link>


      </Flex>
    </div>
  );
};

export default Navbar;
