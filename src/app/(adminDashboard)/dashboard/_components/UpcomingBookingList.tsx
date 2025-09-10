"use client";
import { Image, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { cn } from "@/lib/utils";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  location: string;
  date: string;
  stylistOrSalonName: string;
  serviceType: string;
};
const data: TDataType[] = Array.from({ length: 5 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Muskan Tanaz",
  stylistOrSalonName: "Salon de Elegance",
  location: "New York",
  date: "26 oct 24, 11.10PM",
  serviceType: "Box Braid",
  status: "Upcoming",
}));

const UpcomingBookingList = () => {
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text) => (
        <div className="flex   items-center gap-x-1">
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
      title: "Stylist/Salon Name",
      dataIndex: "stylistOrSalonName",
      align: "center",
    },
    {
      title: "Service Type",
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
      render: (text) => <p className={cn("rounded",statusColor(text))}>{text}</p>,
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-2xl">
      <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
        Upcoming booking list
      </h1>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default UpcomingBookingList;

const statusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[#eebbf0] text-[#f200fa]";
    case "Upcoming":
      return "bg-[#DFEFFF] text-[#3081D0]";
    case "Cancelled":
      return "text-[#F44336]";
    default:
      return "text-[#FFC107]";
  }
};
