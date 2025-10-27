import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Typography } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Contact Jeremy Kopp - Fargo Real Estate Agent | Get in Touch",
  description:
    "Get in touch with Jeremy Kopp, your trusted Fargo real estate agent. Reach out for buying, selling, or general real estate questions in Fargo, Moorhead, and West Fargo.",
  openGraph: {
    title: "Contact Jeremy Kopp - Fargo Real Estate",
    description:
      "Reach out to Jeremy Kopp for help with buying or selling homes in Fargo, Moorhead, and West Fargo.",
    url: "https://jeremykopp.com/contact",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jeremy Kopp - Fargo Real Estate Agent",
      },
    ],
  },
  alternates: {
    canonical: "https://jeremykopp.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Typography variant="h1" className="mb-6">
            Contact Jeremy Kopp
          </Typography>

          <Typography variant="p" className="mb-8">
            Have a question about real estate in Fargo, Moorhead, or West Fargo?
            Send a message and Jeremy will get back to you as soon as possible.
          </Typography>

          {/* Contact Details */}
          <div className="space-y-6 text-secondary-foreground">
            <div>
              <h3 className="font-semibold text-primary-foreground mb-2">
                Phone
              </h3>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+17015550123"
                  className="hover:text-primary-hover transition-colors"
                >
                  (701) 555-0123
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-primary-foreground mb-2">
                Email
              </h3>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:jeremy@jeremykopp.com"
                  className="hover:text-primary-hover transition-colors"
                >
                  jeremy@jeremykopp.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-primary-foreground mb-2">
                Office
              </h3>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p>123 Main Street</p>
                  <p>Fargo, ND 58103</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-primary-foreground mb-2">
                Response Time
              </h3>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mt-8 p-6 bg-secondary rounded-lg">
            <h3 className="font-semibold text-primary-foreground mb-3">
              Service Areas
            </h3>
            <ul className="space-y-1">
              <li>• Fargo, ND</li>
              <li>• Moorhead, MN</li>
              <li>• West Fargo, ND</li>
              <li>• Horace, ND</li>
              <li>• Dilworth, MN</li>
              <li>• Surrounding areas</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
