import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#262626] border-t border-secondary-foreground mt-16 text-[#d4d4d4]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl text-[#fafafa] font-bold mb-4">
              Jeremy Kopp Real Estate
            </h3>
            {/* <p className="text-gray-300">
              Where statistics meet stories, and data discovers its soul.
            </p> */}
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#fafafa]">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/listings"
                  className="hover:text-primary-hover transition-colors"
                >
                  Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary-hover transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#fafafa]">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-hover transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-hover transition-colors"
                >
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2025 Jeremy Kopp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
