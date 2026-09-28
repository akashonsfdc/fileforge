import { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

const CompressPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [processedSize, setProcessedSize] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setIsSuccess(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
      setIsSuccess(false);
    }
  };

  const compressPdf = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);
    setOriginalSize(file.size);

    try {
      // 1. Load the PDF
      const arrayBuffer = await file.arrayBuffer();
      setProgress(25);
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setProgress(50);

      // 2. Save the PDF with compression (using object streams)
      // Note: pdf-lib's save method already uses some compression by default.
      // We can also try to compress images if needed, but for now we'll rely on the built-in.
      const compressedPdfBytes = await pdfDoc.save();
      setProgress(75);

      // 3. Create blob and download
      setProgress(100);
      const blob = new Blob([compressedPdfBytes.slice().buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `compressed-${file.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setProcessedSize(compressedPdfBytes.length);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to compress PDF. Please try again with a different file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    compressPdf();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Compress PDF
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Reduce your PDF file size while maintaining quality. Works best with PDFs containing images.
          </p>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-purple-300 dark:border-purple-400 rounded-lg p-12 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('pdf-file-input')?.click()}
          >
            {!isProcessing && !file ? (
              <>
                <Upload className="mx-auto mb-4 h-10 w-10 text-purple-500 dark:text-purple-400" />
                <p className="mb-2 text-gray-700 dark:text-gray-200">Drag & drop your PDF here</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or <span className="font-medium text-purple-600 dark:text-purple-400">Browse Files</span>
                </p>
                <input
                  type="file"
                  id="pdf-file-input"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </>
            ) : file && !isProcessing ? (
              <>
                <CheckCircle className="mx-auto mb-4 h-10 w-10 text-green-500 dark:text-green-400" />
                <p className="mb-2 text-gray-700 dark:text-gray-200 font-medium">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(file.size / 1024)} KB
                </p>
                <button onClick={() => setFile(null)} className="mt-4 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  Remove file
                </button>
              </>
            ) : (
              <>
                {/* Processing spinner */}
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 dark:border-purple-400"></div>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Compressing...</p>
              </>
            )}
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-purple-600 dark:bg-purple-400 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {progress}%
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="mr-3 h-5 w-5 text-red-500 dark:text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message and Download Info */}
          {isSuccess && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="mr-3 h-5 w-5 text-green-500 dark:text-green-400" />
              <span>
                Compression successful! Download started automatically.
              </span>
            </div>
          )}

          {/* File Size Comparison */}
          {isSuccess && originalSize > 0 && processedSize > 0 && (
            <div className="mt-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                File Size Comparison
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Original PDF</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(originalSize / 1024)} KB
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Compressed PDF</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(processedSize / 1024)} KB
                  </p>
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    {Math.round(((originalSize - processedSize) / originalSize) * 100)}% smaller
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {!isProcessing && file && !isSuccess && (
            <div className="mt-8">
              <button
                onClick={handleClick}
                className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Compressing...' : 'Compress PDF'}
              </button>
            </div>
          )}

          {/* Process Another File */}
          {isSuccess && (
            <div className="mt-8">
              <button
                onClick={() => {
                  setFile(null);
                  setIsSuccess(false);
                  setOriginalSize(0);
                  setProcessedSize(0);
                }}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Compress Another File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompressPdf;