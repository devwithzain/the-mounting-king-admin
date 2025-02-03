import * as z from "zod";

export const loginFormSchema = z.object({
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(1, {
      message: "Password is required",
   }),
});

export const registerFormSchema = z.object({
   name: z.string().min(1, {
      message: "Name is required",
   }),
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(8, {
      message: "Minimum 8 characters required",
   }),
});

export const profileFormSchema = z.object({
   name: z.string().min(1, {
      message: "Name is required",
   }),
   email: z.string().email({
      message: "Email is required",
   }),
});

export const billboardFormSchema = z.object({
   label: z.string().min(1, {
      message: "Label is required",
   }),
});

export const servicesFormSchema = z.object({
   title: z.string().min(1, {
      message: "Title is required",
   }),
   description: z.string().min(1, {
      message: "Description is required",
   }),
});

export const servicesHeroFormSchema = z.object({
   title: z.string().min(1, {
      message: "Title is required",
   }),
});

export const requestHeroFormSchema = z.object({
   title: z.string().min(1, {
      message: "Title is required",
   }),
});

export const productHeroFormSchema = z.object({
   title: z.string().min(1, {
      message: "Title is required",
   }),
});

export const requestBookingFormSchema = z.object({
   title: z.string().max(255, {
      message: "Maximum 255 characters allowed"
   }).min(1, {
      message: "Title is required"
   }),
   description: z.string().max(255, {
      message: "Maximum 255 characters allowed"
   }).min(1, {
      message: "Description is required"
   }),
   days: z.array(z.string()).min(1, {
      message: "At least one day is required"
   }),
   timings: z.array(z.string()).min(1, {
      message: "At least one timing is required"
   }),
   is_active: z.boolean({
      required_error: "Active status is required"
   })
});

export const requestServicesFormSchema = z.object({
   service_title: z.string().min(1, {
      message: "Title is required",
   }),
   service_description: z.string().min(1, {
      message: "Description is required",
   }),
   steps: z.array(
      z.object({
         step_title: z.string().min(1, { message: "Step title is required" }),
         step_description: z.string().min(1, { message: "Step description is required" }),
         options: z.array(
            z.object({
               size: z.string().min(1, { message: "Size is required" }),
               time: z.any({ message: "Time is required" }),
               price: z.any({ message: "Price is required" }),
            })
         ),
      })
   ),
});

export const servicesAdvantageFormSchema = z.object({
   title: z.string().min(1, {
      message: "Title is required",
   }),
   subTitle: z.string().min(1, {
      message: "Sub Title is required",
   }),
   serviceTitle1: z.string().min(1, {
      message: "Service Title 1 is required",
   }),
   serviceTitle2: z.string().min(1, {
      message: "Service Title 2 is required",
   }),
   serviceTitle3: z.string().min(1, {
      message: "Service Title 3 is required",
   }),
   serviceDescription1: z.string().min(1, {
      message: "Service Description 1 is required",
   }),
   serviceDescription2: z.string().min(1, {
      message: "Service Description 2 is required",
   }),
   serviceDescription3: z.string().min(1, {
      message: "Service Description 3 is required",
   }),
   serviceImage1: z.string().min(1, {
      message: "Service Image 1 is required",
   }),
   serviceImage2: z.string().min(1, {
      message: "Service Image 2 is required",
   }),
   serviceImage3: z.string().min(1, {
      message: "Service Image 3 is required",
   }),
});

export const productsColumnSchema = z.object({
   title: z.string(),
   price: z.string(),
   color: z.string(),
   size: z.string(),
   category: z.string(),
   shortDescription: z.string(),
   description: z.string(),
   images: z.any(z.any()),
});

export const servicesColumnSchema = z.object({
   title: z.string(),
   short_description: z.string(),
   description: z.string(),
   image: z.any(),
});

export type TloginFormData = z.infer<typeof loginFormSchema>;
export type TprofileFormData = z.infer<typeof profileFormSchema>;
export type TserviceFormData = z.infer<typeof servicesFormSchema>;
export type TregisterFormData = z.infer<typeof registerFormSchema>;
export type TbillboardFormData = z.infer<typeof billboardFormSchema>;
export type TproductFormData = z.infer<typeof productHeroFormSchema>;
export type TservicesColumnProps = z.infer<typeof servicesColumnSchema>;
export type TproductsColumnProps = z.infer<typeof productsColumnSchema>;
export type TrequestHeroFormData = z.infer<typeof requestHeroFormSchema>;
export type TserviceHeroFormData = z.infer<typeof servicesHeroFormSchema>;
export type TrequestBookingFormData = z.infer<typeof requestBookingFormSchema>;
export type TrequestServiceFormData = z.infer<typeof requestServicesFormSchema>;
export type TserviceAdvantageFormData = z.infer<typeof servicesAdvantageFormSchema>;
