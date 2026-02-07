"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";

import { z } from "zod";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { StylistCarousel } from "./StylistCarousel";
import { FormData, formSchema, stylists } from "./utils.data";
import { useCreateCustomerMutation } from "@/redux/api/serviceBookingApi";


type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

export default function CreateBooking({ open, setOpen }: TPropsType) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      serviceType: "",
      category: "",
      serviceLocation: "",
      time: "",
      salon: "",
      stylist: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const userData = {
      name: data.customerName,
      email: data.customerEmail,
      phone: data.customerPhone,
    }
    try {
      // console.log(userData);
      const res = await createCustomer(userData).unwrap();
      console.log("Customer created:", res);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log("Booking submitted:", data);
      // setOpen(false);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    form.setValue("date", date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    form.setValue("time", time);
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className=" pb-4">
          <h2 className="text-lg font-medium">Create Booking</h2>
        </SheetHeader>

        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="haircut">Haircut</SelectItem>
                        <SelectItem value="coloring">Hair Coloring</SelectItem>
                        <SelectItem value="styling">Hair Styling</SelectItem>
                        <SelectItem value="treatment">
                          Hair Treatment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="salon">In Salon</SelectItem>
                        <SelectItem value="home">At Home</SelectItem>
                        <SelectItem value="office">At Office</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                        placeholder="Select date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <TimePicker
                        selectedTime={selectedTime}
                        onTimeSelect={handleTimeSelect}
                        placeholder="Select time"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Salon</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select salon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown Salon</SelectItem>
                        <SelectItem value="uptown">Uptown Beauty</SelectItem>
                        <SelectItem value="westside">
                          Westside Styles
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stylist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Stylist</FormLabel>
                    <StylistCarousel
                      stylists={stylists}
                      selectedStylist={field.value}
                      onStylistSelect={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type your notes here"
                        className="min-h-[80px] bg-slate-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
