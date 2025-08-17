import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PRESET_PROMPTS = [
  "Summarize in bullet points for executives",
  "Extract action items and deadlines",
  "Highlight key decisions made",
  "Create a brief overview for team members",
  "List follow-up tasks and responsibilities",
];

export function PromptInput({ value, onChange, disabled }: PromptInputProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Summary Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">
            Tell the AI how you want the transcript summarized
          </Label>
          <Textarea
            id="prompt"
            placeholder="e.g., Summarize in bullet points for executives, highlight action items..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="min-h-[100px] resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Templates:</Label>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onChange(prompt)}
                disabled={disabled}
                className="text-xs"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}