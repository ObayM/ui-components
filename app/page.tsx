import Link from "next/link";
export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the UI Components Library</h1>
            <p className="text-lg text-gray-600">Explore various components and their documentation.</p>
            <Link href="/docs" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Get Started
            </Link>
        </div>
    );
}