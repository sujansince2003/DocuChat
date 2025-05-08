"use client";
import { uploadTos3 } from "@/lib/db/s3";
import { Inbox } from "lucide-react";
import { useDropzone } from "react-dropzone";

const Fileupload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
      }
      try {
        const data = await uploadTos3(file);
        console.log(data);
      } catch (error) {
        console.log("error while uploading pdf", error);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-2 border-dashed rounded-xl cursor-pointer p-4 text-center bg-gray-50 py-8 flex flex-col justify-center items-center",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-8 h-8 text-blue-500" />
          <p className="mt-2 text-sm text-slate-500">Drop PDF here</p>
        </>
      </div>
    </div>
  );
};

export default Fileupload;
