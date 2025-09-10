"use client";
import {
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { ArrowDownWideNarrowIcon, Eye, Search } from "lucide-react";
import SalonOwnerDetails from "@/components/modals/SalonOwnerDetails/SalonOwnerDetails";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  availability: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Muskan Tanaz",
  email: "muskantanaz@gmail.com",
  date: "10 Aug 25, 11.10PM",
  type: "User",
  availability: inx % 2 === 0 ? "Online" : "Offline",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the salon owner");
};

const SalonOwnerTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
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
    },

    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Available",
      dataIndex: "availability",
      render: (text) => (
        <div className="text-text-color">
          {text === "Online" ? (
            <div className="flex items-center gap-x-1">
              <span className="size-2 flex-shrink-0 bg-green-500 rounded-full"></span> Online
            </div>
          ) : (
            <div className="flex items-center gap-x-1">  <span className="size-2 flex-shrink-0 bg-red-500 rounded-full"></span> Offline </div>
          )}
        </div>
      ),
      filters: [
        {
          text: "Online",
          value: "Online",
        },
        {
          text: "Offline",
          value: "Offline",
        },
      ],
      filterIcon: () => (
        <ArrowDownWideNarrowIcon
          className="flex justify-start items-start"
          color="#646786"
        />
      ),
      onFilter: (value, record) =>
        record.availability.indexOf(value as string) === 0,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="flex gap-2">
          <Eye size={22} color="#138487" onClick={() => setOpen(!open)} className="cursor-pointer" />
          <Popconfirm
            title="Block the Salon Owner"
            description="Are you sure to block this salon owner?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <CgUnblock size={22} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-md">
      <div className="flex justify-between items-center px-3 py-5">
        <h1 className="  text-2xl text-text-color">Salon Owners</h1>
        <Input
          className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#d8d7d7]"
          placeholder="Search Salon Owner..."
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={11}></DataTable>
      <SalonOwnerDetails open={open} setOpen={setOpen}></SalonOwnerDetails>
    </div>
  );
};

export default SalonOwnerTable;
