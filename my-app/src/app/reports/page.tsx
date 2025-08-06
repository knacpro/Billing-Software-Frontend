
'use client';
import PageHeader from '@/components/page-header';
// Make sure this file exists at src/components/reports/sales-summary-card.tsx
import SalesSummaryCard from '@/components/reports/sales-summary-card';
import SalesOverviewChart from '@/components/reports/sales-overview-chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const categoryData = [
  { category: 'Electronics', sales: 275, fill: 'var(--color-electronics)' },
  { category: 'Furniture', sales: 200, fill: 'var(--color-furniture)' },
  { category: 'Clothing', sales: 150, fill: 'var(--color-clothing)' },
  { category: 'Books', sales: 100, fill: 'var(--color-books)' },
  { category: 'Groceries', sales: 50, fill: 'var(--color-groceries)' },
];

const categoryChartConfig = {
  sales: {
    label: 'Sales',
  },
  electronics: {
    label: 'Electronics',
    color: 'hsl(var(--chart-1))',
  },
  furniture: {
    label: 'Furniture',
    color: 'hsl(var(--chart-2))',
  },
  clothing: {
    label: 'Clothing',
    color: 'hsl(var(--chart-3))',
  },
  books: {
    label: 'Books',
    color: 'hsl(var(--chart-4))',
  },
  groceries: {
    label: 'Groceries',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports"
        description="Analyze your sales data and get AI-powered insights."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesSummaryCard />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={categoryChartConfig}
                className="mx-auto aspect-square h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie data={categoryData} dataKey="sales" nameKey="category" innerRadius={60}>
                       {categoryData.map((entry) => (
                          <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                        ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
       <SalesOverviewChart />
    </div>
  );
}
