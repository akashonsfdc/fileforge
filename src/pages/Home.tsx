import { Link } from 'react-router-dom';
import {
  Upload,
  FileText,
  Image,
  ArrowRightLeft,
  Scissors,
  Zap,
  Clipboard,
  Download,
  Plus,
  Shield,
  Clock,
  Smartphone
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header is already in App.tsx */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-16">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
              All Your PDF & Image Tools in One Place
            </h1>
            <p className="mb-8 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Convert, compress, and manage your files in seconds. Free, fast, and easy to use.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <Upload className="mr-2 h-4 w-4" /> Select Files
              </button>
              <button className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-100">
                <FileText className="mr-2 h-4 w-4" /> Browse Files
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Supports PDF, JPG, PNG, WebP, and more
            </p>
          </section>

          {/* Popular Tools Section */}
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
              Popular Tools
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Compress PDF */}
              <Link to="/compress-pdf" className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                        <Scissors className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Compress PDF
                      </h3>
                    </div>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Reduce PDF file size while maintaining quality
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Free
                      </span>
                      <ArrowRightLeft className="ml-2 h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:text-purple-600" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* PDF to Word */}
              <Link to="/pdf-to-word" className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                        <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        PDF to Word
                      </h3>
                    </div>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Convert PDF to editable DOCX
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Free
                      </span>
                      <ArrowRightLeft className="ml-2 h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:text-purple-600" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* PDF to JPG */}
              <Link to="#" className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                        <Image className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        PDF to JPG
                      </h3>
                    </div>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Convert PDF pages to JPG images
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Free
                      </span>
                      <ArrowRightLeft className="ml-2 h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:text-purple-600" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Image Compressor */}
              <Link to="/image-compressor" className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                        <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Image Compressor
                      </h3>
                    </div>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Compress JPG, PNG, WebP images
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Free
                      </span>
                      <ArrowRightLeft className="ml-2 h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:text-purple-600" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Image to PDF */}
              <Link to="/image-to-pdf" className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                        <Plus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Image to PDF
                      </h3>
                    </div>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Convert images to PDF document
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Free
                      </span>
                      <ArrowRightLeft className="ml-2 h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:text-purple-600" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Merge PDF */}
              <Link to="#" className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                        <Clipboard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Merge PDF
                      </h3>
                    </div>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Combine multiple PDFs into one
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Free
                      </span>
                      <ArrowRightLeft className="ml-2 h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:text-purple-600" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
              How It Works
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Upload className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Upload Files
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag and drop or select files from your device
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Process Instantly
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Files are processed securely in your browser
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Download className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Download Results
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Save your processed files with one click
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose FileForge? Section */}
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
              Why Choose FileForge?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Scissors className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Free & Unlimited
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No hidden fees, watermarks, or usage limits
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Secure & Private
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Files never leave your device unless you choose to upload
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized for speed and performance
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Works Everywhere
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Desktop, tablet, and mobile friendly
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Footer will be in App.tsx */}
    </div>
  );
};

export default Home;