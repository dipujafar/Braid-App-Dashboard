"use client";
import { Image, Input, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import RequestModal from "@/components/modals/RequestModal";
import { ArrowDownWideNarrowIcon, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBooking from "@/components/drawer/CreateBooking/CreateBooking";

const statusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[#E7FFE9] text-[#00C01F]";
    case "Approved":
      return "bg-[#DEEBFF] text-[#1F10EF]";
    default:
      return "bg-[#000] text-[#fff]";
  }
};

const userType = [
  {
    text: "Pending",
    value: "Pending",
  },
  {
    text: "Approved",
    value: "Approved",
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

const BookingServicesTable = () => {
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
    <div className="space-y-5">
      <div className="ml-auto w-max">
        <Button
          onClick={() => setOpen(true)}
          className="bg-main-color hover:bg-[#6a53b1] text-white px-4 py-2 rounded-lg"
        >
          <Plus></Plus> Add Booking
        </Button>
      </div>
      <div className="bg-[#F9F9FA] rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
            Booking Services
          </h1>
          <Input
            className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#d8d7d7]"
            placeholder="Search..."
            prefix={<Search size={16} color="#000"></Search>}
          ></Input>
        </div>
        <DataTable columns={columns} data={data} pageSize={8}></DataTable>
        <CreateBooking open={open} setOpen={setOpen}></CreateBooking>
      </div>
    </div>
  );
};

export default BookingServicesTable;
