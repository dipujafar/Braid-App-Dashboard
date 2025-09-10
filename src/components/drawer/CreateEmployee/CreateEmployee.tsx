"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormData, formSchema } from "./CreateEmplyoyeeShema";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

export default function CreateEmployee({ open, setOpen }: TPropsType) {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      // Handle form submission here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAddVehicle = () => {
    router.push("#");
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <div className="w-full max-w-md mx-auto">
          <CardTitle className="text-lg font-medium text-center">
            Create New Employee
          </CardTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Create Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={handleAddVehicle}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                        onClick={handleAddVehicle}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 bg-muted/10">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Upload Driving Licence
                    </p>
                    <p className="text-xs text-muted-foreground">
                      File upload functionality temporarily disabled
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
