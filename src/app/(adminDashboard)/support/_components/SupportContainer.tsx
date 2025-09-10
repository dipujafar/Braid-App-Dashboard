"use client";
import SupportTable from "./SupportTable";
import { SupportDetailsCard } from "./SupportDetailsCard";
import { useState } from "react";

export default function SupportContainer() {
    const [selectedSupport, setSelectedSupport] = useState(0);
  return (
    <div className="flex lg:flex-row flex-col gap-5 ">
      <div className="lg:w-2/3">
        <SupportTable selectedSupport={selectedSupport} setSelectedSupport={setSelectedSupport} />
      </div>
      <div className="lg:w-1/3">
        <SupportDetailsCard />
      </div>
    </div>
  );
}
