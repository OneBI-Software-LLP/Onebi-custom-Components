import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { cn } from "@/lib/utils";
import { Upload, File, X, Check, Image as ImageIcon, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";

export interface FileUploadProps {
  /** The visual style of the uploader */
  variant?: 'dropzone' | 'button';
  /** Allow multiple files */
  multiple?: boolean;
  /** Accepted file types (e.g., ".pdf, .png, .jpg" or "image/*") */
  accept?: string;
  /** Maximum file size in bytes (e.g., 5 * 1024 * 1024 for 5MB) */
  maxSize?: number;
  /** Callback fired when files are selected or removed */
  onFilesChange: (files: File[]) => void;
  /** Custom hint text displayed below the main label */
  hint?: string;
  /** Additional custom classes */
  className?: string;
}

export const CustomFileUpload: React.FC<FileUploadProps> = ({
  variant = 'dropzone',
  multiple = false,
  accept,
  maxSize,
  onFilesChange,
  hint = 'PNG, JPG, PDF up to 10MB',
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to format bytes to readable sizes
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFiles = (files: FileList | null) => {
    setError(null);
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    let validFiles: File[] = [];

    for (const file of fileArray) {
      if (maxSize && file.size > maxSize) {
        setError(`File "${file.name}" exceeds the maximum size of ${formatSize(maxSize)}.`);
        return; // Stop processing if one fails, or you could filter it out
      }
      validFiles.push(file);
    }

    const updatedFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  // --- Event Handlers ---
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
    // Reset input value so the same file can be uploaded again if needed
    if (inputRef.current) inputRef.current.value = '';
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("w-full animate-in fade-in slide-in-from-bottom-2 duration-400", className)}>
      {/* Hidden Native Input */}
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className="hidden"
        aria-label="File upload"
      />

      {/* Variant: Dropzone */}
      {variant === 'dropzone' && (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-[2rem] transition-all cursor-pointer group shadow-inner overflow-hidden",
            dragActive 
              ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]' 
              : 'border-slate-200 bg-slate-50/30 hover:border-indigo-300 hover:bg-slate-100/50',
            error ? 'border-rose-400 bg-rose-50/30' : ''
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          onKeyDown={(e) => e.key === 'Enter' && onButtonClick()}
          tabIndex={0}
          role="button"
        >
            {/* Animated Background Pulse */}
            {dragActive && <div className="absolute inset-0 bg-indigo-500/5 animate-pulse pointer-events-none" />}

            <div className={cn(
                "p-4 rounded-[1.25rem] mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 shadow-xl",
                dragActive ? "bg-indigo-600 text-white" : "bg-white text-slate-400"
            )}>
               <Upload className="w-8 h-8" />
            </div>

            <p className="mb-2 text-lg font-bold text-slate-800">
                <span className="text-indigo-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-slate-500 font-medium">{hint}</p>
        </div>
      )}

      {/* Variant: Button */}
      {variant === 'button' && (
        <button
          type="button"
          onClick={onButtonClick}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-black focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <Upload className="w-4 h-4" />
          Browse Files
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <X className="w-4 h-4 text-rose-600" />
            <p className="text-sm text-rose-600 font-bold">{error}</p>
        </div>
      )}

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="mt-8 space-y-4">
          <Label className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
              Selected Files ({selectedFiles.length})
          </Label>
          <ul className="space-y-3">
            {selectedFiles.map((file, index) => (
              <li 
                key={`${file.name}-${index}`} 
                className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-white shadow-xl shadow-slate-200/20 group hover:border-indigo-100 transition-colors animate-in fade-in slide-in-from-left-4 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className="p-3 bg-indigo-50/50 rounded-xl group-hover:bg-indigo-50 transition-colors shrink-0">
                    {file.type.includes('image') ? (
                        <ImageIcon className="w-5 h-5 text-indigo-600" />
                    ) : (
                        <FileText className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                      <span className="truncate font-bold text-slate-700 text-sm leading-tight">{file.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{formatSize(file.size)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-emerald-100">
                        <Check className="w-3 h-3" />
                        Ready
                    </div>
                    <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                    aria-label="Remove file"
                    >
                    <X className="w-5 h-5" />
                    </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomFileUpload;
