import { Button } from 'antd';
import { Plus } from 'lucide-react';
import React from 'react'

type TPropsType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    setTitle: (title: string) => void;
}

export default function CategoriesContainerHeader({ setOpen, setTitle }: TPropsType) {
    return (
        <div className="flex justify-between items-center flex-wrap xl:mb-6 mb-4 ">
            <h3 className="lg:text-2xl text-xl font-medium">Categories</h3>
            <Button
                onClick={() => { setOpen(true); setTitle("Add Category"); }}
                className="flex items-center gap-2 bg-[#4625A0] hover:bg-[#5132a5]"
            >
                <Plus />
                Add Category
            </Button>
        </div>
    )
}
