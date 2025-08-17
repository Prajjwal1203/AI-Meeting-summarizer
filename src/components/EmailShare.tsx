import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, X, Plus } from "lucide-react";
import { toast } from "sonner";

interface EmailShareProps {
  summary: string;
  disabled?: boolean;
}

export function EmailShare({ summary, disabled }: EmailShareProps) {
  const [emails, setEmails] = useState<string[]>([""]);
  const [subject, setSubject] = useState("Meeting Summary");
  const [message, setMessage] = useState(`Hello,

Please find the meeting summary below:

${summary}

Best regards`);
  const [isLoading, setIsLoading] = useState(false);

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const removeEmail = (index: number) => {
    if (emails.length > 1) {
      const newEmails = emails.filter((_, i) => i !== index);
      setEmails(newEmails);
    }
  };

  const handleSend = async () => {
    const validEmails = emails.filter(email => email.trim() && email.includes("@"));
    
    if (validEmails.length === 0) {
      toast.error("Please enter at least one valid email address");
      return;
    }

    if (!summary.trim()) {
      toast.error("No summary to share");
      return;
    }

    setIsLoading(true);
    
    try {
     
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Summary sent to ${validEmails.length} recipient${validEmails.length > 1 ? 's' : ''}`);
      setEmails([""]);
      setSubject("Meeting Summary");
      setMessage(`Hello,

Please find the meeting summary below:

${summary}

Best regards`);
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Share Summary via Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Recipients</Label>
          {emails.map((email, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="recipient@example.com"
                value={email}
                onChange={(e) => updateEmail(index, e.target.value)}
                disabled={disabled || isLoading}
                className="flex-1"
              />
              {emails.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEmail(index)}
                  disabled={disabled || isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addEmailField}
            disabled={disabled || isLoading}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Recipient
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={disabled || isLoading}
            placeholder="Email subject"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled || isLoading}
            className="min-h-[150px] resize-none"
            placeholder="Email message"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            {summary && (
              <Badge variant="secondary" className="text-xs">
                {summary.length} characters to share
              </Badge>
            )}
          </div>
          <Button
            onClick={handleSend}
            disabled={disabled || isLoading || !summary.trim()}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}