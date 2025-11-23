import React from 'react'

export default function ContentSkeleton() {
    return (
        <div className="w-full min-h-screen  text-white p-5">
            {/* Header Skeleton */}
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#d2d8d6] animate-pulse w-6 h-6 rounded" />
                <div className="bg-[#d2d8d6] animate-pulse w-48 h-7 rounded" />
            </div>

            {/* Editor Container */}
            <div className="w-full border border-neutral-700 rounded-lg bg-[#d2d8d6] p-3">
                {/* Toolbar Skeleton */}
                <div className="flex items-center gap-3 pb-3 border-b border-neutral-700">
                    <div className="bg-[#F3FAF8] animate-pulse h-8 w-20 rounded" />
                    <div className="bg-[#F3FAF8] animate-pulse h-8 w-8 rounded" />
                    <div className="bg-[#F3FAF8] animate-pulse h-8 w-8 rounded" />
                    <div className="bg-[#F3FAF8] animate-pulse h-8 w-8 rounded" />
                </div>

                {/* Editor Area Skeleton */}
                <div className="mt-4 h-[calc(100vh-380px)] bg-[#F3FAF8] animate-pulse rounded" />
            </div>

            {/* Save Button Skeleton */}
            <div className="mt-5 w-full">
                <div className="bg-[#d2d8d6] animate-pulse h-12 w-full rounded-xl" />
            </div>
        </div>
    )
}
