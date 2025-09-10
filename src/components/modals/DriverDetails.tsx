"use client";

import { Avatar, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import Image from "next/image";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};


const handleLicenseDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; 
    link.download = "resume.pdf";
    link.click();
  };


const DriverDetails = ({ open, setOpen }: TPropsType) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      width={800}
      style={{
        position: "relative",
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-gray-800">
            Driver Information
          </h4>
          <div
            className="w-10 h-10 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={15}
              className="text-red-600 group-hover:text-red-100 group"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 ">
          {/* Left Column - Vehicle Information */}
          <div className="space-y-3">
            <div className="border p-2 rounded">
              <div className="mb-4">
                <Image
                  src="/car_image.png"
                  alt="Vehicle"
                  width={180}
                  height={120}
                  className="rounded-lg object-cover "
                />
              </div>

              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-1">
                  Corolla Hatchback
                </h5>
                <p className="text-sm text-gray-600">Corolla Altis GR</p>
              </div>
            </div>

            <h6 className="font-semibold text-gray-800 mb-3">
              Vehicle Information
            </h6>

            <div className="space-y-3 text-sm border p-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Owner Name:</span>
                <span className="font-medium">Brooklyn Simmons</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Owner ID:</span>
                <span className="font-medium">M_office_101_23</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">License Plate:</span>
                <span className="font-medium">NYC</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Vehicle transportation license number:
                </span>
                <span className="font-medium">22 TH</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle Brand Name:</span>
                <span className="font-medium">Toyota</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">
                  Vehicle manufacturer and model:
                </span>
                <span className="font-medium truncate">Toyota Altron</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle Year:</span>
                <span className="font-medium">2024</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle Color:</span>
                <span className="font-medium">Red</span>
              </div>
            </div>
          </div>

          {/* Right Column - Driver Information */}
          <div className="border p-2 rounded" >
            <h6 className="font-semibold text-gray-800 mb-4">
              Driver Information
            </h6>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar src="/user_image1.png" size={100} />

                <div className="bg-green-500 absolute w-3 h-3 bottom-1 right-1 rounded-full border-2 border-white"></div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Driver Name:</span>
                <span className="font-medium">Brooklyn Simmons</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Driver Character:</span>
                <span className="font-medium">Good</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Driver Health:</span>
                <span className="font-medium">Good</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Driver Age:</span>
                <span className="font-medium">21 year</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">01-24-2024</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Driving License:</span>
                <span className="font-medium">
                     <button
                className="bg-main-color hover:bg-main-color text-white text-sm px-3 py-1 rounded"
                onClick={handleLicenseDownload}
              >
                Click here
              </button>
                </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">brooklyn77@gmail.com</span>
              </div>
              <hr />    
              <div className="flex justify-between">
                <span className="text-gray-600">Mobile Number:</span>
                <span className="font-medium">01234567890</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium">Male</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium">New York, USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DriverDetails;
