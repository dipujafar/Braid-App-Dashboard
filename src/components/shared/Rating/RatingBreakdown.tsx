import React from "react";

interface Review {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    image: string;
  };
  owner: string;
  comment: string;
  rating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RatingBreakdownProps {
  reviews: Review[];
}

const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ reviews }) => {
  // Count ratings
  const ratingCounts: Record<number, number> = [1, 2, 3, 4, 5]?.reduce(
    (acc, star) => {
      acc[star] = reviews?.filter((r) => r?.rating === star)?.length;
      return acc;
    },
    {} as Record<number, number>
  );

  const totalReviews = reviews?.length;

  const getStars = (count: number): string => {
    return "★★★★★"?.slice(0, count) + "☆☆☆☆☆".slice(0, 5 - count);
  };

  return (
    <div className="space-y-1">
      {[5, 4, 3, 2, 1]?.map((star) => {
        const count = ratingCounts[star];
        const percent = totalReviews ? (count / totalReviews) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-3 text-sm">
            {/* ⭐ Golden Stars */}
            <div className="flex text-yellow-500 w-16">
              {getStars(star)}
            </div>

            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <span className="text-gray-600 w-6 text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
