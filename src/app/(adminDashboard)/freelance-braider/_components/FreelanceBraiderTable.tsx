"use client";;
import { Image, Input, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search } from "lucide-react";
import FreelanceBraiderDetails from "@/components/modals/FreelanceBraider/FreelanceBraiderDetails";
import { useSearchParams } from "next/navigation";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { useDebounce } from "use-debounce";
import TableSkeleton from "@/components/shared/TableSkeleton";
import moment from "moment";
import BlockUser from "@/components/shared/BlockUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  availability: string;
  _id: string;
  status: string;
  image: string;
};



const FreelanceBraiderTable = () => {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState<TDataType | null>(null);
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  //  set queries
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) queries.searchTerm = searchValue;
  queries.role = "freelancer";

  const { data: usersData, isLoading } = useGetAllUsersQuery(queries);

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
      dataIndex: "fullName",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          {record?.image ? <Image
            src={record?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full"
          /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{text?.charAt(0)} </AvatarFallback></Avatar>
          }
          <p>{text}</p>
          {record?.status === "blocked" && <h4 className="ml-2 bg-red-400 text-white px-2 rounded">Blocked</h4>}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Register Date",
      dataIndex: "cratedAt",
      render: (text) => <p>{moment(text).format("ll")}</p>,
    },
    {
      title: "Contact No",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Eye size={22} color="#138487" onClick={() => { setOpen(!open); setCurrentData(record) }} className="cursor-pointer" />
          <BlockUser id={record?._id} isActive={record?.status === "ongoing" ? true : false} />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-md">
      <div className="flex justify-between items-center px-3 py-5">
        <h1 className="  text-2xl text-text-color">Freelancer Braider</h1>
        <Input
          className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#d8d7d7]"
          placeholder="Search Freelance Braider..."
          prefix={<Search size={16} color="#000"></Search>}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></Input>
      </div>
      <DataTable columns={columns} data={usersData?.data}  pageSize={Number(limit)} total={usersData?.meta?.totalDoc}></DataTable>
      <FreelanceBraiderDetails
        open={open}
        setOpen={setOpen}
        data={currentData}
      ></FreelanceBraiderDetails>
    </div>
  );
};

export default FreelanceBraiderTable;
