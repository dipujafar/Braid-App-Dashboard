"use client";
import { StatCard } from "@/components/shared/StatCard";
import React from "react";
import RequestsListTable from "./RequestsListTable";
import { Tabs, TabsProps } from "antd";


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Salon Owner',
    children: <RequestsListTable />,
  },
  {
    key: '2',
    label: 'Freelancer',
    children: <RequestsListTable />,
  },
];

export default function RequestsContainer() {
  return (
    <div className="space-y-5">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 `}>
        <StatCard
          title="Total Request"
          value="5,000"
          change={{ value: "+11.03%", positive: true }}
          className="bg-[#EDEEFC]"
        />
        <StatCard
          title="Pending Request"
          value="2,000"
          change={{ value: "+15.03%", positive: true }}
          className="bg-[#E6F1FD]"
        />
        <StatCard
          title="Today Request"
          value="2,000"
          change={{ value: "-5.03%", positive: false }}
          className="bg-[#FFEFED]"
        />
      </div>

      <Tabs defaultActiveKey="1" items={items} style={{width: "100%", border: "2px red solid"}} />
      <RequestsListTable />
    </div>
  );
}
