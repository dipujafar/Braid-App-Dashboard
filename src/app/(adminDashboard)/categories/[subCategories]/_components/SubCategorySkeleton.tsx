import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SubCategorySkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="flex flex-col items-center py-8">
            <CardContent className="flex flex-col items-center gap-4 w-full">
              
              {/* Icon Skeleton */}
              <Skeleton className="h-24 w-24 rounded-full" />

              {/* Category Name */}
              <Skeleton className="h-5 w-36" />

            </CardContent>

            <CardFooter className="flex gap-4">
              {/* Delete Button */}
              <Skeleton className="h-9 w-20 rounded-md" />

              {/* Edit Button */}
              <Skeleton className="h-9 w-20 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center gap-4">
        <Skeleton className="h-6 w-6 rounded-md" /> {/* left arrow */}
        <Skeleton className="h-8 w-8 rounded-md" /> {/* page number */}
        <Skeleton className="h-6 w-6 rounded-md" /> {/* right arrow */}
      </div>
    </div>
  )
}
