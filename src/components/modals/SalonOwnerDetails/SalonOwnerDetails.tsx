import { Avatar as AntAvatar, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { affiliatedStylists, reviews } from "./utils";
import AffiliatedStylistsDetailsModal from "../AffiliatedStylistsDetailsModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import RatingAndReview from "../../shared/Rating/RatingAndReview";
import AffiliatedStylists from "./AffiliatedStylists";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  data: any
};

const handleResumeDownload = (file: string) => {
  const link = document.createElement("a");
  link.href = file;
  link.download = file;
  link.target = "_blank";
  link.click();
};

const SalonOwnerDetails = ({ open, setOpen, data }: TPropsType) => {
  const [affiliatedStylistsModal, setAffiliatedStylistsModal] = useState(false);
  const [currentData, setCurrentData] = useState<any>(null);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

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
            <div></div>
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

          <div className="flex flex-col xl:flex-row  lg:gap-8 gap-5 ">
            {/* --------------------- owner info --------------------- */}
            <div className="flex-1 lg:min-w-[500px]">
              <div className="w-fit mx-auto relative">
                <Avatar className="size-38">
                  <AvatarImage className="size-36" src={currentData?.image} />
                  <AvatarFallback className=" flex-center uppercase text-2xl bg-gray-200 text-black  size-36" >{currentData?.fullName?.split(" ")?.length ? `${currentData?.fullName?.split(" ")?.[0]?.charAt(0)}${currentData?.fullName?.split(" ")?.[1]?.charAt(0)}` : currentData?.name?.charAt(0)}  </AvatarFallback>
                </Avatar>
              </div>
              <div className="mt-10 space-y-4">
                <div className="flex justify-between">
                  <h4>Full Name :</h4>
                  <p className="font-medium">{currentData?.fullName}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Salon Name : </h4>
                  <p className="font-medium">{currentData?.ownerReg?.salonName}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Mobile Number :</h4>
                  <p className="font-medium">{currentData?.phone}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Email :</h4>
                  <p className="font-medium">{currentData?.email}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Business Registration Number :</h4>
                  <p className="font-medium">{currentData?.ownerReg?.businessRegistrationNumber || "N/A"}</p>
                </div>

                <hr />
                <div className="flex justify-between">
                  <h4>Gender :</h4>
                  <p className="font-medium">{currentData?.gender || "N/A"}</p>
                </div>
                <hr />

                <div className="flex justify-between">
                  <h4>Address :</h4>
                  <p className="font-medium max-w-[300px] ">
                    {currentData?.ownerReg?.location?.streetAddress}
                  </p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Joining date :</h4>
                  <p className="font-medium">{moment(currentData?.ownerReg?.createdAt).format("ll")}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>ID Card :</h4>
                  <button
                    className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                    onClick={() => handleResumeDownload(currentData?.ownerReg?.idDocument)}
                  >
                    Click here
                  </button>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Business registration :</h4>
                  <button
                    className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                    onClick={() => handleResumeDownload(currentData?.ownerReg?.businessRegistration)}
                  >
                    Click here
                  </button>
                </div>
                <hr />
              </div>



              {/* Affiliated Stylists */}

             <AffiliatedStylists id={currentData?.ownerReg?.user || currentData?._id} />
            </div>
            {/* ------------------------------ rating and review    ---------------- */}
            <RatingAndReview reviews={currentData?.ownerReg?.reviews} avgRating={currentData?.ownerReg?.avgRating} />
          </div>
        </div>
      </Modal>

      <AffiliatedStylistsDetailsModal
        open={affiliatedStylistsModal}
        setOpen={setAffiliatedStylistsModal}
      />
    </>
  );
};

export default SalonOwnerDetails;
