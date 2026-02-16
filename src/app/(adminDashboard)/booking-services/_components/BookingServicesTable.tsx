"use client";
import { Image, Input, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBooking from "@/components/drawer/CreateBooking/CreateBooking";
import { useGetAllBookingsQuery } from "@/redux/api/bookingsApi";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";

const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-[#E7FFE9] text-[#00C01F]";
    case "completed":
      return "bg-[#DEEBFF] text-[#1F10EF]";
    case "canceled":
      return "bg-[#DE3D1D] text-[#fff]";
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
  customer: any;
  status: string;
  vendor: any;
};


const BookingServicesTable = () => {
  const [open, setOpen] = useState(false);
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  //  set queries
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) queries.searchTerm = searchValue;

  const { data: bookingData, isLoading } = useGetAllBookingsQuery(queries);

  if (isLoading) return <TableSkeleton />



  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      render: (_, record, index) => <p>
        {
          `# ${Number(page) === 1
            ? index + 1
            : (Number(page) - 1) * Number(limit) + index + 1
          }`}
      </p>,
    },
    {
      title: "User Name",
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          {record?.customer?.image ? <Image
            src={record?.customer?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black bg-red-500 " >{record?.customer?.fullName?.charAt(0)} </AvatarFallback></Avatar>
          }
          <p>{record?.customer?.fullName}</p>

        </div>
      ),
    },
    {
      title: "Email",
      render: (text, record) => <p>{record?.customer?.email}</p>,
    },
    {
      title: "Stylist/Salon Name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          {record?.vendor?.image ? <Image
            src={record?.vendor?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{record?.vendor?.fullName?.charAt(0)} </AvatarFallback></Avatar>
          }
          <p>{record?.vendor?.fullName}</p>

        </div>
      ),
    },
    {
      title: "Stylist/Salon Email",
      render: (text, record) => <p>{record?.vendor?.email}</p>,
    },
    {
      title: "Service type",
      dataIndex: "serviceType",
    },
    {
      title: "Location",
      dataIndex: "serviceLocation",
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => <p>{moment(text).format("ll")}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (text) => (
        <p className={`capitalize rounded ${statusColor(text)}`}>{text}</p>
      ),
      // filters: userType,
      // filterIcon: () => <ArrowDownWideNarrowIcon />,
      // onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },
  ];

  return (
    <div className="space-y-5">
      {/* <div className="ml-auto w-max">
        <Button
          onClick={() => setOpen(true)}
          className="bg-main-color hover:bg-[#6a53b1] text-white px-4 py-2 rounded-lg"
        >
          <Plus></Plus> Add Booking
        </Button>
      </div> */}
      <div className="bg-[#F9F9FA] rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
            Booking Services
          </h1>
          <Input
            className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#d8d7d7]"
            placeholder="Search..."
            prefix={<Search size={16} color="#000"></Search>}
            onChange={(e) => setSearchText(e.target.value)}
          ></Input>
        </div>
        <DataTable columns={columns} data={bookingData?.data} pageSize={Number(limit)} total={bookingData?.meta?.totalDoc}></DataTable>
        <CreateBooking open={open} setOpen={setOpen}></CreateBooking>
      </div>
    </div>
  );
};

export default BookingServicesTable;
