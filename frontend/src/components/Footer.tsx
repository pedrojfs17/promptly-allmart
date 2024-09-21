import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-600 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
            <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-900">
              Store Name
            </Link>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Store Name. Pedro Seixas. Promptly.
          </div>
        </div>
      </div>
    </footer>
    )
  }