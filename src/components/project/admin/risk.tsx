'use client'

import { Risk } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { PlusIcon } from "lucide-react";

export default function RiskManager({ risks }:{
    risks: Risk[],
    // onAddRisk: () => void,
    // onUpdateRisk: (riskId: string) => void
}) {
  return <Card>
  <CardHeader>
    <CardTitle>Risk Management</CardTitle>
  </CardHeader>
  <CardContent>
    <ScrollArea className="h-[200px]">
      {risks.map(risk => (
        <Card key={risk.id} className="mb-2">
          <CardHeader>
            <CardTitle className="text-sm">{risk.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs">Severity: <span className={`font-semibold ${risk.severity === 'high' ? 'text-red-500' : risk.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>{risk.severity}</span></p>
            <p className="text-xs mt-1">Mitigation: {risk.mitigationPlan}</p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  </CardContent>
  <CardFooter>
    <Button><PlusIcon className="mr-2" /> Add Risk</Button>
  </CardFooter>
</Card>
}
