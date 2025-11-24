import React from "react";
import { Skeleton, Card } from "antd";

const PersonalInformationSkeleton = () => {
    return (
        <div className="mt-10 flex justify-center gap-x-5 max-w-[1200px] mx-auto">
         
                {/* Left Section (Profile Card) */}
                <div >
                    <Card
                        style={{
                            padding: "24px",
                            textAlign: "center",
                            background: "#f1e8ff",
                            borderRadius: 12,
                            minWidth: "350px"
                        }}
                    >
                        {/* Profile Image Skeleton */}
                        <Skeleton.Avatar active size={120} shape="circle" />

                        <div style={{ marginTop: 20 }}>
                            <Skeleton.Input active style={{ width: 120 }} />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Skeleton.Input active style={{ width: 80 }} />
                        </div>
                    </Card>
                </div>

                {/* Right Section (Form Fields) */}
                <div  className="flex-1" >
                    <div style={{ display: "flex", flexDirection: "column", gap: 32, minWidth: "350px" }}>
                        {/* Name */}
                        <div>
                            <Skeleton.Input active style={{ width: 120, marginBottom: 8, background: "#e5e7eb" }} />
                            <Skeleton.Input active block style={{ height: 40, background: "#f1e8ff" }} />
                        </div>

                        {/* Email */}
                        <div>
                            <Skeleton.Input active style={{ width: 120, marginBottom: 8, background: "#e5e7eb" }} />
                            <Skeleton.Input active block style={{ height: 40, background: "#f1e8ff" }} />
                        </div>

                        {/* Phone */}
                        <div>
                            <Skeleton.Input active style={{ width: 150, marginBottom: 8, background: "#e5e7eb" }} />
                            <Skeleton.Input active block style={{ height: 40, background: "#f1e8ff" }} />
                        </div>
                    </div>
                </div>
            
        </div>
    );
};

export default PersonalInformationSkeleton;
