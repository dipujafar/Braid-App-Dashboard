"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import AddCategory from "@/components/shared/AddCategory";
import CategoryCard from "../../_components/CategoryCard";
import { serviceCategories } from "../../_components/utils.data";

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Successfully deleted");
};

// Main component
export default function SubCategoryContainer() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <div className="flex justify-between items-center flex-wrap xl:mb-6 mb-4 ">
        <h3 className="lg:text-2xl text-xl font-medium">Box Braiders</h3>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-main-color hover:bg-main-color/80"
        >
          <Plus />
          Add Sub Category
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 bg-[#F9F9FA] ">
        <div className="w-full lg:w-1/3 bg-[#F9F9FA] p-6">
          <Card className="px-4 py-8 flex flex-col items-center space-y-3 hover:shadow-md transition-shadow border-[#BBBBBB] ">
            <div className="border-2 rounded-full border-main-color p-1.5">
              <Image
                src={serviceCategories?.[0]?.image}
                alt={serviceCategories?.[0]?.name}
                width={70}
                height={70}
                className="size-[100px] object-cover"
              />
            </div>

            <h3 className="text-xl font-medium text-gray-900 text-center">
              {serviceCategories?.[0]?.name}
            </h3>
          </Card>
        </div>

        <div className="p-6 bg-[#F9F9FA] min-h-[calc(100vh-120px)] rounded-lg ">
          <div>
            <div className=" rounded-lg  shadow-sm">
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {serviceCategories?.map((category) => (
                  <CategoryCard key={category.id} category={category}>
                    <div className="flex space-x-2">
                      <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        onConfirm={confirmBlock}
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
                        onClick={() => {setOpen(true); setTitle("Edit Sub Category")}}
                        className="text-xs px-3 py-1 h-6 bg-main-color hover:bg-main-color text-white w-[60px]"
                      >
                        Edit
                      </Button>
                    </div>
                  </CategoryCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCategory open={open} setOpen={setOpen} title={ title || "Add Sub category"} />
    </>
  );
}
