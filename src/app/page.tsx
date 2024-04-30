"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
export const roleOptions = [
  "admin",
  "manager",
  "agent",
  "driver",
  "affiliate",
  "passenger",
] as const;
export type RoleOptions = (typeof roleOptions)[number];

export const mappedRoleOptions: { [key in RoleOptions]: string } = {
  admin: "Admin",
  manager: "Manager",
  agent: "Agent",
  driver: "Driver",
  affiliate: "Affliate",
  passenger: "PSassenger",
};
const schema = z.object({
  phone: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value) {
          // Check if the provided value is a valid phone number (assuming phone numbers are at least 10 digits)
          return /^\d{10,}$/.test(value);
        }
        return true; // If the value is not provided, it passes validation
      },
      {
        message: "Invalid phone number",
      }
    ),

  name: z.string().regex(/^\S+ \S+$/, { message: "Enter your full name" }), // Assuming full name format: Firstname Lastname
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Must contain atleaset 6 character(s)" }),
  mobile: z.string().min(10, { message: "Required" }), // Assuming mobile numbers are at least 10 digits
  address: z.string().nonempty({ message: "Required" }),
  city: z.string().nonempty({ message: "Required" }),
  zipcode: z
    .string()
    .min(4, { message: "Must contain atleaset 4 character(s)" }),
  state: z.string().nonempty({ message: "Required" }),
  active: z.boolean().default(true),
  country: z.enum(["india", "pakistan", "america"]),
  role: z.enum(roleOptions, {
    errorMap: () => ({ message: "Please select a role" }),
  }),
});
type FormFields = z.infer<typeof schema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    // Default values
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema), // Connext schema to react-hoot-form using resolver
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // For backend errors
    try {
      schema.parse(data);
      console.log(schema.safeParse(data));
    } catch (error) {
      console.error("Data is invalid:", errors);
    }
  };
  const roleOptions = Object.entries(mappedRoleOptions).map(
    ([value, label]) => (
      <SelectItem value={value} key={value}>
        {label}
      </SelectItem>
    )
  );
  return (
    <div>
      <h1 className="text-center text-2xl font-bold p-10">React Hook From</h1>
      <div className="flex justfy-center items-center h-full w-full mt-16 md:mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" max-w-full md:max-w-[90vw] mx-auto p-16 rounded-lg drop-shadow bg-white dark:bg-background dark:border-[0.5px]"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <Label>Name*</Label>
              <Input
                {...register("name")}
                name="name"
                className="w-full"
                type="text"
                placeholder="John Smith"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Label>Email*</Label>
              <Input
                {...register("email")}
                name="email"
                className="w-full"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <Label>Password*</Label>
              <Input
                {...register("password")}
                name="password"
                className="w-full"
                type="password"
                placeholder="Enter Password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <Label>Role*</Label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent
                  id="roleOptions"
                  {...register("role", { required: true })}
                >
                  {roleOptions}
                </SelectContent>
              </Select>
              {errors.role && (
                <span className="text-red-500 text-xs">
                  {errors.role.message}
                </span>
              )}
            </div>
            <div>
              <Label>Phone #</Label>
              <Input
                {...register("phone")}
                name="phone"
                className="w-full"
                type="tel"
                placeholder="+123456789"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <Label>Mobile*</Label>
              <Input
                {...register("mobile")}
                className="w-full"
                name="mobile"
                type="tel"
                placeholder="+1 555-123-4567"
              />
              {errors.mobile && (
                <span className="text-red-500 text-xs">
                  {errors.mobile.message}
                </span>
              )}
            </div>
            <div>
              <Label>Address*</Label>
              <Input
                {...register("address")}
                className="w-full"
                name="address"
                type="text"
                placeholder="123 Main Street"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div>
              <Label>City*</Label>
              <Input
                {...register("city")}
                className="w-full"
                name="city"
                placeholder="Enter City"
                type="text"
              />
              {errors.city && (
                <span className="text-red-500 text-xs">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div>
              <Label>Zipcode*</Label>
              <Input
                {...register("zipcode")}
                className="w-full"
                name="zipcode"
                type="number"
                placeholder="12345"
              />
              {errors.zipcode && (
                <span className="text-red-500 text-xs">
                  {errors.zipcode.message}
                </span>
              )}
            </div>
            <div>
              <Label>State*</Label>
              <Input
                {...register("state")}
                className="w-full"
                name="state"
                placeholder="Enter State"
                type="text"
              />
              {errors.state && (
                <span className="text-red-500 text-xs">
                  {errors.state.message}
                </span>
              )}
            </div>

            <div>
              <Label>Country*</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent {...register("country", { required: true })}>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="america">America</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && (
                <span className="text-red-500 text-xs">
                  {errors.country.message}
                </span>
              )}
            </div>

            <div className="flex align-baseline items-center justify-center px-5 space-x-2 pt-[1.75rem]">
              <Label htmlFor="Is-Active" className="text-xl">
                Is Active
              </Label>
              <Switch {...register("active")} id="Is-Active" className="mt-1" />
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <div>
              <Button
                disabled={isSubmitting}
                className="px-[7rem]"
                type="submit"
              >
                {/* <Link
                    href={{
                      pathname: "/users/next",
                    }}
                  > */}
                <span>{isSubmitting ? "Loading..." : "Submit"}</span>
                {/* </Link> */}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
