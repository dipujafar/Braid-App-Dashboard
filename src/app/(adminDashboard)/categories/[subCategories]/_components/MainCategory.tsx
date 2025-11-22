"use client";;
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Image } from "antd";


export default function MainCategory({ data, loading }: any) {
  if (loading) {
    return <Card className="flex flex-col items-center py-8">
      <CardContent className="flex flex-col items-center gap-4 w-full">

        {/* Icon Skeleton */}
        <Skeleton className="h-24 w-24 rounded-full" />

        {/* Category Name */}
        <Skeleton className="h-5 w-36" />

      </CardContent>

      <CardFooter className="flex gap-4">
        {/* Delete Button */}
        <Skeleton className="h-9 w-20 rounded-md" />

        {/* Edit Button */}
        <Skeleton className="h-9 w-20 rounded-md" />
      </CardFooter>
    </Card>
  }
  return (
    <div className="w-full lg:w-1/3 bg-[#F9F9FA] p-6">
      <Card className="px-4 py-8 flex flex-col items-center space-y-3 hover:shadow-md transition-shadow border-[#BBBBBB] ">
        <div className=" size-32 flex justify-center border-2 rounded-full border-main-color p-1.5">
          <Image
            src={data?.image}
            alt={data?.name}
            width={100}
            height={100}
            className="size-[100px] object-cover"
          />
        </div>

        <h3 className="text-xl font-medium text-gray-900 text-center">
          {data?.name}
        </h3>
      </Card>
    </div>
  )
}
