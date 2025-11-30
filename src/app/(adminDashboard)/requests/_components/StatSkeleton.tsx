"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        <Skeleton className="h-4 w-32" />
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />


                </CardContent>
            </Card>

            {/* Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        <Skeleton className="h-4 w-32" />
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />


                </CardContent>
            </Card>

            {/* Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        <Skeleton className="h-4 w-32" />
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />


                </CardContent>
            </Card>

            {/* Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        <Skeleton className="h-4 w-32" />
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                </CardContent>
            </Card>

        </div>
    );
}
