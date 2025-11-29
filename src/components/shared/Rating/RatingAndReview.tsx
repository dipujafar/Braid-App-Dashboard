import { Image } from "antd";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import RatingBreakdown from './RatingBreakdown';

export default function RatingAndReview({ reviews, avgRating }: any) {
    return (
        <div className="flex-1 lg:min-w-[400px]">
            {/* Right side - Rating & Reviews */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Rating & Reviews</h3>
                <div className="flex items-start gap-5">
                    <div className="text-3xl font-bold">{Number(avgRating).toFixed(2)}</div>
                    <div className="flex-1">
                        <RatingBreakdown reviews={reviews} />
                        <div className="text-sm text-gray-500 mt-2">{reviews?.length} ratings</div>
                    </div>
                </div>
            </div>
            <div className="my-6">
                <div className=" overflow-y-auto space-y-4 pr-2">
                    {reviews?.map((review: any) => (
                        <div
                            key={review.id}
                            className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0"
                        >
                            <div>

                                {review?.user?.image ? <Image
                                    src={review?.user?.image}
                                    alt="user_image"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                /> : <Avatar > <AvatarFallback className="w-full flex-center uppercase text-lg bg-gray-200 text-black " >{review?.user?.fullName?.charAt(0)} </AvatarFallback></Avatar>
                                }
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">
                                        {review?.user?.fullName}
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
    )
}
