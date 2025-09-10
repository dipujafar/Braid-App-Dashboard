import { CheckIcon, ListIcon, PinIcon } from "@/icons";

export const tripStatusColor = (tripStatus: string) => {
  switch (tripStatus) {
    case "Confirmed":
      return { icon: <CheckIcon />, className: "bg-[#E4FFE8] text-[#4BB543]" };
    case "Passenger on board":
      return { icon: <PinIcon />, className: "bg-[#E1EDFF] text-[#3A86FF]" };
    case "Done":
      return { icons: <ListIcon />, className: "bg-[#E1EDFF] text-[#3A86FF]" };
    default:
      return { icons: <CheckIcon />, className: "text-black bg-white" };
  }
};
