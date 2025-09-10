import { Avatar, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { Button } from "../ui/button";
import RequestRejectModal from "./RequestRejectModal";
import { useState } from "react";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const handleResumeDownload = () => {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.download = "resume.pdf";
  link.click();
};

const RequestModal = ({ open, setOpen }: TPropsType) => {
  const [openReject, setOpenReject] = useState(false);
  return (
    <>
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
        <div className="pb-20">
          <div className="flex justify-between items-center">
            <h4 className="text-center text-xl font-medium text-[#333s]">
              Freelancer
            </h4>
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

          <div className="mt-10 space-y-4">
            <div className="flex justify-between">
              <h4>Full Name :</h4>
              <p className="font-medium">Enrique</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Phone number :</h4>
              <p className="font-medium">12345678</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Email :</h4>
              <p className="font-medium">jamestracy@gmail.com</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Experience :</h4>
              <p className="font-medium">6 Years</p>
            </div>

            <hr />
            <div className="flex justify-between">
              <h4>Working days :</h4>
              <p className="font-medium">Sat-Fri</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Working times :</h4>
              <p className="font-medium">08:00 am-07:00 pm</p>
            </div>
            <hr />

            <div className="flex justify-between">
              <h4>Address :</h4>
              <p className="font-medium">
                2715 Ash Dr. San Jose, South Dakota 83475
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Joining date :</h4>
              <p className="font-medium">16 Aug 2024</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>ID Card :</h4>
              <button
                className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                onClick={handleResumeDownload}
              >
                Click here
              </button>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Business registration :</h4>
              <button
                className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                onClick={handleResumeDownload}
              >
                Click here
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-x-2">
            <Button
              onClick={() => {
                setOpenReject(true);
                setOpen(false);
              }}
              className="w-full text-[#9A0003] border border-[#9A0003] bg-transparent hover:bg-gray-200 "
            >
              Reject
            </Button>
            <Button className="w-full bg-[#4625A0] hover:bg-[#5539a1]">
              Approved
            </Button>
          </div>
        </div>
      </Modal>

      <RequestRejectModal open={openReject} setOpen={setOpenReject} />
    </>
  );
};

export default RequestModal;
