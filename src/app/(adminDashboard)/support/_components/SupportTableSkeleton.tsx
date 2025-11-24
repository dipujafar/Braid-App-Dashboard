import { Skeleton } from '@/components/ui/skeleton'

export default function SupportTableSkeleton() {
    return (
        <div className="w-full border rounded-md overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-muted/60 py-4 px-6 font-medium text-sm">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>

            {/* Rows */}
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className="grid grid-cols-4 items-center py-4 px-6 border-b last:border-none"
                >
                    {/* Name + Avatar */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>

                    {/* Email */}
                    <Skeleton className="h-4 w-48" />

                    {/* Phone */}
                    <Skeleton className="h-4 w-24" />

                    {/* Date */}
                    <Skeleton className="h-4 w-28" />
                </div>
            ))}
        </div>
    )
}
