"use client";;
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import AddCategory from "@/components/shared/AddCategory";
import CategoryCard from "./CategoryCard";
import { serviceCategories } from "./utils.data";
import { useRouter } from "next/navigation";

// Service categories data array

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Successfully deleted");
};

// Main component
export default function CategoryContainer() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  const handleRedirect = (id: number) => {
    router.push(`/categories/${id}`);
  };
  return (
    <>
      <div className="flex justify-between items-center flex-wrap xl:mb-6 mb-4 ">
        <h3 className="lg:text-2xl text-xl font-medium">Categories</h3>
        <Button
          onClick={() => {  setOpen(true); setTitle("Add Category"); }}
          className="flex items-center gap-2 bg-[#4625A0] hover:bg-[#5132a5]"
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <div className="p-6 bg-[#F9F9FA] min-h-[calc(100vh-120px)] rounded-lg border  border-[#BBBBBB]">
        <div>
          <div className=" rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {serviceCategories?.map((category) => (
                <div
                  key={category.id}
                  className="cursor-pointer"
                  onClick={() => handleRedirect(category?.id)}
                >
                  <CategoryCard category={category}>
                    <div className="flex space-x-2">
                      <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        onConfirm={(e) => {
                          e?.stopPropagation();
                          //   @ts-ignore
                          confirmBlock();
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          variant="outline"
                          className="text-xs px-3 py-1 h-6 border-main-color text-main-color flex-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                      <Button
                        onClick={(e) => {
                          setOpen(true);
                          e.stopPropagation();
                          setTitle("Edit category");
                        }}
                        className="text-xs px-3 py-1 h-6 bg-main-color hover:bg-main-color text-white w-[60px]"
                      >
                        Edit
                      </Button>
                    </div>
                  </CategoryCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddCategory open={open} setOpen={setOpen} title={ title || "Add new category"} />
    </>
  );
}
