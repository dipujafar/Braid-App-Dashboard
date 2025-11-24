import { Skeleton } from "@/components/ui/skeleton"

export default function SupportDetailsCardSkeleton() {
  return (
    <div className="border rounded-xl p-6 w-full space-y-6">
      
      {/* Details Header */}
      <Skeleton className="h-6 w-24" />

      {/* Fields */}
      <div className="space-y-4">
        {/* First Name */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Last Name */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Message Section */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* Reply */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* Send Button */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}
