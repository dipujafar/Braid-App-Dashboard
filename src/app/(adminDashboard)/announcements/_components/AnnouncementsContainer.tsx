"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ImageIcon, Trash2 } from "lucide-react"

const promoFormSchema = z.object({
  promoCode: z.string().min(1, "Promo code is required").min(3, "Promo code must be at least 3 characters"),
})

interface PromoItem {
  id: string
  name: string
  thumbnail?: string
  bannerUrl?: string
}

export default function AnnouncementsContainer() {
  const form = useForm<z.infer<typeof promoFormSchema>>({
    resolver: zodResolver(promoFormSchema),
    defaultValues: {
      promoCode: "",
    },
  })

  const [promoItems, setPromoItems] = useState<PromoItem[]>([
    {
      id: "1",
      name: "Product Announcing",
      bannerUrl: "/hair-style.jpg",
    },
    {
      id: "2",
      name: "Product Announcing",
      bannerUrl: "/hair-style.jpg",
    },
    {
      id: "3",
      name: "Product Announcing",
      bannerUrl: "/hair-style.jpg",
    },
    {
      id: "4",
      name: "Product Announcing",
      bannerUrl: "/hair-style.jpg",
    },
    {
      id: "5",
      name: "Product Announcing",
      bannerUrl: "/hair-style.jpg",
    },
  ])

  const onSubmit = (values: z.infer<typeof promoFormSchema>) => {
    console.log("Saving promo code:", values.promoCode)
    // Add your save logic here
    form.reset()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newItem: PromoItem = {
            id: Date.now().toString() + index,
            name: "Product Announcing",
            bannerUrl: e.target?.result as string,
          }
          setPromoItems((prev) => [...prev, newItem])
        }
        reader.readAsDataURL(file)
      })
      console.log("Files uploaded:", files)
    }
  }

  const handleDeleteItem = (id: string) => {
    setPromoItems(promoItems.filter((item) => item.id !== id))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Announcements</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Promo Control */}
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="promoCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Control</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter promo code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#4625A0] hover:bg-[#49328a] text-white">
                Save
              </Button>
            </form>
          </Form>
        </div>

        {/* Right Side - Banner Image Upload and List */}
        <div className="space-y-6">
          {/* Image Upload Area */}
          <div className="relative">
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center">Drop your images here, or browse</p>
              <p className="text-xs text-gray-500 mt-1">Jpeg, png are allowed</p>
            </label>
          </div>

          {/* Promo Items List */}
          <div className="space-y-3">
            {promoItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                      {item.bannerUrl ? (
                        <img
                          src={item.bannerUrl || "/placeholder.svg"}
                          alt="Banner thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
