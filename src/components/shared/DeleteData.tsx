"use client";
import { Error_Modal } from '@/utils/modals';
import { message, Popconfirm, PopconfirmProps } from 'antd'
import { Trash2 } from 'lucide-react';
import { ReactNode } from 'react'

export default function DeleteData({ id, title, description, api, children, successMessage }: { id: string, title?: string, description?: string, api: any, children?: ReactNode, successMessage?: string }) {

    const confirmBlock: PopconfirmProps["onConfirm"] = async (e) => {
        e?.stopPropagation();
        try {
            api(id).unwrap();
            message.success(successMessage || "Deleted the data");
        }
        catch (error: any) {
            Error_Modal({ title: error?.data?.message });
        }

    };
    return (
        <Popconfirm
            title={title || "Delete"}
            description={description || "Are you sure to delete this?"}
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
        >
            {children || <div className="size-8 rounded-full bg-red-700 flex justify-center items-center"><Trash2 size={18} /></div>}
        </Popconfirm>
    )
}
