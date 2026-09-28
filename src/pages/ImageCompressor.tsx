import { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle } from 'lucide-react';

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [processedSize, setProcessedSize] = useState(0);
  const [quality, setQuality] = useState(0.8); // Default quality 80%

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

  const compressImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);
    setOriginalSize(file.size);

    try {
      // 1. Create an image bitmap from the file
      const imageBitmap = await createImageBitmap(file);
      setProgress(25);

      // 2. Create a canvas and draw the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Set canvas dimensions to match the image
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      ctx.drawImage(imageBitmap, 0, 0);
      setProgress(50);

      // 3. Convert to blob with desired quality
      // Determine the output type based on the original file type or default to JPEG
      const mimeType = file.type.startsWith('image/') ? file.type : 'image/jpeg';
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas toBlob returned null'));
              return;
            }
            resolve(blob);
          },
          mimeType,
          quality
        );
      });
      setProgress(75);

      // 4. Create download link
      setProgress(100);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // Use the same extension as the original, but we might change it if we force JPEG
      const originalName = file.name.split('.').slice(0, -1).join('.');
      const extension = mimeType === 'image/jpeg' ? 'jpg' : mimeType.split('/')[1];
      link.setAttribute('download', `compressed-${originalName}.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setProcessedSize(blob.size);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to compress image. Please try again with a different file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    compressImage();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Image Compressor
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Compress JPG, PNG, WebP images. Adjust quality to balance size and clarity.
          </p>

          {/* Quality Control */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Image Quality
            </label>
            <div className="flex items-center">
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 min-w-4">
                {Math.round(quality * 100)}%
              </span>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-purple-300 dark:border-purple-400 rounded-lg p-12 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('image-file-input')?.click()}
          >
            {!isProcessing && !file ? (
              <>
                <Upload className="mx-auto mb-4 h-10 w-10 text-purple-500 dark:text-purple-400" />
                <p className="mb-2 text-gray-700 dark:text-gray-200">Drag & drop your image here</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or <span className="font-medium text-purple-600 dark:text-purple-400">Browse Files</span>
                </p>
                <input
                  type="file"
                  id="image-file-input"
                  accept="image/*"
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Original Image</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(originalSize / 1024)} KB
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Compressed Image</p>
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
                {isProcessing ? 'Compressing...' : 'Compress Image'}
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
                  setQuality(0.8); // Reset quality
                }}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Compress Another Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;