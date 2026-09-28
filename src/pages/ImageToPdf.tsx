import { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle, Image, Plus } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

const ImageToPdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processedSize, setProcessedSize] = useState(0);

  // Options for page size and orientation
  const [pageSize, setPageSize] = useState<'A4' | 'Letter'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  // Page dimensions in points (1 point = 1/72 inch)
  const getPageDimensions = () => {
    if (pageSize === 'A4') {
      return orientation === 'portrait' ? { width: 595.28, height: 841.89 } : { width: 841.89, height: 595.28 };
    } else { // Letter
      return orientation === 'portrait' ? { width: 612, height: 792 } : { width: 792, height: 612 };
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
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
      setFiles(Array.from(e.dataTransfer.files));
      setError(null);
      setIsSuccess(false);
    }
  };

  const convertImagesToPdf = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);
    setProcessedSize(0);

    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const pageDimensions = getPageDimensions();

      // Process each image
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image.`);
        }

        // 1. Load and optionally resize the image
        const imageBitmap = await createImageBitmap(file, {
          // We'll resize large images to avoid memory issues
          resizeWidth: 2000,
          resizeHeight: 2000,
          resizeQuality: 'medium'
        });

        // 2. Convert the image bitmap to a format that pdf-lib can use (we'll use JPEG for compression)
        // We'll create a temporary canvas to convert the image bitmap to a JPEG blob
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(imageBitmap, 0, 0);

        // Convert to JPEG blob (we can adjust quality if needed)
        const jpegBlob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas toBlob returned null'));
                return;
              }
              resolve(blob);
            },
            'image/jpeg',
            0.9 // 90% quality - good balance
          );
        });

        // 3. Load the JPEG bytes into pdf-lib
        const imageBytes = await jpegBlob.arrayBuffer();
        let image;
        if (file.type === 'image/png') {
          // If the original was PNG, we might want to preserve transparency? But PDF doesn't support transparency in the same way.
          // We'll still use JPEG for simplicity and smaller size.
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          image = await pdfDoc.embedJpg(imageBytes);
        }

        // 4. Add a new page and draw the image
        const page = pdfDoc.addPage([pageDimensions.width, pageDimensions.height]);
        const { width, height } = image.scaleToFit(pageDimensions.width * 0.9, pageDimensions.height * 0.9);

        // Center the image on the page
        const x = (pageDimensions.width - width) / 2;
        const y = (pageDimensions.height - height) / 2;
        page.drawImage(image, {
          x,
          y,
          width,
          height,
        });

        // Update progress
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      // 5. Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save();
      setProgress(100);
      setProcessedSize(pdfBytes.length);

      const pdfBlob = new Blob([pdfBytes.slice().buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to convert images to PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    convertImagesToPdf();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Image to PDF Converter
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Convert one or multiple images into a single PDF document. Perfect for creating photo albums or document scans.
          </p>

          {/* Options */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Page Size
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as 'A4' | 'Letter')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-purple-300 dark:border-purple-400 rounded-lg p-12 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('image-file-input')?.click()}
          >
            {!isProcessing && files.length === 0 ? (
              <>
                <Upload className="mx-auto mb-4 h-10 w-10 text-purple-500 dark:text-purple-400" />
                <p className="mb-2 text-gray-700 dark:text-gray-200">Drag & drop your images here</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or <span className="font-medium text-purple-600 dark:text-purple-400">Browse Files</span>
                </p>
                <input
                  type="file"
                  id="image-file-input"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Supports JPG, PNG, WebP, and more
                </p>
              </>
            ) : files.length > 0 && !isProcessing ? (
              <>
                <Plus className="mx-auto mb-4 h-10 w-10 text-purple-500 dark:text-purple-400" />
                <p className="mb-2 text-gray-700 dark:text-gray-200 font-medium">
                  {files.length} {files.length === 1 ? 'image' : 'images'} selected
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded text-sm">
                      <Image className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="truncate max-w-xs">{file.name}</span>
                      <button
                        onClick={() => {
                          const newFiles = [...files];
                          newFiles.splice(index, 1);
                          setFiles(newFiles);
                        }}
                        className="ml-2 text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => setFiles([])} className="mt-4 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  Clear all
                </button>
              </>
            ) : (
              <>
                {/* Processing spinner */}
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 dark:border-purple-400"></div>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Processing...</p>
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
                Conversion successful! Download started automatically.
              </span>
            </div>
          )}

          {/* File Size Info */}
          {isSuccess && processedSize > 0 && (
            <div className="mt-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Output File Size
              </h2>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {Math.round(processedSize / 1024)} KB
              </p>
            </div>
          )}

          {/* Action Button */}
          {!isProcessing && files.length > 0 && !isSuccess && (
            <div className="mt-8">
              <button
                onClick={handleClick}
                className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Converting...' : 'Convert to PDF'}
              </button>
            </div>
          )}

          {/* Process Another Batch */}
          {isSuccess && (
            <div className="mt-8">
              <button
                onClick={() => {
                  setFiles([]);
                  setIsSuccess(false);
                  setProcessedSize(0);
                }}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Convert Another Batch
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToPdf;