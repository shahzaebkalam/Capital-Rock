"use client";

import React, { useState, useRef } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { CalendarIcon, CheckIcon } from "@/lib/icons";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Avatar from "../ui/Avatar";

export default function ProfileSettings() {
  const [profileImage, setProfileImage] = useState<string>("/avatar.jpg");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    countryOfResidence: "",
    preferredLanguage: "",
    dateOfBirth: "",
    address: "",
    taxId: "",
    investorType: "",
    jurisdiction: "",
  };

  const nationalityOptions = [
    { value: "germany", label: "Germany" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "france", label: "France" },
  ];

  const countryOptions = [
    { value: "germany", label: "Germany" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "france", label: "France" },
  ];

  const languageOptions = [
    { value: "english-german", label: "English / German" },
    { value: "english", label: "English" },
    { value: "german", label: "German" },
    { value: "french", label: "French" },
  ];

  const investorTypeOptions = [
    { value: "retail", label: "Retail" },
    { value: "accredited", label: "Accredited" },
    { value: "qualified", label: "Qualified" },
  ];

  const jurisdictionOptions = [
    { value: "eu", label: "EU" },
    { value: "us", label: "US" },
    { value: "uk", label: "UK" },
  ];

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number")
      .required("Phone number is required"),
    nationality: Yup.string().required("Nationality is required"),
    countryOfResidence: Yup.string().required(
      "Country of residence is required"
    ),
    preferredLanguage: Yup.string().required("Preferred language is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    taxId: Yup.string().required("Tax ID is required"),
    investorType: Yup.string().required("Investor type is required"),
    jurisdiction: Yup.string().required("Jurisdiction is required"),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setIsUploading(true);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setProfileImage("/avatar.jpg"); // Reset to default avatar
  };

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log("Profile updated:", values);
    console.log("Profile image:", profileImage);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>

              {/* Profile Picture */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="relative">
                    <Avatar 
                      src={profileImage} 
                      alt="Profile Picture" 
                      size="xxl" 
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      type="button"
                      variant="primary" 
                      className="w-full sm:w-auto"
                      onClick={handleUpdateImage}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Update Image"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full sm:w-auto"
                      onClick={handleRemoveImage}
                      disabled={isUploading}
                    >
                      Remove
                    </Button>
                  </div>
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <Button variant="primary" type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>

              <div className="w-full sm:w-1/2">
                {/* Form Fields */}
                <div className="mb-6">
                  <label
                    htmlFor="fullName"
                    className="block text-base font-normal text-secondary-black mb-2"
                  >
                    Full Name
                  </label>
                  <Field name="fullName">
                    {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                      <div>
                        <Input
                          id="fullName"
                          {...field}
                          error={
                            meta.touched && meta.error ? meta.error : undefined
                          }
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      Email Address
                    </label>
                    <Field name="email">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Input
                            id="email"
                            type="email"
                            {...field}
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      Phone Number
                    </label>
                    <Field name="phone">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Input
                            id="phone"
                            {...field}
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="nationality"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      Nationality
                    </label>
                    <Field name="nationality">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Select
                            id="nationality"
                            options={nationalityOptions}
                            {...field}
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="countryOfResidence"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      Country of Residence
                    </label>
                    <Field name="countryOfResidence">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Select
                            id="countryOfResidence"
                            options={countryOptions}
                            {...field}
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="preferredLanguage"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      Preferred Language
                    </label>
                    <Field name="preferredLanguage">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Select
                            id="preferredLanguage"
                            options={languageOptions}
                            {...field}
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      Date of Birth
                    </label>
                    <Field name="dateOfBirth">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            {...field}
                            icon={
                              <CalendarIcon className="w-4 h-4 text-gray-400" />
                            }
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      Address
                    </label>
                    <Field name="address">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Input
                            id="address"
                            {...field}
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                  <div>
                    <label
                      htmlFor="taxId"
                      className="block text-base font-normal text-secondary-black mb-2"
                    >
                      TAX ID / SSN
                    </label>
                    <Field name="taxId">
                      {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                        <div>
                          <Input
                            id="taxId"
                            {...field}
                            error={
                              meta.touched && meta.error
                                ? meta.error
                                : undefined
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                {/* Investor Classification */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Investor Classification
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="investorType"
                        className="block text-base font-normal text-secondary-black mb-2"
                      >
                        Investor type
                      </label>
                      <Field name="investorType">
                        {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                          <div>
                            <Select
                              id="investorType"
                              options={investorTypeOptions}
                              {...field}
                              error={
                                meta.touched && meta.error
                                  ? meta.error
                                  : undefined
                              }
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                    <div>
                      <label
                        htmlFor="jurisdiction"
                        className="block text-base font-normal text-secondary-black mb-2"
                      >
                        Jurisdiction
                      </label>
                      <Field name="jurisdiction">
                        {({ field, meta }: { field: FieldProps['field']; meta: FieldProps['meta'] }) => (
                          <div>
                            <Select
                              id="jurisdiction"
                              options={jurisdictionOptions}
                              {...field}
                              error={
                                meta.touched && meta.error
                                  ? meta.error
                                  : undefined
                              }
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>

                {/* Status Information */}
                <div className="space-y-4 mt-6">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-base font-normal text-secondary-black">
                      Regulatory Form Uploaded
                    </span>
                    <div className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-base font-normal text-gray-600">
                        Submitted
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <span className="text-base font-normal text-secondary-black">
                      Investment Limit
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-normal text-gray-600">
                        $ 100,000
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="secondary" size="md" className="w-full bg-primary-shade-100">
                      Request upgrade to Accredited Investor
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
