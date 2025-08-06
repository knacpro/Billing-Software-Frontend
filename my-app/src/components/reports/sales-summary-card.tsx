'use client';

import { useState } from 'react';
import { summarizeSalesTrends } from '@/ai/flows/summarize-sales-trends';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, LoaderCircle } from 'lucide-react';

export default function SalesSummaryCard() {
  const [invoiceData, setInvoiceData] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await summarizeSalesTrends({ invoiceData });
      setSummary(result.trendSummary);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Sales Trend Analysis</CardTitle>
        <CardDescription>
          Paste your past sales invoice data (e.g., in CSV or JSON format) below to get an AI-powered summary of key trends.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Textarea
          placeholder="Paste your invoice data here..."
          className="h-40"
          value={invoiceData}
          onChange={(e) => setInvoiceData(e.target.value)}
          disabled={isLoading}
        />
        {summary && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Trend Summary</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{summary}</AlertDescription>
          </Alert>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSummarize} disabled={isLoading || !invoiceData}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Analyzing...' : 'Analyze Trends'}
        </Button>
      </CardFooter>
    </Card>
  );
}
