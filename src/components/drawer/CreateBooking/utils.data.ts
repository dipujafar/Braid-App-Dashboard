import * as z from "zod";
export const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  serviceType: z.string().min(1, "Service type is required"),
  category: z.string().min(1, "Category is required"),
  serviceLocation: z.string().min(1, "Service location is required"),
  date: z.date({ required_error: "Date is required" }),
  time: z.string().min(1, "Time is required"),
  salon: z.string().min(1, "Salon is required"),
  stylist: z.string().min(1, "Stylist is required"),
  notes: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;



export const stylists = [
    {
      id: "1",
      name: "Sarah",
      image: "/female-stylist.jpg",
    },
    {
      id: "2",
      name: "Mike",
      image: "/male-stylist.jpg",
    },
    {
      id: "3",
      name: "Anna",
      image: "/female-stylist-brunette.jpg",
    },
    {
      id: "4",
      name: "James",
      image: "/male-stylist-beard.jpg",
    },
    {
      id: "5",
      name: "Samantha",
      image: "/female-stylist-blonde.jpg",
    },
    {
      id: "6",
      name: "David",
      image: "/male-stylist.jpg",
    },
    {
      id: "7",
      name: "Emma",
      image: "/female-stylist-redhead.jpg",
    },
    {
      id: "8",
      name: "Lucas",
      image: "/male-stylist-beard.jpg",
    },
  ];
