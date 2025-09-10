"use client";
import { Image, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { ArrowDownWideNarrowIcon, Eye } from "lucide-react";

import RequestModal from "@/components/modals/RequestModal";

const userType = [
  {
    text: "Freelancer",
    value: "Freelancer",
  },
  {
    text: "Salon Owner",
    value: "Salon Owner",
  },
  {
    text: "Salon-Affiliated",
    value: "Salon-Affiliated",
  },
];

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  type: string;
  phoneNumber: string;
};

const selectedRandomUserType = () => {
  const randomIndex = Math.floor(Math.random() * userType.length);
  return userType[randomIndex]?.value;
};

const data: TDataType[] = Array.from({ length: 10 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Robert Fox",
  email: "robert@gmail.com",
  date: "19 Jun 2025",
  phoneNumber: "+880 1324959819",
  type: selectedRandomUserType(),
}));


const RequestsListTable = () => {
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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      align: "center",
    },
    {
      title: " User Type",
      dataIndex: "type",
      align: "center",
      filters: userType,
      filterIcon: () => (
        <ArrowDownWideNarrowIcon
          className="flex justify-start items-start"
          color="#646786"
        />
      ),
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: () => (  
        <div className="flex-center">
        <Eye
          size={22}
          color="#138487"
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        />
        </div> 
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-2xl">
      <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
        Request List
      </h1>
      <DataTable columns={columns} data={data} pageSize={8} ></DataTable>
      <RequestModal open={open} setOpen={setOpen}></RequestModal>
    </div>
  );
};

export default RequestsListTable;
