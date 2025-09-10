"use client";
import { Image, Input, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Info, Search } from "lucide-react";
import EarningDetailsModal from "@/components/modals/EarningDetailsModal";
import ManualRequestModal from "@/components/modals/ManualRequestModal";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  amount: number;
  date: string;
  commission: number;
  cashIckUp: string;
  address: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Robert Fox",
  email: "robert@gmail.com",
  amount: 100,
  date: "19 oct 2025",
  cashIckUp: "Collect Cash from Admin",
  commission: 10,
  address: "Your Location",
}));

const ManualRequestTable = () => {
  const [open, setOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "User",
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
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (text) => <p>${text}</p>,
    },
    {
      title: "Cash Ick Up",
      dataIndex: "cashIckUp",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="flex items-center gap-x-2">
          <Info  size={20} color="#138487" onClick={() => setManualOpen(!manualOpen)}/>
          <Eye size={22} color="#5C5C5C" onClick={() => setOpen(!open)} />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-md">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 px-3 py-5">
        <h1 className="md:text-2xl font-medium  text-text-color">
          Manual Request
        </h1>
        <Input
          className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#ddd5d5]"
          placeholder="Search..."
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={6}></DataTable>
      <EarningDetailsModal open={open} setOpen={setOpen} manual={true}></EarningDetailsModal>
      <ManualRequestModal open={manualOpen} setOpen={setManualOpen}></ManualRequestModal>
    </div>
  );
};

export default ManualRequestTable;
