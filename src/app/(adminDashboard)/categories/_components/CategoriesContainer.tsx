"use client";;
import { useState } from "react";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import CategoriesContainerHeader from "./CategoriesContainerHeader";
import AllCategories from "./AllCategories";
import PaginationSection from "@/components/shared/PaginationSection";
import { useSearchParams } from "next/navigation";
import AddCategory from "@/components/shared/AddCategory";

// Main component
export default function CategoryContainer() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const page = useSearchParams().get("page") || "1";
    const limit = useSearchParams().get("limit") || "15";

    const queries: Record<string, string> = {};

    if (page) queries["page"] = page;
    if (limit) queries["limit"] = limit;

    const { data, isLoading } = useGetCategoriesQuery(queries);

    return (
        <>
            <CategoriesContainerHeader open={open} setOpen={setOpen} title={title} setTitle={setTitle} />
            <div className="p-6 bg-[#F9F9FA] min-h-[calc(100vh-120px)] rounded-lg border  border-[#BBBBBB]">
                <AllCategories loading={isLoading} data={data?.data} />
                <PaginationSection total={data?.meta?.totalDoc} current={Number(page)}
                    pageSize={Number(limit)} />
            </div>
            <AddCategory open={open} setOpen={setOpen} title={title || "Add new category"} />
           
        </>
    );
}