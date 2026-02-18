"use client";;
import Link from "next/link";
import avatarImg from "@/assets/image/profile.png";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Image } from "antd";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
export default function ProfileAvatar({ collapsed }: { collapsed: boolean }) {
    const user = useAppSelector((state) => state.auth.user);
    const { data } = useGetProfileQuery(undefined, { skip: !user });
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <Menubar className="py-8 border-none shadow-none px-0 border ">
            <MenubarMenu>
                <MenubarTrigger className="shadow-none px-0">
                    <div
                        className={cn(
                            " text-black flex justify-center items-center gap-x-1 cursor-pointer",
                            collapsed && "flex-col"
                        )}
                    >
                        {data?.data?.image ? <Image
                            src={data?.data?.image}
                            alt="user_image"
                            width={40}
                            height={40}
                            className="rounded-full"
                        /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{data?.data?.fullName?.charAt(0)} </AvatarFallback></Avatar>
                        }
                        <h4
                            className={cn(
                                "text-base font-medium truncate flex-1 line-clamp-1",
                                collapsed && "hidden"
                            )}
                        >
                            {data?.data?.fullName}
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
                    <p>
                        <MenubarItem onClick={() => { dispatch(logout()); router.refresh(); }} className="hover:bg-gray-100 cursor-pointer">Logout</MenubarItem>
                    </p>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
