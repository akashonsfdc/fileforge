import { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Configure pdfjs-dist worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToWord = () => {
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

  const convertPdfToWord = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);
    setOriginalSize(file.size);

    try {
      // 1. Extract text from PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      let fullText = '';

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n\n';
        setProgress(Math.round((pageNum / totalPages) * 50)); // 50% for text extraction
      }

      // 2. Create Word document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: fullText,
                    break: 0,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      // 3. Convert to Blob
      const wordBlob = await Packer.toBlob(doc);
      setProgress(100);

      // 4. Create download link and update state
      const url = window.URL.createObjectURL(wordBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name.replace(/\.[^/.]+$/, '.docx'));
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setProcessedSize(wordBlob.size);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to convert PDF to Word. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    convertPdfToWord();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            PDF to Word Converter
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Convert your PDF documents to editable Word files. Preserves text content for easy editing.
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Word Document</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(processedSize / 1024)} KB
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
                {isProcessing ? 'Converting...' : 'Convert to Word'}
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
                Convert Another File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfToWord;