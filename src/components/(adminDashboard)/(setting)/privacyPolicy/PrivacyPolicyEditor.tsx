"use client";

import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "@/redux/api/privacyPolicyApi";
import { Error_Modal } from "@/utils/modals";
import { Button } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import ContentSkeleton from "../contentSkeleton/ContentSkeleton";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PrivacyPolicyEditor = () => {
  const route = useRouter();
  const { data, isLoading } = useGetPrivacyPolicyQuery(undefined);
  const [value, setValue] = useState("");
  const [updatePrivacy, { isLoading: updateLoading }] = useUpdatePrivacyPolicyMutation();

  useEffect(() => {
    setValue(data?.data?.content);
  }, [data]);


  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleConest = {
    toolbar: toolbarOptions,
  };

  const handleUpdateContent = async () => {
    try {
      await updatePrivacy({ content: value }).unwrap();
      toast.success("Successfully updated about us content", { duration: 1000 });
    }
    catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  }


  if (isLoading) return <ContentSkeleton />

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          onClick={() => route.back()}
          className="cursor-pointer bg-main-color p-2 rounded-full"
        >
          <FaArrowLeft size={20} color="#fff" />
        </span>
        <h4 className="text-2xl font-medium text-text-color">Privacy Policy</h4>
      </div>
      <ReactQuill
        modules={moduleConest}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Start writing ......"
        style={{
          border: "1px solid #EFE8FD",
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "#68c0a114",
        }}
      />
      <Button
        size="large"
        block
        style={{
          marginTop: "20px",

        }}
        loading={updateLoading}
        onClick={handleUpdateContent}
      >
        Save Changes
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(PrivacyPolicyEditor), {
  ssr: false,
});
