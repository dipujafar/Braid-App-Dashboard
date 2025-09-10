import { Avatar, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import { useState } from "react";
import { affiliatedStylists, reviews } from "./utils";
import AffiliatedStylistsDetailsModal from "../AffiliatedStylistsDetailsModal";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const handleResumeDownload = () => {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.download = "resume.pdf";
  link.click();
};

const SalonOwnerDetails = ({ open, setOpen }: TPropsType) => {
  const [affiliatedStylistsModal, setAffiliatedStylistsModal] = useState(false);
  return (
    <>
      <Modal
        open={open}
        footer={null}
        centered={true}
        onCancel={() => setOpen(false)}
        closeIcon={false}
        style={{
          minWidth: "max-content",
          position: "relative",
          backgroundColor: "#000",
        }}
      >
        <div className="pb-20">
          <div className="flex justify-between items-center">
            <div></div>
            <div
              className="size-8 bg-transparent border border-red-500 hover:bg-red-600   rounded-full flex justify-center items-center cursor-pointer group duration-500"
              onClick={() => setOpen(false)}
            >
              <RiCloseLargeLine
                size={15}
                className="text-red-600 group-hover:text-red-100 group"
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row  gap-5 ">
            {/* --------------------- owner info --------------------- */}
            <div className="flex-1">
              <div className="w-fit mx-auto relative">
                <Avatar src="/user_image1.png" size={120} />
                <div className="bg-green-600 absolute size-3 bottom-5 right-3 rounded-full border-2"></div>
              </div>
              <div className="mt-10 space-y-4">
                <div className="flex justify-between">
                  <h4>Full Name :</h4>
                  <p className="font-medium">Enrique</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Salon Name : </h4>
                  <p className="font-medium">Salon de elegance</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Mobile Number :</h4>
                  <p className="font-medium">12345678</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Email :</h4>
                  <p className="font-medium">jamestracy@gmail.com</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Business Registration Number :</h4>
                  <p className="font-medium">123456789</p>
                </div>

                <hr />
                <div className="flex justify-between">
                  <h4>Gender :</h4>
                  <p className="font-medium">Male</p>
                </div>
                <hr />

                <div className="flex justify-between">
                  <h4>Address :</h4>
                  <p className="font-medium">
                    2715 Ash Dr. San Jose, South Dakota 83475
                  </p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Joining date :</h4>
                  <p className="font-medium">16 Aug 2024</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>ID Card :</h4>
                  <button
                    className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                    onClick={handleResumeDownload}
                  >
                    Click here
                  </button>
                </div>
                <hr />
                <div className="flex justify-between">
                  <h4>Business registration :</h4>
                  <button
                    className="bg-main-color hover:bg-blue-800 text-white text-sm px-3 py-1 rounded"
                    onClick={handleResumeDownload}
                  >
                    Click here
                  </button>
                </div>
                <hr />
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Affiliated Stylists</h4>
                <div className="flex gap-6">
                  {affiliatedStylists?.map((stylist, index) => (
                    <div
                      key={index}
                      className="text-center cursor-pointer"
                      onClick={() => {
                        setAffiliatedStylistsModal(true);
                        setOpen(false);
                      }}
                    >
                      <Avatar size={50} src={stylist?.avatar} className="mb-2" />
                      <div className="text-xs font-medium">{stylist?.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* ------------------------------ rating and review    ---------------- */}

            <div className="flex-1">
              {/* Right side - Rating & Reviews */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Rating & Reviews</h3>
                <div className="flex items-start gap-6">
                  <div className="text-3xl font-bold">4.8</div>
                  <div className="flex-1">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex text-[#41AB5D] w-16">★★★★★</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="text-gray-600 w-6 text-right">12</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex text-[#41AB5D] w-16">★★★★☆</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                        <span className="text-gray-600 w-6 text-right">5</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex text-[#41AB5D] w-16">★★★☆☆</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                        <span className="text-gray-600 w-6 text-right">4</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex text-[#41AB5D] w-16">★★☆☆☆</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "10%" }}
                          ></div>
                        </div>
                        <span className="text-gray-600 w-6 text-right">2</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex text-[#41AB5D] w-16">★☆☆☆☆</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                        <span className="text-gray-600 w-6 text-right">0</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">23 ratings</div>
                  </div>
                </div>
              </div>
              <div className="my-6">
                <div className=" overflow-y-auto space-y-4 pr-2">
                  {reviews?.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0"
                    >
                      <Avatar size={40} src={review.avatar} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {review.name}
                          </span>
                          <div className="flex text-yellow-400 text-xs">
                            {"★".repeat(review.rating)}
                          </div>
                          <span className="text-gray-400 text-xs ml-auto">
                            {review.timeAgo}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <AffiliatedStylistsDetailsModal
        open={affiliatedStylistsModal}
        setOpen={setAffiliatedStylistsModal}
      />
    </>
  );
};

export default SalonOwnerDetails;
