"use client";
import { Image, Input, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { Search } from "lucide-react";
import { useGetServicingNowPanelQuery } from "@/redux/api/servicingNowPanelApi";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const statusColor = (status: string) => {
  switch (status) {
    case "servicingNow":
      return { text: "Servicing Now", className: "bg-[#E7FFE9] text-[#00C01F]" };
    case "nextLine":
      return { text: "Next in line", className: "bg-[#DEEBFF] text-[#1F10EF]" };
    case "upcoming":
      return { text: "Upcoming", className:"bg-[#FFEACC] text-[#C07000]" };
    default:
      return { text: "Unknown", className:"bg-[#000] text-[#fff]" };
  }
};



const ServicingPanelTable = () => {

  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  //  set queries
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) queries.searchTerm = searchValue;

  const { data: serviceData, isLoading } = useGetServicingNowPanelQuery(queries);
  console.log(serviceData?.data?.result);
  const columns: TableProps<any>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text, record, index) => <p>
        {
          `# ${Number(page) === 1
            ? index + 1
            : (Number(page) - 1) * Number(limit) + index + 1
          }`}
      </p>,
    },
    {
      title: "User Name",
      dataIndex: "user",

      render: (text, record) => (
        <div className="flex   items-center gap-x-1">
          <Image
            src={record?.customer?.image}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10 rounded-full"
          ></Image>
          <p>{record?.customer?.fullName}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",

    },
    {
      title: "Stylist/Salon Name",
      dataIndex: "stylistSalonName",
      render: (text, record) => <p>{record?.specialist?.name}</p>,

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
      dataIndex: "date",

    },
    {
      title: "Status",
      dataIndex: "dashboardStatus",
      align: "center",
      render: (text) => (
        <p className={`capitalize text-center rounded ${statusColor(text)?.className}`}>{statusColor(text)?.text}</p>
      ),
      // filters: userType,
      // filterIcon: () => <ArrowDownWideNarrowIcon />,
      // onFilter: (value, record) => record.status.indexOf(value as string) === 0,
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></Input>
      </div>
      <DataTable columns={columns} data={serviceData?.data?.result} isLoading={isLoading} pageSize={8}></DataTable>
    </div>
  );
};

export default ServicingPanelTable;
