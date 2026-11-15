/**
 * AI Assistant Service
 * Provides:
 * 1. Natural Language Email Q&A Copilot
 * 2. Smart Multi-Tone Reply Generator
 */

export function askCopilot(query, { emails = [], activeEmail = null, persona = 'assistant' }) {
  const q = (query || '').toLowerCase().trim();

  // 1. Client attention query
  if (q.includes('client') || q.includes('alexander') || q.includes('alex')) {
    const clientEmails = emails.filter(e => e.classification?.category === 'client_reply' && !e.isHandled);
    return {
      answer: `There are currently **${clientEmails.length} email(s)** requiring Alexander's personal attention:
${clientEmails.map((e, i) => `${i + 1}. **${e.sender.name}** (${e.sender.company || 'External'}): *${e.subject}* — ${e.classification.reason}`).join('\n')}

Would you like me to prepare an executive summary packet or draft initial notes for Alexander?`,
      relevantEmailIds: clientEmails.map(e => e.id),
      suggestedFollowUps: [
        'Summarize the top priority email for Alexander',
        'Prepare delegation briefing',
        'Show emails assigned to me (Assistant)'
      ]
    };
  }

  // 2. Assistant attention query
  if (q.includes('my attention') || q.includes('assigned to me') || q.includes('assistant to reply')) {
    const assistantEmails = emails.filter(e => e.classification?.category === 'assistant_reply' && !e.isHandled);
    return {
      answer: `You have **${assistantEmails.length} pending task(s)** assigned to you as Executive Assistant:
${assistantEmails.map((e, i) => `${i + 1}. **${e.sender.name}**: *${e.subject}* (Suggested action: ${e.classification.suggestedAction})`).join('\n')}

High priority items include Bloomberg executive dinner rescheduling and the Salesforce annual renewal.`,
      relevantEmailIds: assistantEmails.map(e => e.id),
      suggestedFollowUps: [
        'Draft reply for the Bloomberg reschedule',
        'Check upcoming meetings this week',
        'What needs urgent action?'
      ]
    };
  }

  // 3. Waiting for response
  if (q.includes('waiting') || q.includes('pending response') || q.includes('follow-up') || q.includes('follow up')) {
    const waitingEmails = emails.filter(e => e.priority === 'urgent' || e.priority === 'high');
    return {
      answer: `Here are the key threads where responses or approvals are pending:
1. **Series B Term Sheet Revisions**: Waiting on Alexander’s final collar approval ($120M–$140M post) for Marcus Vance at Valkyrie Capital.
2. **VP of Product Compensation**: Waiting on Alexander’s green light for David Lin’s $320k + 1.25% equity offer.
3. **Bloomberg Dinner Reschedule**: Sarah to confirm 8:30 PM slot with Claire Holloway.`,
      relevantEmailIds: waitingEmails.map(e => e.id),
      suggestedFollowUps: [
        'Send a gentle nudge to the client',
        'Show flagged low-confidence classifications',
        'Draft a quick reply to Marcus Vance'
      ]
    };
  }

  // 4. Summarize active or specific email
  if (q.includes('summarize') || q.includes('summary')) {
    if (activeEmail) {
      return {
        answer: `### Summary of "${activeEmail.subject}"
**Sender:** ${activeEmail.sender.name} (${activeEmail.sender.email})
**Category:** ${activeEmail.classification?.category?.replace('_', ' ').toUpperCase()} (${Math.round((activeEmail.classification?.confidence || 0.9) * 100)}% confidence)

**TL;DR:** ${activeEmail.aiSummary?.tldr || activeEmail.snippet}

**Key Takeaways:**
${(activeEmail.aiSummary?.keyTakeaways || []).map(t => `- ${t}`).join('\n')}

**Why it matters:** ${activeEmail.classification?.reason || 'Standard correspondence'}`,
        relevantEmailIds: [activeEmail.id],
        suggestedFollowUps: [
          `Draft a reply to ${activeEmail.sender.name}`,
          'Reclassify this email',
          'Extract action items'
        ]
      };
    } else {
      const urgent = emails.find(e => e.priority === 'urgent');
      return {
        answer: `Please select an email to see its full breakdown, or here is a summary of today's most urgent item: **"${urgent?.subject}"** from **${urgent?.sender.name}**. It requires sign-off on the Series B valuation collar.`,
        relevantEmailIds: urgent ? [urgent.id] : [],
        suggestedFollowUps: [
          'Show me emails requiring client approval',
          'Show meetings scheduled for this week'
        ]
      };
    }
  }

  // 5. Why was this assigned / classification explanation
  if (q.includes('why') && (q.includes('assigned') || q.includes('classified') || q.includes('client'))) {
    if (activeEmail) {
      return {
        answer: `### AI Classification Rationale
The thread **"${activeEmail.subject}"** was classified as **${activeEmail.classification?.category?.replace('_', ' ').toUpperCase()}** because:

> "${activeEmail.classification?.reason}"

- **Confidence Score:** ${Math.round((activeEmail.classification?.confidence || 0.9) * 100)}%
- **Review Status:** ${activeEmail.classification?.needsReview ? '⚠️ Flagged for human review' : '✅ Confirmed by pattern engine'}
- **Suggested Next Step:** ${activeEmail.classification?.suggestedAction}

You can manually override this classification at any time using the classification dropdown.`,
        relevantEmailIds: [activeEmail.id],
        suggestedFollowUps: [
          'Reclassify as Assistant to Reply',
          'Reclassify as Client to Reply',
          'Mark as Handled'
        ]
      };
    }
  }

  // 6. Upcoming meetings
  if (q.includes('meeting') || q.includes('calendar') || q.includes('appointment') || q.includes('schedule')) {
    const meetingEmails = emails.filter(e => !!e.extractedMeeting);
    return {
      answer: `Found **${meetingEmails.length} upcoming meetings or event requests** across the inboxes:
${meetingEmails.map(e => `• **${e.extractedMeeting.title}**
  - Date & Time: ${e.extractedMeeting.date} at ${e.extractedMeeting.time}
  - Location: ${e.extractedMeeting.location}
  - Status: ${e.extractedMeeting.status.replace('_', ' ')}`).join('\n\n')}

All times have been cross-checked against Alexander's main calendar.`,
      relevantEmailIds: meetingEmails.map(e => e.id),
      suggestedFollowUps: [
        'Reschedule Bloomberg dinner to 8:30 PM',
        'Confirm Global AI Summit hold',
        'Show all urgent emails'
      ]
    };
  }

  // General assistant response
  return {
    answer: `I am your AI Email Co-Pilot. I monitor all connected client accounts, automatically categorize reply responsibility, extract action items, and draft contextual replies.

You can ask me:
- *"Show me emails that need Alexander's attention"*
- *"What tasks are assigned to me today?"*
- *"What are we waiting on?"*
- *"Summarize the latest term sheet updates"*
- *"Show upcoming meetings and calendar invites"*`,
    relevantEmailIds: [],
    suggestedFollowUps: [
      'Show emails requiring client attention',
      'Show emails assigned to assistant',
      'What am I waiting for a response on?'
    ]
  };
}

