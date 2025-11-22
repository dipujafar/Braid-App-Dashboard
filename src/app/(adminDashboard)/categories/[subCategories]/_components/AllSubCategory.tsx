"use client";;
import { Button } from "@/components/ui/button";
import { Empty, message, Popconfirm, PopconfirmProps } from "antd";
import CategoryCard from "../../_components/CategoryCard";
import { serviceCategories } from "../../_components/utils.data";
import { useDeleteSubCategoriesMutation, useGetSubCategoriesQuery } from "@/redux/api/subCategoriesApi";
import DeleteData from "@/components/shared/DeleteData";
import EditSubCategory from "@/components/shared/EditCategory";
import { useState } from "react";
import PaginationSection from "@/components/shared/PaginationSection";
import { useSearchParams } from "next/navigation";
import SubCategorySkeleton from "./SubCategorySkeleton";

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Successfully deleted");
};
export default function AllSubCategory({ id }: { id: string }) {
    const [deleteSubCategory] = useDeleteSubCategoriesMutation();
    const [open, setOpen] = useState(false);
    const [currentData, setCurrentData] = useState<any>();
    const page = useSearchParams().get("page") || "1";
    const limit = useSearchParams().get("limit") || "12";
    const queries: Record<string, string> = {};

    if (page) queries["page"] = page;
    if (limit) queries["limit"] = limit;

    const { data: subCategoriesData, isLoading } = useGetSubCategoriesQuery({ id, query: queries }, { skip: !id });

    if (isLoading) return <div className=" rounded-lg border border-[#BBBBBB] p-4 "> <SubCategorySkeleton /> </div>;

    if (subCategoriesData?.data?.length === 0) return <div className=" w-full rounded-lg border border-[#BBBBBB] p-4 flex justify-center items-center "><Empty />  </div>;

    return (
        <>
            <div className="p-6 bg-[#F9F9FA] min-h-[calc(100vh-120px)] rounded-lg ">
                <div>
                    <div className=" rounded-lg border border-[#BBBBBB] p-4 ">
                        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4 ">
                            {subCategoriesData?.data?.map((category: any) => (
                                <CategoryCard key={category._id} category={category}>
                                    <div className="flex space-x-2">
                                        <DeleteData id={category?._id} api={deleteSubCategory} title="Delete the sub category" description="Are you sure to delete this sub category?" successMessage="Deleted the sub category">
                                            <Button
                                                variant="outline"
                                                className="text-xs px-3 py-1 h-6 border-main-color text-main-color flex-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Delete
                                            </Button>
                                        </DeleteData>
                                        <Button
                                            onClick={() => { setOpen(true); setCurrentData(category) }}
                                            className="text-xs px-3 py-1 h-6 bg-main-color hover:bg-main-color text-white w-[60px]"
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </CategoryCard>
                            ))}
                        </div>
                        <PaginationSection total={subCategoriesData?.meta?.totalDoc} current={Number(page)}
                            pageSize={Number(limit)} />
                    </div>
                </div>
            </div>
            <EditSubCategory open={open} setOpen={setOpen} data={currentData} />
        </>
    )
}
