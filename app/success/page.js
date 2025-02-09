import Link from "next/link";

export default function Success() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-md shadow-lg">
        <h1 className="text-4xl font-bold text-green-500">
          Payment under processing !
        </h1>
        <p className="text-2xl text-gray-700">
          Your payment has been sent to be processed.
        </p>
        <p className="text-xl text-gray-600">
          Thank you for choosing us. We will send you a confirmation email
          shortly.
        </p>
        <div className="flex items-center justify-center mt-10">
          <Link href="/"
             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
              Go back to home
            
          </Link>
        </div>
      </div>
    </div>
  );
}