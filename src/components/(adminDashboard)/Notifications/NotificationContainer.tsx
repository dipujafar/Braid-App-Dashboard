"use client";
import moment from "moment";
import { Trash2 } from "lucide-react";
import { useGetNotificationsQuery } from "@/redux/api/notificationApi";
import { useSearchParams } from "next/navigation";
import NotificationListSkeleton from "./NotificationContainerSkeleton";
import PaginationSection from "@/components/shared/PaginationSection";



const NotificationContainer = () => {
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "10";
  const queries: Record<string, string> = {};

  if (page) queries["page"] = page;
  if (limit) queries["limit"] = limit;

  const { data, isLoading } = useGetNotificationsQuery(queries);

  console.log(data?.data?.data);

  return (
    <div>
      <div className="min-h-[80vh] bg-section-bg p-7">
        {/* yesterday notification  */}
        <div className="xl:mt-8 mt-6 xl:px-10 px-6 text-text-color">
          <div className="flex gap-x-3 mb-3">
            <h5 className="font-medium text-2xl ">Notification</h5>
            {/* <div className="size-9 bg-main-color  rounded-full flex justify-center items-center text-lg text-white">
              {notificationData?.length}
            </div> */}
          </div>

          {
            isLoading && <NotificationListSkeleton />
          }
          {/* showing today notification */}
          {!isLoading && <div className="space-y-3">
            {data?.data?.data?.map((notification: any, index: number) => (
              <div className="flex items-center gap-x-4">
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg p-3 flex-1"
                >
                  <div className="flex justify-between gap-x-2 items-center">
                    <h5 className="font-medium text-xl">
                      {notification?.title}
                    </h5>
                    <p>{moment(notification?.createdAt).fromNow()}</p>
                  </div>
                  <p className="text-gray-400">{notification?.message}</p>
                </div>
                {/* delete option */}
                {/* <div className="bg-[#D30000]/30 size-10 flex justify-center items-center rounded-full cursor-pointer">
                  <Trash2 color="#D30000"></Trash2>
                </div> */}
              </div>
            ))}
          </div>}

          <PaginationSection total={data?.data?.meta?.totalDoc} current={Number(page)}
            pageSize={Number(limit)} />
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
