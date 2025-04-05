import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Photography Assistant</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        <Link
          href="/photo-picker"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg text-center"
        >
          Photo Picker
        </Link>
        <Link
          href="/caption-generator"
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg text-center"
        >
          Caption Generator
        </Link>
        <Link
          href="/watermarking-tool"
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg text-center"
        >
          Watermarking Tool
        </Link>
      </div>
    </main>
  );
}
