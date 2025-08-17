import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TranscriptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TranscriptInput({ value, onChange, disabled }: TranscriptInputProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Meeting Transcript</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="transcript">
            Paste your meeting transcript or notes here
          </Label>
          <Textarea
            id="transcript"
            placeholder="Paste your meeting transcript, call notes, or discussion here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="min-h-[200px] resize-none"
          />
          <p className="text-sm text-muted-foreground">
            {value.length} characters
          </p>
        </div>
      </CardContent>
    </Card>
  );
}