import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoriesSkeletonContainer() {
    return (

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {Array.from({ length: 15 }).map((_, i) => (
                <Card key={i} className="flex flex-col items-center py-6 border border-[#BBBBBB]">
                    <CardContent className="flex flex-col items-center gap-4 w-full">
                        {/* Avatar Skeleton */}
                        <Skeleton className="h-24 w-24 rounded-full" />

                        {/* Title Skeleton */}
                        <Skeleton className="h-5 w-32" />
                    </CardContent>

                    <CardFooter className="flex gap-4">
                        {/* Buttons Skeleton */}
                        <Skeleton className="h-8 w-16 rounded-md" />
                        <Skeleton className="h-8 w-16 rounded-md" />
                    </CardFooter>
                </Card>
            ))}
        </div>

    )
}
