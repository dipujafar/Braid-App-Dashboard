import { Avatar, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const AffiliatedStylistsDetailsModal = ({ open, setOpen }: TPropsType) => {
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
          <Avatar src="/user_image1.png" size={120} />
          <div className="bg-green-600 absolute size-3 bottom-5 right-3 rounded-full border-2"></div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h4>User name :</h4>
            <p className="font-medium">James Tracy</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Email :</h4>
            <p className="font-medium">muskantanaz@gmail.com</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Mobile Number :</h4>
            <p className="font-medium">+123456789</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Age :</h4>
            <p className="font-medium">35 Year</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Date :</h4>
            <p className="font-medium">01-24-2024</p>
          </div>
          <hr />

          <div className="flex justify-between">
            <h4>Address :</h4>
            <p className="font-medium">California</p>
          </div>
          <hr />
        </div>
      </div>
    </Modal>
  );
};

export default AffiliatedStylistsDetailsModal;
