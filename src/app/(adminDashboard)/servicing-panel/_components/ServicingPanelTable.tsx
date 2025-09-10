"use client";
import { Image, Input, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { ArrowDownWideNarrowIcon, Search } from "lucide-react";

const statusColor = (status: string) => {
  switch (status) {
    case "Servicing Now":
      return "bg-[#E7FFE9] text-[#00C01F]";
    case "Next in line":
      return "bg-[#DEEBFF] text-[#1F10EF]";
    case "Upcoming":
      return "bg-[#FFEACC] text-[#C07000]";
    default:
      return "bg-[#000] text-[#fff]";
  }
};

const userType = [
  {
    text: "Servicing Now",
    value: "Servicing Now",
  },
  {
    text: "Next in line",
    value: "Next in line",
  },
  {
    text: "Upcoming",
    value: "Upcoming",
  },
];

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  status: string;
  stylistSalonName: string;
  serviceType: string;
  location: string;
};

const selectedRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * userType.length);
  return userType[randomIndex]?.value;
};

const data: TDataType[] = Array.from({ length: 10 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Robert Fox",
  email: "robert@gmail.com",
  date: "10 sep 2025",
  stylistSalonName: "Salon de Elegance",
  serviceType: "Box Braid",
  status: selectedRandomStatus(),
  location: "New York",
}));

const ServicingPanelTable = () => {
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      align: "center",
      render: (text) => (
        <div className="flex  justify-center items-center gap-x-1">
          <Image
            src={"/user_image1.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10"
          ></Image>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Stylist/Salon Name",
      dataIndex: "stylistSalonName",
      align: "center",
    },
    {
      title: "Service type",
      dataIndex: "serviceType",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
      align: "center",
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (text) => (
        <p className={`capitalize rounded ${statusColor(text)}`}>{text}</p>
      ),
      filters: userType,
      filterIcon: () => <ArrowDownWideNarrowIcon />,
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-2xl">
      <div className="flex justify-between items-center" >
        <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
          Servicing Now Panel
        </h1>
        <Input
          className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#d8d7d7]"
          placeholder="Search..."
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={8}></DataTable>
    </div>
  );
};

export default ServicingPanelTable;
