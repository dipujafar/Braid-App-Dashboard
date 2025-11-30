"use client";
import { Image, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";

import RequestModal from "@/components/modals/RequestModal";
import { useGetAllSalonOwnerRequestsQuery } from "@/redux/api/salonOwnerRequestApi";
import { useSearchParams } from "next/navigation";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";


type TDataType = {
  user: any,
  approvalStatus: string,
};


const RequestsListTable = () => {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState<TDataType | null>(null);
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";


  //  set queries
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  const { data: salonOwnerRequests, isLoading } = useGetAllSalonOwnerRequestsQuery(queries);

  if (isLoading) return <TableSkeleton />



  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
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
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          {record?.user?.image ? <Image
            src={record?.user?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{record?.user?.fullName?.charAt(0)} </AvatarFallback></Avatar>
          }
          <p>{record?.user?.fullName}</p>
          {record?.approvalStatus === "rejected" && <h4 className="ml-2 bg-red-400 text-white px-2 rounded">Rejected</h4>}
        </div>
      ),
    },
    {
      title: "Email",
      render: (_, record) => <p>{record?.user?.email}</p>,
    },
    {
      title: "Phone Number",
      render: (_, record) => <p>{record?.user?.phone}</p>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "center",
      render: (text) => <p>{moment(text).format("ll")}</p>,
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex-center">
          <Eye
            size={22}
            color="#138487"
            onClick={() => { setOpen(!open); setCurrentData(record) }}
            className="cursor-pointer"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-2xl">
      <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
       Salon Owner Requests
      </h1>
      <DataTable columns={columns} data={salonOwnerRequests?.data} pageSize={Number(limit)} total={salonOwnerRequests?.meta?.totalDoc} ></DataTable>
      <RequestModal open={open} setOpen={setOpen} data={currentData} title="Salon Owner" ></RequestModal>
    </div>
  );
};

export default RequestsListTable;
