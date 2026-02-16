"use client";
import { Image, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { cn } from "@/lib/utils";
import { useGetOngoingBookingsQuery } from "@/redux/api/dashboardOverviewApi";
import moment from "moment";
import { useSearchParams } from "next/navigation";



const OngoingServicesTable = () => {
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "5";


  //  set queries
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;


  const { data: serviceData } = useGetOngoingBookingsQuery(queries);
  // console.log(serviceData);
  const columns: TableProps<any>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (_, __, index) => <p> {
        `# ${Number(page) === 1
          ? index + 1
          : (Number(page) - 1) * Number(limit) + index + 1
        }`}</p>,
    },
    {
      title: "Full Name",
      dataIndex: "",
      render: (_, record) => (
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
      title: "Stylist/Salon Name",
      dataIndex: "",
      align: "center",
      render: (text, record) => <p>{record?.vendor?.fullName}</p>,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "serviceLocation",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (text) => <p>{moment(text).format("DD MMM YYYY")}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: () => <p className={cn("rounded", statusColor("Pending"))}>{"Pending"}</p>,
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-2xl">
      <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
        Ongoing Services
      </h1>
      <DataTable columns={columns} data={serviceData?.data} pageSize={Number(limit)} total={serviceData?.meta?.totalDoc} ></DataTable>
    </div>
  );
};

export default OngoingServicesTable;

const statusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[#eebbf0] text-[#f200fa]";
    case "Completed":
      return "text-[#4CAF50]";
    case "Cancelled":
      return "text-[#F44336]";
    default:
      return "text-[#FFC107]";
  }
};
