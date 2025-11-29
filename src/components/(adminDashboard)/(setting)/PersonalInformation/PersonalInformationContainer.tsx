"use client";
import { Button, ConfigProvider, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import profile from "@/assets/image/adminProfile.png";
import { useState } from "react";
import { toast } from "sonner";
import { Camera, CloudFog, Trash2, X } from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation, useUpdateProfilePictureMutation } from "@/redux/api/profileApi";
import PersonalInformationSkeleton from "./PersonalInformationSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const PersonalInformationContainer = () => {
  const route = useRouter();
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [fileName, setFileName] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { data, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
  const [updateProfilePicture, { isLoading: updateProfilePictureLoading }] = useUpdateProfilePictureMutation();




  // @ts-expect-error: Ignoring TypeScript error due to inferred 'any' type for 'values' which is handled in the form submit logic
  const handleSubmit = async (values) => {
    const formattedData = {
      fullName: values.name,
      phone: values.phone,
    };

    try {
      await updateProfile(formattedData).unwrap();
      toast.success("Successfully Change personal information", {
        duration: 1000,
      });
      setEdit(false);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }

  };


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    const file = input.files?.[0];
    const formData = new FormData();


    formData.append("profile", file!);

    try {
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setFileName(file);
      } else {
        setImageUrl(null);
        setFileName(null);
      }

      await updateProfilePicture(formData).unwrap();


      input.value = "";
    }
    catch (error: any) {
      toast.error(error?.data?.message);
      setImageUrl(null);
      setFileName(null);
    }
  };



  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span
            onClick={() => route.back()}
            className="cursor-pointer bg-main-color p-2 rounded-full"
          >
            <FaArrowLeft size={20} color="#fff" />
          </span>
          <h4 className="text-2xl font-medium text-text-color">
            Personal Information
          </h4>
        </div>
        <div className={edit ? "hidden" : ""}>
          <Button
            style={{
              backgroundColor: "var(--color-main)",
              border: "none",
            }}
            onClick={() => setEdit(true)}
            size="large"
            icon={<FiEdit />}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <hr className="my-4" />

      {/* personal information */}
      {isLoading ? <PersonalInformationSkeleton /> : <div className="mt-10 flex justify-center flex-col xl:flex-row items-center  gap-10">
        <div className="bg-primary-light-gray h-[365px] md:w-[350px] rounded-xl border border-main-color flex justify-center items-center  text-text-color">
          <div className="space-y-1 relative">
            <div className="relative group">
              {updateProfilePictureLoading ?
                <Skeleton className="size-36 rounded-full flex justify-center items-center" />
                : <Image
                  src={data?.data?.image || profile}
                  alt="adminProfile"
                  width={1200}
                  height={1200}
                  className="size-36 rounded-full flex justify-center items-center"
                ></Image>}

              {/* upload image */}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              {/* upload button */}
              <label
                htmlFor="fileInput"
                className="flex cursor-pointer flex-col items-center"
              >
                <div className="bg-white text-black text-lg p-1 rounded-full  absolute bottom-0 right-3">
                  <Camera size={20} />
                </div>
              </label>
            </div>
            <h3 className="text-2xl text-center">Admin</h3>
          </div>
        </div>
        {/* form */}
        <div className="w-2/4">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorBgContainer: "var(--color-primary-light-gray)",
                  colorText: "#000",
                  colorTextPlaceholder: "#000",
                },
                Form: {
                  labelColor: "#000",
                },
              },
            }}
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{
                marginTop: "25px",
              }}
              initialValues={{
                name: data?.data?.fullName,
                email: data?.data?.email,
                phone: data?.data?.phone,
              }}
            >
              {/*  input  name */}
              <Form.Item label="Name" name="name">
                {edit ? (
                  <Input size="large" placeholder="Enter full name "></Input>
                ) : (
                  <Input
                    size="large"
                    placeholder="Enter full name "
                    readOnly
                  ></Input>
                )}
              </Form.Item>

              {/*  input  email */}
              <Form.Item label="Email" name="email">
                <Input
                  size="large"
                  placeholder="Enter email"
                  readOnly
                ></Input>
              </Form.Item>

              {/* input  phone number  */}
              <Form.Item label="Phone Number" name="phone">
                {edit ? (
                  <Input size="large" placeholder="Enter Phone number"></Input>
                ) : (
                  <Input
                    size="large"
                    placeholder="Enter Phone number"
                    readOnly
                  ></Input>
                )}
              </Form.Item>

              <div className={edit ? "" : "hidden"}>
                <Button
                  htmlType="submit"
                  size="large"
                  block
                  style={{ border: "none" }}
                  loading={updateProfileLoading}
                >
                  Save Change
                </Button>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </div>}
    </div>
  );
};

export default PersonalInformationContainer;
