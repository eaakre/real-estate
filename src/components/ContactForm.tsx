"use client";

import { useState } from "react";

interface ContactFormProps {
  listingId?: string;
  listingAddress?: string;
  listingPrice?: string;
  subject?: string;
  prefilledMessage?: string;
}

export function ContactForm({
  listingId,
  listingAddress,
  listingPrice,
  subject: initialSubject,
  prefilledMessage,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject:
      initialSubject || (listingId ? `Inquiry about ${listingAddress}` : ""),
    message:
      prefilledMessage ||
      (listingId
        ? `I'm interested in learning more about the property at ${listingAddress}${
            listingPrice ? ` listed at ${listingPrice}` : ""
          }. Please contact me with more information.`
        : ""),
    contactMethod: "email" as "email" | "phone" | "either",
    timeframe: "",
    propertyType: "",
    priceRange: "",
    isFirstTimeBuyer: false,
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare submission data - include listing info if available
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message,
        phone: formData.phone,
        subject: formData.subject,
        contactMethod: formData.contactMethod,
        timeframe: formData.timeframe,
        propertyType: formData.propertyType,
        priceRange: formData.priceRange,
        isFirstTimeBuyer: formData.isFirstTimeBuyer,
        ...(listingId && {
          listingId,
          listingAddress,
          listingPrice,
        }),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus("success");
        // Reset form if not on a listing page (keep prefilled data for listing inquiries)
        if (!listingId) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            contactMethod: "email",
            timeframe: "",
            propertyType: "",
            priceRange: "",
            isFirstTimeBuyer: false,
            agreeToTerms: false,
          });
        }
      } else {
        setSubmitStatus("error");
        console.error(data.error);
      }
    } catch (err) {
      setSubmitStatus("error");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      {listingId && (
        <div className="bg-secondary p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-primary-foreground mb-2">
            Property Inquiry
          </h3>
          <p className="text-secondary-foreground">{listingAddress}</p>
          {listingPrice && (
            <p className="text-secondary-foreground font-medium">
              {listingPrice}
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-primary-foreground"
      >
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(701) 555-0123"
            />
          </div>
        </div>

        {/* Contact Preferences */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Contact Method
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={formData.contactMethod === "email"}
                onChange={handleChange}
                className="mr-2"
              />
              Email
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={formData.contactMethod === "phone"}
                onChange={handleChange}
                className="mr-2"
              />
              Phone
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="contactMethod"
                value="either"
                checked={formData.contactMethod === "either"}
                onChange={handleChange}
                className="mr-2"
              />
              Either
            </label>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What can Jeremy help you with?"
          />
        </div>

        {/* Real Estate Specific Fields (only show if not a listing inquiry) */}
        {!listingId && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="timeframe"
                  className="block text-sm font-medium mb-2"
                >
                  Timeframe
                </label>
                <select
                  id="timeframe"
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select timeframe</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6-12months">6-12 months</option>
                  <option value="1year+">1+ years</option>
                  <option value="just-looking">Just looking</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="propertyType"
                  className="block text-sm font-medium mb-2"
                >
                  Property Type of Interest
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select property type</option>
                  <option value="single-family">Single Family Home</option>
                  <option value="townhome">Townhome</option>
                  <option value="condo">Condo</option>
                  <option value="multi-family">Multi-family</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="priceRange"
                className="block text-sm font-medium mb-2"
              >
                Price Range
              </label>
              <select
                id="priceRange"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select price range</option>
                <option value="under-200k">Under $200,000</option>
                <option value="200k-300k">$200,000 - $300,000</option>
                <option value="300k-400k">$300,000 - $400,000</option>
                <option value="400k-500k">$400,000 - $500,000</option>
                <option value="500k-750k">$500,000 - $750,000</option>
                <option value="750k+">$750,000+</option>
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFirstTimeBuyer"
                  checked={formData.isFirstTimeBuyer}
                  onChange={handleChange}
                  className="mr-3 text-secondary-foreground"
                />
                <span className="text-sm text-secondary-foreground">
                  I am a first-time home buyer
                </span>
              </label>
            </div>
          </>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell Jeremy about your real estate needs..."
          />
        </div>

        {/* Terms Agreement */}
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              required
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-3 mt-1 text-secondary-foreground"
            />
            <span className="text-sm text-secondary-foreground">
              I agree to be contacted by Jeremy Kopp regarding my real estate
              inquiry. I understand that I can opt out at any time. *
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || !formData.agreeToTerms}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-green-800 font-medium">
                Message sent successfully!
              </p>
            </div>
            <p className="text-green-700 mt-2 ml-8">
              Jeremy will get back to you within 24 hours.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800 font-medium">Something went wrong</p>
            </div>
            <p className="text-red-700 mt-2 ml-8">
              Please try again or call Jeremy directly at (701) 555-0123.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
