import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import TextArea from "antd/es/input/TextArea";
import { Label } from "../ui/label";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const RequestRejectModal = ({ open, setOpen }: TPropsType) => {
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
            Reject Details
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

        <div className="mt-4 space-y-2">
          <Label>Notes</Label>
          <TextArea
            placeholder="Type notes here"
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default RequestRejectModal;
