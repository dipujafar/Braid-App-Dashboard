"use client";
import {
  Image,
  Input,
  TableProps,
} from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search } from "lucide-react";
import EarningDetailsModal from "@/components/modals/EarningDetailsModal";
import { useGetTransitionHistoryQuery } from "@/redux/api/earningApi";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";



const EarningTable = () => {
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
   const [currentData, setCurrentData] = useState<any | null>(null);

  //  set queries
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) queries.searchTerm = searchValue;

  const { data: transactionData, isLoading } = useGetTransitionHistoryQuery(queries)
  const [open, setOpen] = useState(false);


  const columns: TableProps<any>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (_, __, index) => <p>
        {
          `# ${Number(page) === 1
            ? index + 1
            : (Number(page) - 1) * Number(limit) + index + 1
          }`}
      </p>,
    },
    {
      title: "User Name",
      dataIndex: "customerName",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          {record?.customer?.image ? <Image
            src={record?.customer?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{text?.charAt(0)} </AvatarFallback></Avatar>
          }
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
    },

    {
      title: "Amount",
      dataIndex: "price",
      align: "center",
      render: (text) => <p>${text}</p>,
    },
    {
      title: "Commission",
      dataIndex: "adminAmount",
      align: "center",
      render: (text) => <p>${text}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <p>{moment(text).format("ll")}</p>,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Eye size={22} color="#5C5C5C" onClick={() => { setOpen(!open); setCurrentData(record) }} />
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-md">
      <div className="flex flex-col md:flex-row justify-between md:items-center px-3 py-5 gap-1">
        <h1 className="md:text-2xl font-medium  text-text-color">Transactions</h1>
        <Input
          className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#d3c9c9]"
          placeholder="Search..."
           onChange={(e) => setSearchText(e.target.value)}
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={transactionData?.data} isLoading={isLoading} pageSize={Number(limit)} total={transactionData?.meta?.totalDoc}></DataTable>
      <EarningDetailsModal open={open} setOpen={setOpen} data={currentData}></EarningDetailsModal>
    </div>
  );
};

export default EarningTable;
