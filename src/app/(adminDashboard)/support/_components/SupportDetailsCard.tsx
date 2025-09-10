"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function SupportDetailsCard() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
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
            <span className=" text-black font-medium">Istik</span>
          </div>

          <div className="flex justify-between items-center">
            <span className=" text-gray-600">Last name :</span>
            <span className=" text-black font-medium">Ahamed</span>
          </div>

          <div className="flex justify-between items-center">
            <span className=" text-gray-600">Email :</span>
            <span className=" text-black font-medium">isahmed739@gmail.com</span>
          </div>

          <div className="flex justify-between items-center">
            <span className=" text-gray-600">Phone number :</span>
            <span className=" text-black font-medium">123456789</span>
          </div>

          <div className="space-y-2">
            <span className="text-lg ">Message :</span>
            <p className="text-sm text-gray-500 leading-relaxed">
              Collision Center Inc. specializes in professional automobile detailing, offering top-quality services
              including paint correction, interior cleaning, and polishing to restore vehicles to pristine condition
              with precision and care.
            </p>
          </div>
        </div>

        {/* Reply Section */}
        <div className="pt-4 space-y-3">
          <h3 className=" font-medium text-black">Reply</h3>

          <Textarea
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none border-gray-200 text-sm placeholder:text-gray-400"
          />

          <Button
            onClick={handleSend}
            className="w-full bg-[#4625A0] hover:bg-[#563f96] text-white font-medium py-2.5"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
