interface SummarizeRequest {
  transcript: string;
  prompt: string;
}

interface SummarizeResponse {
  summary: string;
}

export class AIService {
  private static instance: AIService;
  
  private constructor() {}
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async summarizeTranscript(request: SummarizeRequest): Promise<SummarizeResponse> {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 3000));


      const mockSummary = this.generateMockSummary(request.transcript, request.prompt);
      
      return { summary: mockSummary };
    } catch (error) {
      throw new Error('Failed to generate summary. Please try again.');
    }
  }

  private generateMockSummary(transcript: string, prompt: string): string {
    const isExecutiveSummary = prompt.toLowerCase().includes('executive') || prompt.toLowerCase().includes('bullet');
    const isActionItems = prompt.toLowerCase().includes('action') || prompt.toLowerCase().includes('task');
    const isDecisions = prompt.toLowerCase().includes('decision');

    if (isExecutiveSummary) {
      return `# Executive Summary

• **Meeting Overview**: Team discussed project progress and upcoming milestones
• **Key Points Discussed**:
  - Current project status and timeline review
  - Resource allocation and team responsibilities
  - Upcoming deadlines and deliverables
• **Attendance**: ${this.extractAttendees(transcript)}
• **Duration**: Approximately ${this.estimateDuration(transcript)} minutes
• **Next Steps**: Follow-up meeting scheduled for next week`;
    }

    if (isActionItems) {
      return `# Action Items & Tasks

## Immediate Actions
- [ ] Complete user interface mockups by Friday (Owner: Design Team)
- [ ] Review and approve budget proposal (Owner: Project Manager)
- [ ] Schedule follow-up client meeting (Owner: Account Manager)

## This Week
- [ ] Finalize technical specifications
- [ ] Begin development phase preparation
- [ ] Update project timeline documentation

## Deadlines
- **Friday**: UI mockups due
- **Next Monday**: Budget approval required
- **End of Week**: Technical specs finalized`;
    }

    if (isDecisions) {
      return `# Key Decisions Made

## Project Direction
- **Decision**: Approved new feature set for Q2 release
- **Rationale**: Market research indicates strong customer demand
- **Impact**: Development timeline extended by 2 weeks

## Resource Allocation
- **Decision**: Added two additional developers to the team
- **Rationale**: Current workload exceeds team capacity
- **Impact**: Budget increase of 15% approved

## Timeline Adjustments
- **Decision**: Moved launch date from March to April
- **Rationale**: Quality assurance requires additional time
- **Impact**: Marketing campaign delayed accordingly`;
    }

   
    return `# Meeting Summary

## Overview
This meeting covered several important topics related to our ongoing project development and strategic planning.

## Key Discussion Points
- Project timeline and milestone reviews
- Team collaboration and communication improvements
- Budget considerations and resource planning
- Technical challenges and proposed solutions

## Participants
${this.extractAttendees(transcript)}

## Main Outcomes
- Alignment on project priorities and next steps
- Clear action items assigned to team members
- Timeline adjustments to ensure quality delivery
- Budget approval for additional resources

## Next Steps
- Follow-up meetings scheduled
- Documentation updates required
- Progress review in one week

*Generated from ${transcript.length} characters of transcript content*`;
  }

  private extractAttendees(transcript: string): string {
    
    const commonNames = ['Sarah', 'Mike', 'Alex', 'Jordan', 'Casey'];
    const attendeeCount = Math.min(Math.floor(transcript.length / 500) + 2, 5);
    return commonNames.slice(0, attendeeCount).join(', ');
  }

  private estimateDuration(transcript: string): number {
    return Math.max(15, Math.min(Math.floor(transcript.length / 100), 120));
  }
}

export const aiService = AIService.getInstance();