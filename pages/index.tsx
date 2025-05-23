import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-6">
      <div className="max-w-xl w-full flex flex-col items-center justify-center space-y-6 bg-white shadow-lg rounded-lg p-10 text-center">
        <div className="text-6xl">🎫</div>
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to the Events Portal
        </h1>
        <p className="text-base text-gray-600 max-w-md">
          Register for exciting events and manage your participation all in one
          place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
          <Link
            href="/events"
            className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow text-base transition duration-300 ease-in-out"
          >
            Browse Events
          </Link>
          <Link
            href="/admin"
            className="w-full sm:w-auto text-center bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md shadow text-base transition duration-300 ease-in-out"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
