import { Mail, Globe, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div>
            <h3 className="mb-4 text-white dark:text-gray-100 font-semibold">FileForge</h3>
            <p className="mb-4">
              All-in-one PDF and image processing tools that are free, fast, and secure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white dark:hover:text-gray-100">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white dark:hover:text-gray-100">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white dark:hover:text-gray-100">
                <ShieldCheck className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-white dark:text-gray-100 font-semibold">PDF Tools</h4>
            <ul className="space-y-2">
              <li><a href="/pdf-to-word" className="hover:text-white dark:hover:text-gray-100">PDF to Word</a></li>
              <li><a href="/compress-pdf" className="hover:text-white dark:hover:text-gray-100">Compress PDF</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">PDF to JPG</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Merge PDF</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Split PDF</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Protect PDF</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-white dark:text-gray-100 font-semibold">Image Tools</h4>
            <ul className="space-y-2">
              <li><a href="/image-compressor" className="hover:text-white dark:hover:text-gray-100">Image Compressor</a></li>
              <li><a href="/image-to-pdf" className="hover:text-white dark:hover:text-gray-100">Image to PDF</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Image Converter</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Resize Image</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Crop Image</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Rotate Image</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-white dark:text-gray-100 font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">Contact Us</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-100">About Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-600 text-center text-xs">
          <p className="text-gray-500 dark:text-gray-400">
            © 2026 FileForge. All rights reserved. We respect your privacy and do not store your files.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;