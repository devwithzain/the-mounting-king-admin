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
               time: z.number({ message: "Time is required" }),
               price: z.number({ message: "Price is required" }),
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

export type TloginFormData = z.infer<typeof loginFormSchema>;
export type TprofileFormData = z.infer<typeof profileFormSchema>;
export type TserviceFormData = z.infer<typeof servicesFormSchema>;
export type TregisterFormData = z.infer<typeof registerFormSchema>;
export type TbillboardFormData = z.infer<typeof billboardFormSchema>;
export type TrequestHeroFormData = z.infer<typeof requestHeroFormSchema>;
export type TserviceHeroFormData = z.infer<typeof servicesHeroFormSchema>;
export type TserviceAdvantageFormData = z.infer<typeof servicesAdvantageFormSchema>;
export type TrequestServiceFormData = z.infer<typeof requestServicesFormSchema>;