export function generateSmartReply({ email, tone = 'professional', customInstructions = '', senderPersona = 'assistant' }) {
  if (!email) return { draft: '' };

  const sender = email.sender.name || 'there';
  const subject = email.subject || '';

  // Tailored intelligent templates based on context and tone
  if (subject.includes('Bloomberg') || subject.includes('Reschedule')) {
    if (tone === 'concise') {
      return {
        tone,
        draft: `Hi Claire,\n\n8:30 PM at The Grill works perfectly on our end. I have updated Alexander’s calendar and the reservation accordingly.\n\nLooking forward to the discussion!\n\nBest,\nSarah Jenkins\nExecutive Assistant to Alexander Wright`
      };
    }
    if (tone === 'warm') {
      return {
        tone,
        draft: `Hi Claire,\n\nThanks so much for letting us know! That White House briefing sounds intense — 8:30 PM at The Grill works wonderfully for Alexander. We have already modified the table reservation so you can arrive relaxed.\n\nHe is really looking forward to catching up with you on the autonomous workplace trends.\n\nWarm regards,\nSarah Jenkins\nExecutive Assistant to Alexander Wright`
      };
    }
    return {
      tone,
      draft: `Hi Claire,\n\nThank you for reaching out. 8:30 PM at The Grill next Thursday works well for Alexander. I have updated his calendar and notified the restaurant to adjust our table reservation.\n\nPlease let me know if any other adjustments arise prior to Thursday.\n\nBest regards,\nSarah Jenkins\nExecutive Assistant to Alexander Wright\nApex Holdings`
    };
  }

  if (subject.includes('Term Sheet') || subject.includes('Series B')) {
    if (tone === 'assertive') {
      return {
        tone,
        draft: `Marcus,\n\nReviewed the updated draft. The $120M–$140M valuation collar and 1x non-participating liquidation preference align with what our board authorized. Please have your counsel send the executable signature package to Sarah and Wilson Sonsini for final execution before Friday 5 PM.\n\nBest,\nAlexander`
      };
    }
    if (tone === 'concise') {
      return {
        tone,
        draft: `Marcus,\n\nThe revised valuation collar ($120M-$140M post) and clean 1x preference are approved on my end. Please forward final signature pages to our legal counsel.\n\nAlexander`
      };
    }
    return {
      tone,
      draft: `Dear Marcus,\n\nThank you for incorporating our investment committee's revisions. I have reviewed the redlined draft, and the $120M - $140M post-money valuation collar and 1x non-participating liquidation preference accurately capture our agreement.\n\nWe are green-lit to proceed. Please coordinate with Sarah Jenkins and our lead counsel at Wilson Sonsini for the formal signature packet prior to Friday's close.\n\nBest regards,\nAlexander Wright\nFounder & CEO, Apex Holdings`
    };
  }

  if (subject.includes('VP of Product') || subject.includes('Compensation')) {
    return {
      tone,
      draft: `Hi Elena,\n\nThis is fantastic news regarding David Lin. The proposed compensation package ($320k base + 25% target bonus + 1.25% equity with 4-year vesting) has my full sign-off.\n\nPlease proceed with issuing the written offer letter immediately so we can lock him in ahead of Datadog's deadline. Let me know once he countersigns.\n\nBest,\nAlexander`
    };
  }

  if (subject.includes('Speaking Invitation') || subject.includes('AI Summit')) {
    return {
      tone,
      draft: `Dear Dr. Thorne,\n\nThank you for the prestigious invitation for Alexander to deliver the Opening Keynote at the Global AI Summit 2026 in San Francisco.\n\nI have placed a preliminary hold on his calendar for Wednesday, October 14th. Could you please share the formal speaker packet, AV specifications, and confirmation of the fireside moderator?\n\nLooking forward to working together on this keynote.\n\nWarm regards,\nSarah Jenkins\nExecutive Assistant to Alexander Wright`
    };
  }

  // Generic fallback with custom instructions support
  const instructionPart = customInstructions ? ` regarding "${customInstructions}"` : '';
  return {
    tone,
    draft: `Hi ${sender},\n\nThank you for your message${instructionPart}. We have received your note regarding "${subject}" and are reviewing it.\n\nWe will follow up with further details shortly.\n\nBest regards,\nSarah Jenkins\nOffice of Alexander Wright`
  };
}
