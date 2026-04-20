// NotificationListSkeleton.jsx
import { Skeleton } from "antd";

const items = [
  { hasIcon: false, descWidth: "55%" },
  { hasIcon: false, descWidth: "70%" },
  { hasIcon: true,  descWidth: "90%" },
  { hasIcon: false, descWidth: "65%" },
  { hasIcon: false, descWidth: "50%" },
  { hasIcon: false, descWidth: "48%" },
  { hasIcon: false, descWidth: "70%" },
  { hasIcon: true,  descWidth: "90%" },
];

export default function NotificationListSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 py-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-start bg-white border border-gray-100 rounded-xl px-5 py-4"
        >
          <div className="flex flex-col gap-2 flex-1">
            {/* Title row — with optional icon */}
            <div className="flex items-center gap-2.5">
              {item.hasIcon && (
                <Skeleton.Avatar
                  active
                  shape="square"
                  size={18}
                  className="rounded"
                />
              )}
              <Skeleton.Input active size="small" style={{ width: 160, height: 14 }} />
            </div>

            {/* Description — multi-line for icon items */}
            <div
              className="flex flex-col gap-1.5"
              style={{ paddingLeft: item.hasIcon ? 28 : 0 }}
            >
              <Skeleton.Input
                active
                size="small"
                style={{ width: item.descWidth, height: 12 }}
              />
              {item.hasIcon && (
                <Skeleton.Input active size="small" style={{ width: "55%", height: 12 }} />
              )}
            </div>
          </div>

          {/* Timestamp */}
          <Skeleton.Input
            active
            size="small"
            style={{ width: 72, height: 12, flexShrink: 0, marginLeft: 24 }}
          />
        </div>
      ))}
    </div>
  );
}