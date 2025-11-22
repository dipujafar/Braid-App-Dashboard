"use client";;
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "antd";
import { useState } from "react";
import { useGetCategoryByIdQuery } from "@/redux/api/categoriesApi";
import AddSubCategory from "@/components/shared/AddSubCategory";
import AllSubCategory from "./AllSubCategory";
import MainCategory from "./MainCategory";


// Main component
export default function SubCategoryContainer({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { data: categoryData, isLoading } = useGetCategoryByIdQuery(id, { skip: !id });
  return (
    <>
      <div className="flex justify-between items-center flex-wrap xl:mb-6 mb-4 ">
        <h3 className="lg:text-2xl text-xl font-medium">{categoryData?.data?.name}</h3>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-main-color hover:bg-main-color/80"
        >
          <Plus />
          Add Sub Category
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 bg-[#F9F9FA] ">
        <MainCategory data={categoryData?.data} loading={isLoading} />

        <AllSubCategory id={id} />
      </div>
      <AddSubCategory open={open} setOpen={setOpen} id={id} />
    </>
  );
}
