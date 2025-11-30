import { Button, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import RequestRejectModal from "./RequestRejectModal";
import { useEffect, useState } from "react";
import moment from "moment";
import { dayModify } from "@/utils/dayModify";
import { cn } from "@/lib/utils";
import { useUpdateApprovedStatusSalonMutation } from "@/redux/api/salonOwnerRequestApi";
import { useUpdateApprovedStatusFreelancerMutation } from "@/redux/api/freelancerRequestApi";
import { Error_Modal } from "@/utils/modals";
import { toast } from "sonner";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data?: any;
  title?: string;
};

const handleResumeDownload = (file: string) => {
  const link = document.createElement("a");
  link.href = file;
  link.download = file;
  link.target = "_blank";
  link.click();
};

const RequestModal = ({ open, setOpen, data, title }: TPropsType) => {
  const [openReject, setOpenReject] = useState(false);
  const [currentData, setCurrentData] = useState<any>();
  const [approvedSalonOwner, { isLoading: salonOwnerApprovedLoading }] = useUpdateApprovedStatusSalonMutation();
  const [approvedFreelancer, { isLoading: freelancerApprovedLoading }] = useUpdateApprovedStatusFreelancerMutation();


  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const handleApprove = async () => {
    if (currentData?.user?.role === "owner") {
      try {
        await approvedSalonOwner(currentData?._id).unwrap();
        toast.success("Successfully approved salon owner", { duration: 1000 });
      } catch (error: any) {
        Error_Modal({ title: error?.data?.message || "Something went wrong" });
      }
    } else {
      try {
        await approvedFreelancer(currentData?._id);
        toast.success("Successfully approved freelancer", { duration: 1000 });
      } catch (error: any) {
        Error_Modal({ title: error?.data?.message || "Something went wrong" });
      }
    }
  };

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
        <div className="pb-20 lg:w-[500px]">
          <div className="flex justify-between items-center">
            <h4 className="text-center text-xl font-medium text-[#333s]">
              {title || "Request Modal"}
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
              <p className="font-medium">{currentData?.user?.fullName}</p>
            </div>
            {currentData?.salonName && <> <hr />
              <div className="flex justify-between">
                <h4>Salon Name :</h4>
                <p className="font-medium">{currentData?.salonName}</p>
              </div></>}
            <hr />
            <div className="flex justify-between">
              <h4>Phone number :</h4>
              <p className="font-medium">{currentData?.user?.phone}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Email :</h4>
              <p className="font-medium">{currentData?.user?.email}</p>
            </div>

            {currentData?.experienceYear && <> <hr /> <div className="flex justify-between">
              <h4>Experience :</h4>
              <p className="font-medium">{currentData?.experienceYear} Years</p>
            </div> </>}

            <hr />


            <div className="flex justify-between">
              <h4>Working times :</h4>
              <div className=" max-w-[310px] flex flex-wrap gap-x-3 gap-y-1">
                {currentData?.openingHours?.map((dayAndTime: any, index: number) => <div key={index} className={cn("bg-main-color px-2 rounded-md text-white", dayAndTime?.enabled || "hidden")}>
                  <p>{dayModify(dayAndTime?.day)} : {dayAndTime?.openTime} - {dayAndTime?.closeTime}</p>
                </div>)}
              </div>
            </div>
            <hr />

            <div className="flex justify-between">
              <h4>Address :</h4>
              <p className="font-medium max-w-[300px]">
                {currentData?.location?.streetAddress}
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Date :</h4>
              <p className="font-medium">{moment(currentData?.createdAt).format("ll")}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>ID Card :</h4>
              <button
                className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                onClick={() => handleResumeDownload(currentData?.idDocument)}
              >
                Click here
              </button>
            </div>
            <hr />
            <div className="flex justify-between">
              <h4>Business registration :</h4>
              <button
                className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                onClick={() => handleResumeDownload(currentData?.businessRegistration)}
              >
                Click here
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-x-2">
            {currentData?.approvalStatus !== "rejected" && <Button
              onClick={() => {
                setOpenReject(true);
                setOpen(false);
              }}
              className="w-full text-[#9A0003] border border-[#9A0003] bg-transparent hover:bg-gray-200 "
            >
              Reject
            </Button>}
            <Button loading={salonOwnerApprovedLoading || freelancerApprovedLoading} onClick={handleApprove} className="w-full bg-[#4625A0] hover:bg-[#5539a1]">
              Approved
            </Button>
          </div>
        </div>
      </Modal>

      <RequestRejectModal open={openReject} setOpen={setOpenReject} role={currentData?.user?.role} id={currentData?._id} />
    </>
  );
};

export default RequestModal;
