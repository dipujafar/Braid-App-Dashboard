import CustomAvatar from "@/components/shared/CustomAvatar";
import { cn } from "@/lib/utils";
import React from "react";

const dummyMembers = [
  {
    id: "0",
    name: "Istiak Ahmed",
    email: "isahmed739@gmail.com",
    phone: "01324959819",
    profile: "/user-profile.png",
    date: "11 Jun 25, 11.10PM"
  },
  {
    id: "1",
    name: "Istiak Ahmed",
    email: "isahmed739@gmail.com",
    phone: "01324959819",
    profile: "/user-profile.png",
    date: "11 Jun 25, 11.10PM"
  },
  {
    id: "2",
    name: "Istiak Ahmed",
    email: "isahmed739@gmail.com",
    phone: "01324959819",
    profile: "/user-profile.png",
    date: "11 Jun 25, 11.10PM"
  },
  {
    id: "3",
    name: "Istiak Ahmed",
    email: "isahmed739@gmail.com",
    phone: "01324959819",
    profile: "/user-profile.png",
    date: "11 Jun 25, 11.10PM"
  },
  {
    id: "4",
    name: "Istiak Ahmed",
    email: "isahmed739@gmail.com",
    phone: "01324959819",
    profile: "/user-profile.png",
    date: "11 Jun 25, 11.10PM"
  },
  {
    id: "5",
    name: "Istiak Ahmed",
    email: "isahmed739@gmail.com",
    phone: "01324959819",
    profile: "/user-profile.png",
    date: "11 Jun 25, 11.10PM"
  },
];

export default function SupportTable({ selectedSupport, setSelectedSupport }: { selectedSupport: number, setSelectedSupport: React.Dispatch<React.SetStateAction<number>> }) {

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#C6BBE2]">
          <tr className="border-b border-gray-100">
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              NAME
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              EMAIL
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              PHONE
            </th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {dummyMembers.map((member) => (
            <DataRow key={member.id} data={member} selectedSupport={selectedSupport} setSelectedSupport={setSelectedSupport} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ----------------------------- data row ------------------------
const DataRow = ({ data, selectedSupport, setSelectedSupport }: { data: any, selectedSupport: number, setSelectedSupport: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <tr onClick={() => setSelectedSupport(Number(data?.id))} className={cn("hover:bg-gray-50 cursor-pointer", selectedSupport === Number(data?.id) && "bg-[#DCECED]")}>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <CustomAvatar
            img={data?.profile}
            name={data?.name}
            fallbackClass="text-lg text-gray-600"
          />
          <span className="text-sm font-medium text-gray-900">
            {data?.name}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-900">{data?.email}</td>
      <td className="py-4 px-6 text-sm text-gray-900">{data?.phone}</td>
      <td className="py-4 px-6 text-sm text-gray-900">{data?.date}</td>
    </tr>
  );
};
