'use client'

import { Card ,CardContent ,CardHeader, CardTitle} from "../ui/card"
import { Progress } from "../ui/progress"

export default function Budget({ budget }:{
    budget: number
    expenses: number,
    // onAddExpense: () => void
}) {
  return <Card>
  <CardHeader>
    <CardTitle>Budget Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium"> Budget</p>
        <p className="text-2xl font-bold">${budget.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Spent</p>
        <p className="text-2xl font-bold">${budget.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Remaining</p>
        <p className="text-2xl font-bold">${(budget - budget).toLocaleString()}</p>
      </div>
    </div>
    <Progress value={(budget / budget) * 100} className="mt-4" />
  </CardContent>
</Card>
}
