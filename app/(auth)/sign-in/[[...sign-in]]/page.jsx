import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Rocket, Users, Target, Award, Sparkles, CheckCircle } from "lucide-react";

export default async function Page() {
  // Check if user is already signed in
  const { userId } = await auth();

  // If user is already signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      text: "Personalized interview questions"
    },
    {
      icon: <Award className="w-5 h-5" />,
      text: "Real-time performance feedback"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Industry-specific scenarios"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "AI-powered analysis"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/20">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side - Enhanced Hero Section */}
        <section className="relative flex h-32 items-end bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Enhanced Background with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              alt="AI Interview Platform"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-indigo-700/90"></div>
          </div>

          {/* Enhanced Content */}
          <div className="relative z-10 hidden lg:block lg:p-12">
            {/* Logo */}
            <a
              className="block text-white hover:text-blue-200 transition-colors mb-16"
              href="/"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  AI MOCK INTERVIEW
                </span>
              </div>
            </a>

            {/* Main Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Start Your Journey
                </div>
                <h2 className="text-4xl font-bold text-white leading-tight">
                  Launch Your Career with Confidence
                </h2>
              </div>

              <p className="text-lg text-blue-100 max-w-md leading-relaxed">
                Join thousands of successful candidates who transformed their interview skills with our AI-powered platform.
              </p>

              {/* Enhanced Feature Highlights */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <span className="text-blue-100 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-blue-100 text-sm">Interviews Conducted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-blue-100 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side - Enhanced Sign Up Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="relative -mt-16 block lg:hidden text-center">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white shadow-lg text-blue-600 hover:shadow-xl transition-all duration-300"
                href="/"
              >
                <Rocket className="w-8 h-8" />
              </a>

              <div className="mt-4 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Get Started Free
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent sm:text-3xl md:text-4xl">
                  Join AI Mock Interview
                </h1>
                <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Create your account and start practicing with intelligent AI interviewers today.
                </p>
              </div>
            </div>

            {/* Enhanced Sign Up Form Container */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Start your journey to interview success
                  </p>
                </div>

                {/* Clerk SignUp Component */}
                <div className="space-y-6">
                  <SignUp 
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-0 bg-transparent",
                        headerTitle: "text-lg font-semibold text-gray-900 hidden",
                        headerSubtitle: "text-gray-600 hidden",
                        socialButtonsBlockButton: "border border-gray-300 hover:border-gray-400 transition-colors",
                        formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300",
                        footerActionLink: "text-blue-600 hover:text-blue-700 font-medium transition-colors",
                        formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors",
                        identityPreviewEditButton: "text-blue-600 hover:text-blue-700 transition-colors"
                      }
                    }}
                  />
                </div>

                {/* Enhanced Additional Info */}
                <div className="mt-6 text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <a
                      href="/sign-in"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="text-xs text-gray-500">
                  <div className="font-semibold text-gray-700">Secure</div>
                  <div>Data Protected</div>
                </div>
                <div className="text-xs text-gray-500">
                  <div className="font-semibold text-gray-700">Free Trial</div>
                  <div>7 Days</div>
                </div>
                <div className="text-xs text-gray-500">
                  <div className="font-semibold text-gray-700">Support</div>
                  <div>24/7 Help</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}