import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data?: any;
};

const UserDetails = ({ open, setOpen, data }: TPropsType) => {
  const [currentData, setCurrentData] = useState<any>(null);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      <div className="pb-20 ">
        <div className="flex justify-between items-center">
          <h4 className="text-center text-xl font-medium text-[#333s]">
            User Details
          </h4>
          <div
            className="w-10 h-10 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={15}
              className="text-red-600 group-hover:text-red-100 group"
            />
          </div>
        </div>
        <div className="w-fit mx-auto relative">
          <Avatar className="size-38">
            <AvatarImage className="size-36" src={currentData?.image} />
            <AvatarFallback className=" flex-center uppercase text-2xl bg-gray-200 text-black  size-36" >{currentData?.fullName?.split(" ")?.length ? `${currentData?.fullName?.split(" ")?.[0]?.charAt(0)}${currentData?.fullName?.split(" ")?.[1]?.charAt(0)}` : currentData?.name?.charAt(0)}  </AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h4>User name :</h4>
            <p className="font-medium">{currentData?.fullName}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Email :</h4>
            <p className="font-medium">{currentData?.email}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Mobile Number :</h4>
            <p className="font-medium">{currentData?.phone}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Gender :</h4>
            <p className="font-medium">{currentData?.gender ?? "N/A"}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Join Date :</h4>
            <p className="font-medium">{moment().format("ll")}</p>
          </div>
          <hr />

          <div className="flex justify-between">
            <h4>Address :</h4>
            <p className="font-medium">{`${currentData?.streetAddress}, ${currentData?.city}, ${currentData?.state}`}</p>
          </div>
          <hr />
        </div>

        <div className="flex justify-between gap-x-5 mt-3">
          <div className="bg-[#EDEEFC] flex-1 p-6 rounded">
            <h5>Total booking</h5>
            <p className="text-xl font-medium">05</p>
          </div>
          <div className="bg-[#EDEEFC] flex-1 p-6 rounded">
            <h5>Total Payment</h5>
            <p className="text-xl font-medium">$5000</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
