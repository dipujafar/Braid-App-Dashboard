import { Button } from "@/components/ui/button";
import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  manual?: boolean;
  data?: any;
};

const EarningDetailsModal = ({ open, setOpen, manual, data }: TPropsType) => {
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
          <div>
            <h2 className="text-lg font-medium">Transaction Details</h2>
          </div>
          <div
            className="size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
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
            <AvatarImage className="size-36" src={currentData?.customer?.image} />
            <AvatarFallback className=" flex-center uppercase text-2xl bg-gray-200 text-black  size-36" >{currentData?.customerName?.split(" ")?.length ? `${currentData?.customerName?.split(" ")?.[0]?.charAt(0)}${currentData?.customerName?.split(" ").length > 1 ? currentData?.customerName?.split(" ")?.[1]?.charAt(0) : ""}` : currentData?.customer?.fullName?.charAt(0)}  </AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h4>User :</h4>
            <p className="font-medium">{currentData?.customerName}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Email :</h4>
            <p className="font-medium">{currentData?.customerEmail}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Mobile Number : </h4>
            <p className="font-medium">{currentData?.customer?.phone}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Transaction ID :</h4>
            <p className="font-medium">{currentData?.trnId}</p>
          </div>

          <hr />
          <div className="flex justify-between">
            <h4>Date :</h4>
            <p className="font-medium">{moment(currentData?.createdAt).format("ll")}</p>
          </div>
          <hr />

          {manual && (
            <>
              <div className="flex justify-between">
                <h4>Cash Pick up :</h4>
                <p className="font-medium">Deliver cash to address </p>
              </div>
              <hr />
            </>
          )}
          <div className="flex justify-between">
            <h4>Transaction amount :</h4>
            <p className="font-medium">${currentData?.price}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Address : </h4>
            <p className="font-medium">{currentData?.vendor?.streetAddress}</p>
          </div>
          {manual && (
            <div className="flex justify-between gap-x-3">
              <Button className="w-full border border-[#4625A0] bg-transparent  text-[#4625A0] hover:bg-slate-100">
                Cancel
              </Button>
              <Button className="w-full bg-[#4625A0] hover:bg-[#5a3ab1]">
                Approved
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EarningDetailsModal;
