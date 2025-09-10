import { Button } from "@/components/ui/button";
import { Avatar, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  manual?: boolean;
};

const EarningDetailsModal = ({ open, setOpen, manual }: TPropsType) => {
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
          <Avatar src="/user_image1.png" size={120} />
          <div className="bg-green-600 absolute size-3 bottom-5 right-3 rounded-full border-2"></div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h4>User :</h4>
            <p className="font-medium">James Tracy</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Email :</h4>
            <p className="font-medium">muskantanaz@gmail.com</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Mobile Number : </h4>
            <p className="font-medium">01324959819</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Transaction ID : :</h4>
            <p className="font-medium">#123456</p>
          </div>

          <hr />
          <div className="flex justify-between">
            <h4>Date :</h4>
            <p className="font-medium">05/17/2025 </p>
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
            <p className="font-medium">$100</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Address : </h4>
            <p className="font-medium">New York, USA</p>
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
