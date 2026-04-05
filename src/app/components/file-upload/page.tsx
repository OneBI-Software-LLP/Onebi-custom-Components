"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, File, X, Check, Image } from "lucide-react";

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <Badge
        variant="outline"
        className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
      >
        npm i onebi-ui
      </Badge>
    </div>
    <pre className="p-5 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  type: string;
}

export default function FileUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles: UploadedFile[] = Array.from(selectedFiles).map(
        (file, index) => ({
          id: Date.now() + index,
          name: file.name,
          size: file.size,
          type: file.type,
        })
      );
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      const newFiles: UploadedFile[] = Array.from(droppedFiles).map(
        (file, index) => ({
          id: Date.now() + index,
          name: file.name,
          size: file.size,
          type: file.type,
        })
      );
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              File Upload
            </h2>
            <p className="text-lg text-slate-500">
              Drag-and-drop or click to upload files with progress.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Drag & Drop Zone
              </Label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
                  ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Upload
                  className={`h-12 w-12 mx-auto mb-4 ${
                    isDragging ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                <p className="text-lg font-bold text-slate-700 mb-2">
                  {isDragging ? "Drop files here" : "Drag & drop files here"}
                </p>
                <p className="text-sm text-slate-500">
                  or{" "}
                  <span className="text-indigo-600 underline">browse files</span>
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Supported: JPG, PNG, PDF, DOC (Max 10MB)
                </p>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            {files.length > 0 && (
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  Uploaded Files ({files.length})
                </Label>
                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <File className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">
                          <Check className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          <X className="h-4 w-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <CodeBlock
              code={`import { useState, useRef } from "react";
import { Upload, File, X, Check } from "lucide-react";

export default function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles([...files, ...Array.from(selectedFiles)]);
    }
  };

  return (
    <div>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-8 text-center"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
        <p>Drag & drop or click to upload</p>
      </div>

      {files.map((file) => (
        <div key={file.name} className="flex items-center justify-between p-4 border rounded">
          <File className="h-5 w-5" />
          <span>{file.name}</span>
          <button onClick={() => removeFile(file)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
