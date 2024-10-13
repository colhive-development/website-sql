'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "../../ui/scroll-area"
import { Button } from "../../ui/button"
import { PlusIcon } from "lucide-react"
import { File } from "@/lib/types"

export default function FileManager({ files }:{
    files:File[],
    // onUploadFile: (file: File) => void 
}) {
  return <Card>
    <CardHeader>
        <CardTitle>Files</CardTitle>
    </CardHeader>
    <CardContent>
        <ScrollArea className="h-[200px]">
        {files.map(file => (
            <div key={file.id} className="flex justify-between items-center mb-2">
            <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">Uploaded by {file.uploadedBy} on {file.uploadedAt.toLocaleDateString()}</p>
            </div>
            <Button variant="outline" size="sm">Download</Button>
            </div>
        ))}
        </ScrollArea>
    </CardContent>
    <CardFooter>
        <Button><PlusIcon className="mr-2" /> Upload File</Button>
    </CardFooter>
    </Card>
}
