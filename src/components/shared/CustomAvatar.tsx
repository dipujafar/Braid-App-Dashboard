import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

const CustomAvatar = ({
  img,
  name,
  className,
  fallbackClass,
}: {
  img: any;
  name: string;
  className?: string;
  fallbackClass?: string;
}) => {
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={img?.src || img} className="object-cover"/>
      <AvatarFallback className={cn("bg-gray-300 text-3xl uppercase", fallbackClass)}>
        {name?.split(" ").length > 1 ? (
          <p>
            {name?.split(" ")[0].substring(0, 1)}
            {name?.split(" ")[1].substring(0, 1)}
          </p>
        ) : (
          name?.split(" ")[0].substring(0, 1)
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
