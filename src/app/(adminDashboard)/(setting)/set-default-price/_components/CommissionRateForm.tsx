"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useGetPriceQuery, useUpdatePriceMutation } from "@/redux/api/priceApi"


const formSchema = z.object({
  rate: z.string()
    .min(0, { message: "Commission rate must be at least 0%" })
    .max(100, { message: "Commission rate cannot exceed 100%" }),
})

type FormValues = z.infer<typeof formSchema>

export function CommissionRateForm() {
  const { data: commissionRate, isLoading: commissionRateLoading } = useGetPriceQuery(undefined);
  const [serConfirmationPrice, { isLoading }] = useUpdatePriceMutation();
  const [sameValue, setSameValue] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: "",
    },
  });

  const { setValue } = form;

  const currentRate = useWatch({ control: form.control, name: "rate" });


  useEffect(() => {
    if (commissionRate?.data?.price) {
      setValue("rate", String(commissionRate?.data?.price));
    }

  }, [commissionRate?.data?.price, setValue]);

  useEffect(() => {
    if (currentRate === String(commissionRate?.data?.price)) {
      setSameValue(true);
    } else {
      setSameValue(false);
    }
  }, [currentRate, commissionRate?.data?.price]);

  async function onSubmit(values: FormValues) {
    if (values.rate === "") {
      toast.error("Please enter a confirmation price.");
      return;
    }
    const priceData = {
      price: Number(values.rate),
    }
    try {
      await serConfirmationPrice(priceData).unwrap();
      toast.success("Confirmation price updated successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update confirmation price.");
    }
  }

  return (
    <Card className="w-full  border-none shadow-none bg-gray-50 p-10">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold text-slate-800">Set Order Confirmation Rate</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">Confirmation Price</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center border rounded-md focus-visible:ring-blue-800">
                      <span className="text-lg border-r px-1">$</span>
                      <Input
                        type="number"
                        placeholder="Enter order confirmation price"
                        className="h-12 border-slate-200 ring-0 border-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 shadow-none pl-1"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button
                disabled={isLoading || commissionRateLoading || sameValue}
                type="submit"
                className="w-full max-w-[300px] h-12 bg-main-color hover:bg-main-color/80 text-white font-semibold border-none shadow-none rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save  Price
                {/* {isLoading && commissionRateLoading && <Spin />} */}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
