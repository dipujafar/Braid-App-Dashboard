import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const UpdatePasswordModal = ({ open, setOpen }: TPropsType) => {
  const [form] = Form.useForm();

  // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
  const handleSubmit = (values) => {
    console.log("Success:", values);
    setOpen(false);
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
        }}
      >
        <div >
         <div className="flex justify-between items-center">
            <h4></h4>
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

          {/* header */}
          <div>
            <h4 className=" text-2xl font-medium text-center">
              Update Password
            </h4>
            <p className="mt-1 text-center">Please enter your new password</p>
          </div>

          {/* form */}
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  
                  colorText: "#000",
                  colorTextPlaceholder: "#000",
                },
                Form: {
                  labelColor: "#var(--color-primary-gray)",
                  labelFontSize: 14,
                },
              },
            }}
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{
                maxWidth: 500,
                marginTop: "25px",
              }}
            >
              {/*  input  new Password*/}
              <Form.Item
                label="New password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please Enter New  Password" },
                ]}
              >
                <Input.Password size="large" placeholder="Set new password" />
              </Form.Item>

              {/* input  confirm number  */}
              <Form.Item
                label="Re-enter new password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please Re-enter new password" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter new password"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                size="large"
                block
                className="!border-none"
              >
                Update Password
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;
