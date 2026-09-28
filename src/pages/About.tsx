import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Laptop, Upload, Download, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100">
          About FileForge
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          FileForge is a free, online platform that provides a comprehensive suite of PDF and image processing tools.
          Our mission is to make file conversion, compression, and management accessible to everyone without the need
          for software installation or account creation.
        </p>

        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Our Commitment to Privacy and Security
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            We understand that your files contain sensitive information. That's why FileForge is designed with privacy
            as a core principle. All file processing happens locally in your browser whenever possible. For tools that
            require additional processing power, we use secure, temporary server-side processing with automatic deletion
            of files after a short retention period.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            We never store, share, or analyze the content of your files. Your data remains yours.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            How FileForge Works
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Upload className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  Upload or Drag & Drop
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Select files from your device or drag them into the upload area. We support a wide range of formats.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  Process Securely
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Files are processed using client-side libraries for most operations. For complex tasks, we use secure
                  servers that automatically delete your files after processing.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Download className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  Download Results
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Instantly download your processed files. We provide clear file size comparisons and multiple format options.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Why Choose FileForge?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-purple-500 dark:text-purple-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                Free & Unlimited
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No hidden fees, watermarks, or usage limits. All tools are free to use without restriction.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Clock className="mx-auto mb-4 h-10 w-10 text-purple-500 dark:text-purple-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized for speed. Most operations complete in seconds, even on mobile devices.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Laptop className="mx-auto mb-4 h-10 w-10 text-purple-500 dark:text-purple-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                Works Everywhere
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully responsive design. Use FileForge on desktop, tablet, or mobile devices without compromise.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;