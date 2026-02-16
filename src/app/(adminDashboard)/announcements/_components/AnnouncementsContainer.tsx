"use client";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { ImageIcon, Trash2 } from "lucide-react";
import { Image, Popconfirm, PopconfirmProps } from "antd";
import { useDeleteAnnouncementMutation, useGetAnnouncementQuery, useUploadAnnouncementMutation } from "@/redux/api/announcementApi";
import { toast } from "sonner";

export default function AnnouncementsContainer() {
  const { data } = useGetAnnouncementQuery(undefined);
  const [uploadBanner] = useUploadAnnouncementMutation(undefined);
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();





  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];
    const formData = new FormData();

    if (files) {
      formData.append("images", files);
    }

    toast.loading("Uploading Announcement...", { id: "announcement-upload" });
    try {
      await uploadBanner(formData).unwrap();
      toast.success("Successfully uploaded image");
      toast.dismiss("announcement-upload");
    } catch (error) {
      toast.error("Failed to upload image");
      toast.dismiss("announcement-upload");
    }
  };

  const confirm = async (id: string) => {
    try {
      await deleteAnnouncement(id).unwrap();
      toast.success("Successfully deleted announcement");
    } catch (error) {
      toast.error("Failed to delete announcement");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Announcements
      </h1>

      <div className="">
        {/* Left Side - Promo Control */}
        {/* <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="promoCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Control</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter promo code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#4625A0] hover:bg-[#49328a] text-white"
              >
                Save
              </Button>
            </form>
          </Form>
        </div> */}

        {/* Right Side - Banner Image Upload and List */}
        <div className="space-y-6">
          <h6 className="font-medium">Upload Banner</h6>
          {/* Image Upload Area */}
          <div className="relative">
            <input
              type="file"
              id="image-upload"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Drop your images here, or browse
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Jpeg, png are allowed
              </p>
            </label>
          </div>

          {/* Promo Items List */}
          <div className="space-y-3">
            {data?.data?.result?.map((item: any) => (
              item?.images?.map((image: any) => (
                <Card key={image?.key} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-20 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                        <Image
                          src={image?.url || "/placeholder.svg"}
                          alt="Banner thumbnail"
                          className="w-full h-full"
                        />

                      </div>
                      <span className="text-lg font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    {/* <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button> */}

                    <Popconfirm
                      title="Delete the Announcement"
                      description="Are you sure to delete this Announcement?"
                      onConfirm={() => confirm(item?._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Trash2 color="red" className="w-5 h-5 cursor-pointer" />
                    </Popconfirm>
                  </div>
                </Card>
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
