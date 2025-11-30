import { Modal, Form, Input, Button } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { Label } from "../ui/label";
import { useRejectStatusFreelancerMutation } from "@/redux/api/freelancerRequestApi";
import { useRejectStatusSalonMutation } from "@/redux/api/salonOwnerRequestApi";
import { toast } from "sonner";
import { Error_Modal } from "@/utils/modals";

const { TextArea } = Input;

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  role?: string;
  id?: any
};

const RequestRejectModal: React.FC<TPropsType> = ({ open, setOpen, role, id }) => {
  const [form] = Form.useForm();

  const [rejectFreelancer, { isLoading: isLoadingFreelancer }] = useRejectStatusFreelancerMutation();
  const [rejectSalonOwner, { isLoading: isLoadingSalon }] = useRejectStatusSalonMutation();

  const handleSubmit = async (values: any) => {
    console.log("Form submitted:", values);

    const formattedData = {
      approvalStatus: "rejected",
      notes: values?.notes
    }

    try {
      if (role == "owner") {
        await rejectSalonOwner({id, data:formattedData}).unwrap();
        toast.success("Successfully rejected salon owner", { duration: 1000 });
        setOpen(false);
        form.resetFields();
      } else {
        await rejectFreelancer({id, data:formattedData}).unwrap();
        toast.success("Successfully rejected freelancer", { duration: 1000 });
        setOpen(false);
        form.resetFields();
      }

    }
    catch (error: any) {
      Error_Modal({ title: error?.data?.message || "Something went wrong" });
    }


  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{ minWidth: "max-content", position: "relative", backgroundColor: "#000" }}
    >
      <div className="pb-20">
        <div className="flex justify-between items-center">
          <h4 className="text-center text-xl font-medium text-[#333]">
            Reject Details
          </h4>

          <div
            className="size-8 bg-transparent border border-red-500 hover:bg-red-600 rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={15}
              className="text-red-600 group-hover:text-red-100 group"
            />
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          onFinish={handleSubmit}
        >
          <Form.Item
            label={<Label>Notes</Label>}
            name="notes"
            rules={[{ required: true, message: "Please enter notes" }]}
          >
            <TextArea placeholder="Type notes here" autoSize={{ minRows: 5, maxRows: 5 }} />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoadingFreelancer || isLoadingSalon} type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default RequestRejectModal;
