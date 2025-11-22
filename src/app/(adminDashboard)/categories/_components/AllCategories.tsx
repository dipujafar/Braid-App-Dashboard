"use client";;
import { Button } from "@/components/ui/button";
import CategoryCard from "./CategoryCard";
import { useRouter } from "next/navigation";
import CategoriesSkeletonContainer from "./CategoriesSkeletonContainer";
import DeleteData from "@/components/shared/DeleteData";
import { useDeleteCategoriesMutation } from "@/redux/api/categoriesApi";
import { useState } from "react";
import EditCategory from "@/components/shared/EditCategory";

type TPropsType = {
    loading: boolean;
    data: any;
};

export default function AllCategories({ loading, data }: TPropsType) {
    const router = useRouter();
    const [deleteCategory] = useDeleteCategoriesMutation();
    const [currentData, serCurrentData] = useState<any>();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("");


    if (loading) {
        return <CategoriesSkeletonContainer />;
    }

    const handleRedirect = (id: number) => {
        router.push(`/categories/${id}`);
    };
    return (
        <>
            <div className="rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {data?.map((category: any) => (
                        <div
                            key={category?._id}
                            className="cursor-pointer"
                            onClick={() => handleRedirect(category?._id)}
                        >
                            <CategoryCard category={category}>
                                <div className="flex space-x-2">
                                    <DeleteData id={category?._id} api={deleteCategory} title="Delete the category" description="Are you sure to delete this category?" successMessage="Deleted the category">
                                        <Button
                                            variant="outline"
                                            className="text-xs px-3 py-1 h-6 border-main-color text-main-color flex-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Delete
                                        </Button>
                                    </DeleteData>
                                    <Button
                                        onClick={(e) => {
                                            setOpen(true);
                                            e.stopPropagation();
                                            serCurrentData(category);
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
            <EditCategory open={open} setOpen={setOpen} title={title || "Edit category"} data={currentData} />
        </>
    )
}
