"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CustomFileUpload from "@/components/CustomFileUpload";
import { Users } from "lucide-react";

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

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 mt-8 first:mt-0">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {title}
      </Label>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}

export default function FileUploadPage() {
  const [documents, setDocuments] = useState<File[]>([]);
  const [profilePic, setProfilePic] = useState<File[]>([]);

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              File Upload
            </h2>
            <p className="text-lg text-slate-500">
              Configurable drag-and-drop or button-triggered file uploader.
            </p>
          </div>
          
          <div className="grid gap-10 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            {/* 1. Dropzone Variant */}
            <div>
              <SectionTitle title="1. Standard Dropzone" subtitle="Support for multiple files with drag & drop functionality." />
              <div className="mt-6">
                <CustomFileUpload
                  variant="dropzone"
                  multiple={true}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  maxSize={10 * 1024 * 1024} // 10MB
                  hint="PDF, Excel, Word (Max 10MB)"
                  onFilesChange={(files) => {
                    console.log("Documents updated:", files);
                    setDocuments(files);
                  }}
                />
                
                {documents.length > 0 && (
                  <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:translate-y-0">
                    Submit {documents.length} Documents
                  </button>
                )}
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* 2. Button Variant with Avatar Preview */}
            <div>
              <SectionTitle title="2. Single File Button" subtitle="Common profile picture update pattern with preview logic." />
              <div className="flex flex-col md:flex-row items-center gap-10 p-8 border border-slate-100 bg-slate-50/50 rounded-[2rem] mt-6">
                <div className="w-24 h-24 bg-white border-4 border-white rounded-[2rem] shadow-2xl flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-slate-100">
                  {profilePic.length > 0 ? (
                    <img 
                      src={URL.createObjectURL(profilePic[0])} 
                      alt="Preview" 
                      className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" 
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-300">
                      <Users className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight">Update Avatar</h3>
                  <p className="text-sm text-slate-500 font-medium mb-6">Must be JPEG or PNG, max 2MB.</p>
                  
                  <CustomFileUpload
                    variant="button"
                    multiple={false}
                    accept="image/jpeg, image/png"
                    maxSize={2 * 1024 * 1024} // 2MB
                    onFilesChange={(files) => setProfilePic(files)}
                  />
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { useState } from "react";
import CustomFileUpload from "@/components/CustomFileUpload";

export default function FileUploadDemo() {
  const [files, setFiles] = useState([]);

  return (
    <div className="space-y-8">
      {/* Drag & drop variant */}
      <CustomFileUpload
        variant="dropzone"
        multiple={true}
        accept=".pdf,.png,.jpg"
        maxSize={5 * 1024 * 1024}
        onFilesChange={setFiles}
      />

      {/* Button variant */}
      <CustomFileUpload
        variant="button"
        onFilesChange={(files) => console.log(files)}
      />
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
