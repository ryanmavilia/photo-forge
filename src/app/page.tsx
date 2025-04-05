import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Photo Picker",
      description:
        "Quickly sort through your photos to find the best ones for your portfolio or clients",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 mb-4 text-blue-500"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      ),
      link: "/photo-picker",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Caption Generator",
      description: "Generate engaging captions for your social media posts",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 mb-4 text-purple-500"
        >
          <path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
          <path d="M3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
          <path d="M8 12h8" />
          <path d="M8 16h4" />
        </svg>
      ),
      link: "/caption-generator",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Watermarking Tool",
      description: "Add professional watermarks to protect your images",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 mb-4 text-green-500"
        >
          <path d="M21.42 10.922a1 1 0 0 0-.55-1.74l-9.56-3.1a1 1 0 0 0-1.62.78v16.2a1 1 0 0 0 1.59.82l9.56-6.18a1 1 0 0 0 .36-1.15" />
          <path d="M9.69 16.89 2.3 11.5c-.67-.67-.67-1.76 0-2.43l7.39-7.39" />
        </svg>
      ),
      link: "/watermarking-tool",
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Complete
                <span className="text-blue-500 block">
                  Photography Assistant
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                Streamline your workflow with our all-in-one tool for
                photographers. Select the best shots, generate engaging
                captions, and protect your work.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/photo-picker"
                  className="btn btn-primary px-6 py-3"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="btn px-6 py-3 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative mt-12 md:mt-0">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl rotate-1 transform transition-transform hover:rotate-0 duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/10 dark:from-blue-900/30 dark:to-purple-900/20 z-10"></div>
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src="/placeholder-hero.svg"
                    alt="Photography tools illustration"
                    className="w-full h-full object-cover block dark:hidden"
                  />
                  <img
                    src="/placeholder-hero-dark.svg"
                    alt="Photography tools illustration"
                    className="w-full h-full object-cover hidden dark:block"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 w-full px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features for Photographers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center p-2">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.link}
                    className={`btn text-white mt-auto ${feature.color}`}
                  >
                    Try {feature.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 w-full bg-gray-50 dark:bg-gray-900 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Upload Your Photos",
                description:
                  "Select photos from your device or drag and drop them into the uploader.",
              },
              {
                number: "02",
                title: "Process & Edit",
                description:
                  "Sort through photos, generate captions, or add watermarks based on your needs.",
              },
              {
                number: "03",
                title: "Download & Share",
                description:
                  "Download your processed photos or share them directly to social media.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-blue-500 mb-4 border-2 border-blue-500 rounded-full w-16 h-16 flex items-center justify-center">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
