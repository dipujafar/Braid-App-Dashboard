"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useGetSingleSupportDetailsQuery, useSendReplyMutation } from "@/redux/api/supportsApi"
import { useSearchParams } from "next/navigation"
import SupportDetailsCardSkeleton from "./SupportDetailsCardSkeleton"
import { toast } from "sonner"
import { Button } from "antd"

export function SupportDetailsCard({ selectedId }: { selectedId: string }) {
  const [message, setMessage] = useState("");
  const { data, isLoading } = useGetSingleSupportDetailsQuery(selectedId, { skip: !selectedId });
  const [sendReply, { isLoading: isSending }] = useSendReplyMutation();

  if (isLoading) return <SupportDetailsCardSkeleton />


  const handleSend = async () => {
    try {
      await sendReply({ id: selectedId, data: { messageReply: message } }).unwrap();
      toast.success("Successfully sent reply");
    }
    catch (error: any) {
      toast.error(error?.data?.message);
    }
    console.log("Sending message:", message)
    // Handle send logic here
  }

  return (
    <Card className="w-full  bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-black">Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className=" text-gray-600">First name :</span>
            <span className=" text-black font-medium capitalize">{data?.data?.firstName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className=" text-gray-600">Last name :</span>
            <span className=" text-black font-medium capitalize">{data?.data?.lastName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className=" text-gray-600">Email :</span>
            <span className=" text-black font-medium">{data?.data?.email}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className=" text-gray-600">Phone number :</span>
            <span className=" text-black font-medium">{data?.data?.phone}</span>
          </div>

          <div className="space-y-2">
            <span className="text-lg ">Message :</span>
            <p className="text-sm text-gray-500 leading-relaxed">
              {data?.data?.message}
            </p>
          </div>
        </div>

        {/* Reply Section */}
        <div className="pt-4 space-y-3">
          <h3 className=" font-medium text-black">Reply</h3>

          <Textarea
            placeholder="Your message..."
            value={message || data?.data?.messageReply}
            defaultValue={data?.data?.messageReply}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none border-gray-200 text-sm placeholder:text-gray-400"
          />

          <Button
            onClick={handleSend}
            loading={isSending}
            className="w-full bg-[#4625A0] hover:bg-[#563f96] text-white font-medium py-2.5"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
