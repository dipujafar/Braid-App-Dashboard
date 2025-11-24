"use client";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { cn } from "@/lib/utils";
import { useGetAllSupportsQuery } from "@/redux/api/supportsApi";
import React, { useEffect, useState } from "react";
import SupportTableSkeleton from "./SupportTableSkeleton";
import moment from "moment";
import { Empty, Image } from "antd";
import PaginationSection from "@/components/shared/PaginationSection";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";


export default function SupportTable() {
  const selectedIdFromParams = useSearchParams().get("selectedId");
  const updateParams = useUpdateSearchParams();
  const [selectedSupport, setSelectedSupport] = useState("")
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "9";
  const queries: Record<string, string> = {};

  if (page) queries["page"] = page;
  if (limit) queries["limit"] = limit;
  const { data, isLoading } = useGetAllSupportsQuery(queries);

  useEffect(() => {
    if (selectedIdFromParams) {
      setSelectedSupport(selectedIdFromParams)
    } else {
      data?.data[0]?._id && setSelectedSupport(data?.data[0]?._id);
      updateParams({ selectedId: data?.data[0]?._id })
    }
  }, [data, selectedIdFromParams])

  if (isLoading) return <SupportTableSkeleton />
  if (data?.data.length === 0) return <div className="min-h-[calc(100vh-200px)] flex justify-center items-center"> <Empty /> </div>

  return (
    <div className="overflow-x-auto scroll-hide">
      <table className="w-full">
        <thead className="bg-[#C6BBE2]">
          <tr className="border-b border-gray-100">
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              NAME
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              EMAIL
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              PHONE
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.data.map((member: any) => (
            <DataRow key={member._id} data={member} selectedSupport={selectedSupport} />
          ))}
        </tbody>
      </table>
      <PaginationSection total={data?.meta?.totalDoc} current={data?.meta?.page} pageSize={data?.meta?.limit} />
    </div>
  );
}

// ----------------------------- data row ------------------------
const DataRow = ({ data, selectedSupport }: { data: any, selectedSupport: string }) => {
  const updateParams = useUpdateSearchParams();
  return (
    <tr onClick={() => updateParams({ selectedId: data?._id })} className={cn("hover:bg-gray-50 cursor-pointer", selectedSupport === data?._id && "bg-[#DCECED] hover:bg-[#DCECED]")}>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          {/* <CustomAvatar
            img={data?.image}
            name={data?.firstName}
            fallbackClass="text-lg text-gray-600"
          /> */}
          <Image src={data?.image} alt="profile-picture" width={40} height={40} className="size-10 object-cover origin-center rounded-full" />
          <span className="text-sm font-medium text-gray-900">
            {data?.firstName}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-900">{data?.email}</td>
      <td className="py-4 px-6 text-sm text-gray-900">{data?.phone}</td>
      <td className="py-4 px-6 text-sm text-gray-900">{moment(data?.createdAt).format("ll")}</td>
    </tr>
  );
};
