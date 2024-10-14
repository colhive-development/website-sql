"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProjectProgressProps {
  progress: number;
}

export function ProjectProgress({ progress }: ProjectProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full" />
      </CardContent>
    </Card>
  );
}
