import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileUpload } from "@/components/FileUpload";
import { TranscriptInput } from "@/components/TranscriptInput";
import { PromptInput } from "@/components/PromptInput";
import { SummaryDisplay } from "@/components/SummaryDisplay";
import { EmailShare } from "@/components/EmailShare";
import { aiService } from "@/services/aiService";
import { Sparkles, FileText, Share } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("Summarize the key points and action items from this meeting");
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileContent = (content: string) => {
    setTranscript(content);
    toast.success("File uploaded successfully");
  };

  const handleGenerateSummary = async () => {
    if (!transcript.trim()) {
      toast.error("Please provide a transcript to summarize");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please provide instructions for the summary");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await aiService.summarizeTranscript({
        transcript: transcript.trim(),
        prompt: prompt.trim(),
      });
      setSummary(response.summary);
      toast.success("Summary generated successfully");
    } catch (error) {
      toast.error("Failed to generate summary. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = transcript.trim().length > 0 && prompt.trim().length > 0 && !isGenerating;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Meeting Summarizer</h1>
              <p className="text-muted-foreground">Transform meeting transcripts into actionable summaries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Step 1: Input */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">Step 1</Badge>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Add Your Transcript
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Upload File</h3>
                <FileUpload 
                  onFileContent={handleFileContent}
                  disabled={isGenerating}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Or Paste Text</h3>
                <TranscriptInput
                  value={transcript}
                  onChange={setTranscript}
                  disabled={isGenerating}
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Step 2: Instructions */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">Step 2</Badge>
              <h2 className="text-xl font-semibold">Customize Summary Style</h2>
            </div>
            
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              disabled={isGenerating}
            />
          </section>

          <Separator />

          {/* Step 3: Generate */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">Step 3</Badge>
              <h2 className="text-xl font-semibold">Generate Summary</h2>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={handleGenerateSummary}
                disabled={!canGenerate}
                size="lg"
                className="min-w-[200px]"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Summary
                  </>
                )}
              </Button>
            </div>
          </section>

          {/* Step 4: Summary Display */}
          {(summary || isGenerating) && (
            <>
              <Separator />
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">Step 4</Badge>
                  <h2 className="text-xl font-semibold">Review & Edit</h2>
                </div>
                
                <SummaryDisplay
                  summary={summary}
                  onSummaryChange={setSummary}
                  isLoading={isGenerating}
                />
              </section>
            </>
          )}

          {/* Step 5: Share */}
          {summary && !isGenerating && (
            <>
              <Separator />
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">Step 5</Badge>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Share className="h-5 w-5" />
                    Share Summary
                  </h2>
                </div>
                
                <EmailShare 
                  summary={summary}
                  disabled={isGenerating}
                />
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
