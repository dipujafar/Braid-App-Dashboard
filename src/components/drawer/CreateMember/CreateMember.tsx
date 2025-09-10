"use client";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "../../ui/sheet";
import { FormData, formSchema, roleOptions } from "./CreateMemberFormShema";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};





const CreateMember = ({ open, setOpen }: TPropsType) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md py-5">
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
                        <FormLabel className="text-gray-600">
                          First Name*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-100 border-0 focus:bg-white transition-colors"
                            placeholder=""
                          />
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
                        <FormLabel className="text-gray-600">
                          Last Name*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-gray-100 border-0 focus:bg-white transition-colors"
                            placeholder=""
                          />
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
                        <FormLabel className="text-gray-600">Email*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-gray-100 border-0 focus:bg-white transition-colors"
                            placeholder=""
                          />
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
                        <FormLabel className="text-gray-600">
                          Phone Number*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="bg-gray-100 border-0 focus:bg-white transition-colors"
                            placeholder=""
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Role*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-100 border-0 focus:bg-white transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roleOptions?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 mt-6"
                  >
                    Invite Member
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateMember;
