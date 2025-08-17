import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit3, Save, X, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface SummaryDisplayProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
  isLoading?: boolean;
}

export function SummaryDisplay({ summary, onSummaryChange, isLoading }: SummaryDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [copied, setCopied] = useState(false);

  const handleEdit = () => {
    setEditedSummary(summary);
    setIsEditing(true);
  };

  const handleSave = () => {
    onSummaryChange(editedSummary);
    setIsEditing(false);
    toast.success("Summary updated successfully");
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Summary copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy summary");
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Generated Summary
            <Badge variant="secondary">Generating...</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="animate-pulse bg-muted h-4 rounded w-3/4"></div>
            <div className="animate-pulse bg-muted h-4 rounded w-full"></div>
            <div className="animate-pulse bg-muted h-4 rounded w-2/3"></div>
            <div className="animate-pulse bg-muted h-4 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Generated Summary
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Ready</Badge>
            {!isEditing && (
              <>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleEdit}>
                  <Edit3 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="min-h-[300px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {summary}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}