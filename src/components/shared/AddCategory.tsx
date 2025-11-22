import { useCreateCategoriesMutation } from "@/redux/api/categoriesApi";
import { Error_Modal } from "@/utils/modals";
import { Button, ConfigProvider, Form, Input, Modal, Upload } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  title?: string;
};

const AddCategory = ({ open, setOpen, title }: TPropsType) => {
  const [form] = Form.useForm();
  const [createCategories, { isLoading }] = useCreateCategoriesMutation();

  // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
  const handleSubmit = async (values) => {
    const formattedData = { name: values?.categoryName };
    
    const formData = new FormData();
    formData.append("data", JSON.stringify(formattedData));
    formData.append("image", values?.categoryImage?.file);
    try {
      await createCategories(formData).unwrap();
      toast.success("Successfully added category", { duration: 1000 });
      form.resetFields();
      setOpen(false);
    }
    catch (error: any) {
      Error_Modal({ title: error?.data?.message });
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
        }}
      >
        <div className="py-14">
          <div
            className="w-10 h-10 bg-red-500  absolute top-2 right-2 rounded-full cursor-pointer flex justify-center items-center"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" />
          </div>

          {/* header */}

          <h4 className=" text-2xl font-medium text-center">{title}</h4>

          {/* form */}
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorText: "#000",
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

              <Form.Item
                label="Category name"
                name="categoryName"
                rules={[{ required: true, message: "Enter category name" }]}
              >
                <Input
                  size="large"
                  placeholder="Enter category name"
                />
              </Form.Item>

              {/* input  confirm number  */}
              <Form.Item
                label="Upload category Image"
                name="categoryImage"
                rules={[{ required: true, message: "Category Image is required" }]}
              >
                <Upload
                  maxCount={1}
                  listType="picture"
                  beforeUpload={() => false}
                  accept="image/*"

                >
                  <Button className="!border-none">Upload</Button>
                </Upload>
              </Form.Item>

              <Button
                htmlType="submit"
                size="large"
                block
                className="!border-none"
                loading={isLoading}
              >
                Submit
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
    </>
  );
};

export default AddCategory;
