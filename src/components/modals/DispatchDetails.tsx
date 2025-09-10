"use client"

import { cn } from "@/lib/utils"
import { tripStatusColor } from "@/utils/tripStatusColor"
import { Modal } from "antd"
import { RiCloseLargeLine } from "react-icons/ri"

type TPropsType = {
  open: boolean
  setOpen: (collapsed: boolean) => void
}

const DispatchDetails = ({ open, setOpen }: TPropsType) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "400px",
        position: "relative",
        backgroundColor: "#fff",
      }}
    >
      <div className="pb-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-medium text-gray-800">All Information</h4>
          <div
            className="w-8 h-8 bg-gray-300 hover:bg-gray-100 rounded-full flex justify-center items-center cursor-pointer duration-200"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={14} className="text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Conf. No.</span>
            <span className="font-medium text-gray-800">5A05-UO</span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trip Status</span>
            <div className={cn("flex items-center gap-2 px-2 rounded", tripStatusColor("Confirmed")?.className)}>
              {tripStatusColor("Confirmed")?.icon}
              <span className={cn("font-medium" )}>Confirmed</span>
            </div>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order Type</span>
            <span className="font-medium text-gray-800">Airport Pick up</span>
          </div>
          <hr />

          <div className="flex justify-between items-start">
            <span className="text-gray-600">Passenger</span>
            <div className="text-right">
              <div className="font-medium text-gray-800">Ishak Ahmed</div>
              <div className="text-sm text-gray-600">isahk@gmail.com</div>
              <div className="text-sm text-gray-600">+880 1324569810</div>
            </div>
          </div>
          <hr />

          <div className="flex justify-between items-start">
            <span className="text-gray-600">Driver</span>
            <div className="text-right">
              <div className="font-medium text-gray-800">Ishak Ahmed</div>
              <div className="text-sm text-gray-600">isahk@gmail.com</div>
              <div className="text-sm text-gray-600">+880 1324569810</div>
            </div>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Vehicle</span>
            <span className="font-medium text-gray-800">SUV</span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Date</span>
            <span className="font-medium text-gray-800">7-22-2025</span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pick up time</span>
            <span className="font-medium text-gray-800">3:40 PM</span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Drop off time</span>
            <span className="font-medium text-gray-800">5:20 PM</span>
          </div>
          <hr />

          <div className="flex justify-between items-start">
            <span className="text-gray-600">Pick up address</span>
            <div className="text-right max-w-48">
              <span className="font-medium text-gray-800">O'Hare International Airport</span>
            </div>
          </div>
          <hr />

          <div className="flex justify-between items-start">
            <span className="text-gray-600">Drop off Address</span>
            <div className="text-right max-w-48">
              <span className="font-medium text-gray-800">47 W 13th St, New York</span>
            </div>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trip type</span>
            <span className="font-medium text-gray-800">One way</span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Internal Comments</span>
            <span className="font-medium text-gray-800">I will go urgent</span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium text-gray-800">$550.00</span>
          </div>
          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Paid Status</span>
            <div className={cn("flex items-center gap-2 px-2 rounded", tripStatusColor("Confirmed")?.className)}>
             {tripStatusColor("Confirmed")?.icon}
              <span className="font-medium">Paid</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DispatchDetails
