"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "@/lib/types";
import { useState } from "react";

const FileViewer: React.FC<{ files: File[] }> = ({ files }) => {
  return (
    <Card className="p-4 rounded-lg shadow">
      <CardHeader>
        <CardTitle>Project Files</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {files.map(file => (
            <li key={file.id} className="flex justify-between items-center">
              <span>{file.name}</span>
              <Button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = file.url;
                  link.download = file.name;
                  link.click();
                }}
              >Download</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FileViewer
