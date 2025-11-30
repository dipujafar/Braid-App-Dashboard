"use client";
import { StatCard } from "@/components/shared/StatCard";
import React from "react";
import RequestsListTable from "./RequestsListTable";
import { Tabs, TabsProps } from "antd";
import FreelancerRequestTable from "./FreelancerRequestTable";
import { useGetStatQuery } from "@/redux/api/salonOwnerRequestApi";
import StatSkeleton from "./StatSkeleton";


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Salon Owner',
    children: <RequestsListTable />,
  },
  {
    key: '2',
    label: 'Freelancer',
    children: <FreelancerRequestTable />,
  },
];

export default function RequestsContainer() {
  const { data, isLoading } = useGetStatQuery({});
  console.log(data?.data?.stats);



  return (
    <div className="space-y-5">
      {
        isLoading ? <StatSkeleton /> : <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 `}>
          <StatCard
            title="Total Request"
            value={data?.data?.stats?.totalRequest?.count}
            className="bg-[#EDEEFC]"
          />
          <StatCard
            title="Pending Request"
            value={data?.data?.stats?.pendingRequest?.count}
            className="bg-[#E6F1FD]"
          />
          <StatCard
            title="Today Request"
            value={data?.data?.stats?.todayRequest?.count}
            className="bg-[#FFEFED]"
          />
        </div>
      }


      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
