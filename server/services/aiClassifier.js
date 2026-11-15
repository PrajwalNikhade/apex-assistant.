/**
 * AI Classifier Service
 * Analyzes incoming email subject, body, sender, and history to determine:
 * - Category: 'assistant_reply' | 'client_reply' | 'no_reply_needed'
 * - Confidence score (0.50 - 0.99)
 * - Rationale / Reason
 * - Suggested Action
 * - Needs Review flag
 * - TL;DR Summary & Key Takeaways
 * - Extracted action items with assignees
 * - Extracted meeting details (if calendar/scheduling detected)
 */

export function classifyEmail({ subject = '', body = '', sender = {}, history = [] }) {
  const combinedText = `${subject} ${body} ${sender.name || ''} ${sender.role || ''} ${sender.company || ''}`.toLowerCase();

  // 1. Client to Reply Indicators (Strategic, High-stakes, Approvals, Personal input)
  const clientPatterns = [
    { pattern: /(term sheet|valuation|cap table|liquidation preference|series [a-z]|syndicate|equity grant|83\(b\)|vesting acceleration|founder agreement)/i, weight: 4.5, reason: 'High-stakes investment, legal equity agreement, or capital structure negotiation requires CEO approval.' },
    { pattern: /(board of directors|audit committee|governance|shareholder resolution|cfo concurrence|legal counsel sign-off)/i, weight: 4.0, reason: 'Corporate governance and fiduciary board matters require client direct sign-off.' },
    { pattern: /(compensation package|offer approval|executive hire|vp of|c-suite|fire|severance)/i, weight: 3.8, reason: 'Executive-level hiring and compensation approvals must be authorized by the client.' },
    { pattern: /(wire transfer|sign-off needed|alexander,? your (call|decision|input)|need your green light|need your approval|please sign the attached)/i, weight: 4.2, reason: 'Explicitly requests client personal authorization, signature, or decision.' },
    { pattern: /(confidential m&a|acquisition inquiry|letter of intent|loi)/i, weight: 4.5, reason: 'Confidential strategic transactions and acquisitions require principal review.' }
  ];

  // 2. Assistant to Reply Indicators (Scheduling, Logistics, Routine admin, Invoices)
  const assistantPatterns = [
    { pattern: /(reschedule|dinner at|reservation|lunch next week|coffee|calendar|availability|30-min intro|intro call)/i, weight: 3.8, reason: 'Meeting scheduling, calendar availability, and reservations are handled by the Assistant.' },
    { pattern: /(flight confirmation|hotel booking|itinerary|car service|travel desk)/i, weight: 3.5, reason: 'Travel logistics and booking confirmations can be coordinated directly by the Assistant.' },
    { pattern: /(invoice #|renewal order form|bill\.com|accounts payable|vendor agreement|contract discount)/i, weight: 3.6, reason: 'Routine vendor renewal paperwork and AP invoice processing handled by the Assistant.' },
    { pattern: /(speaking invitation|keynote speaker|conference packet|panelist|speaker pass)/i, weight: 3.4, reason: 'Speaking engagement inquiry and standard bio/packet exchange suitable for Assistant response.' },
    { pattern: /(put me in touch with your team|forward to your assistant|cc'ing your assistant)/i, weight: 3.0, reason: 'Explicitly delegates or invites assistant coordination.' }
  ];

  // 3. No Reply Needed Indicators (Newsletters, Receipts, Status alerts, Closed)
  const noReplyPatterns = [
    { pattern: /(automated notification|do not reply|unsubscribe|monthly statement|digest|newsletter|daily tech)/i, weight: 4.5, reason: 'Automated broadcast newsletter or system notification requiring zero response.' },
    { pattern: /(receipt|payment received|invoice paid|merchant processing|processed volume)/i, weight: 4.0, reason: 'Financial confirmation receipt; no response is required.' },
    { pattern: /(security advisory|system alert|password reset|github notification)/i, weight: 4.0, reason: 'Automated platform alert; informational only.' },
    { pattern: /(for your records only|fyi only|signed copy attached|no action required)/i, weight: 3.5, reason: 'Informational broadcast or resolved transaction for filing.' }
  ];

  let clientScore = 0;
  let assistantScore = 0;
  let noReplyScore = 0;

  let matchedClientReasons = [];
  let matchedAssistantReasons = [];
  let matchedNoReplyReasons = [];

  for (const item of clientPatterns) {
    if (item.pattern.test(combinedText)) {
      clientScore += item.weight;
      matchedClientReasons.push(item.reason);
    }
  }

  for (const item of assistantPatterns) {
    if (item.pattern.test(combinedText)) {
      assistantScore += item.weight;
      matchedAssistantReasons.push(item.reason);
    }
  }

  for (const item of noReplyPatterns) {
    if (item.pattern.test(combinedText)) {
      noReplyScore += item.weight;
      matchedNoReplyReasons.push(item.reason);
    }
  }

  // Determine winning category
  let category = 'assistant_reply';
  let confidence = 0.88;
  let reason = '';
  let suggestedAction = '';
  let needsReview = false;

  if (noReplyScore > 3.0 && noReplyScore >= clientScore && noReplyScore >= assistantScore) {
    category = 'no_reply_needed';
    confidence = Math.min(0.99, 0.85 + noReplyScore * 0.03);
    reason = matchedNoReplyReasons[0] || 'Informational or automated broadcast email requiring no action or response.';
    suggestedAction = 'Mark as handled or archive.';
  } else if (clientScore > 3.0 && clientScore >= assistantScore) {
    category = 'client_reply';
    confidence = Math.min(0.98, 0.82 + clientScore * 0.03);
    reason = matchedClientReasons[0] || 'Requires personal executive decision, legal sign-off, or strategic approval from Alexander.';
    suggestedAction = 'Review email details and send executive response or provide sign-off.';
    
    // Check if close call with assistant
    if (assistantScore > 2.0 && Math.abs(clientScore - assistantScore) < 1.5) {
      confidence = 0.72;
      needsReview = true;
      reason += ' (Contains both scheduling and strategic elements; flagged for Assistant review)';
    }
  } else if (assistantScore > 2.5) {
    category = 'assistant_reply';
    confidence = Math.min(0.96, 0.80 + assistantScore * 0.03);
    reason = matchedAssistantReasons[0] || 'Routine coordination, scheduling, or vendor management suitable for the Assistant.';
    suggestedAction = 'Draft confirmation or handle administrative follow-up on client’s behalf.';

    // Ambiguity check
    if (clientScore > 2.0 && Math.abs(assistantScore - clientScore) < 1.5) {
      confidence = 0.69;
      needsReview = true;
      reason = 'Ambiguous message: Contains both administrative coordination and client-level decision elements. Flagged for review.';
    }
  } else {
    // Default fallback
    category = 'assistant_reply';
    confidence = 0.65;
    needsReview = true;
    reason = 'General incoming inquiry without definitive automated signature. Flagged for assistant review.';
    suggestedAction = 'Review message and assign appropriate classification.';
  }

  // Extract Meeting if present
  let extractedMeeting = null;
  const meetingKeywords = /(dinner|lunch|breakfast|coffee|keynote|meeting|call|summit|sync|catch up)/i;
  const timeKeywords = /(\d{1,2}:\d{2}\s*(am|pm)|next (monday|tuesday|wednesday|thursday|friday)|tomorrow|october|november|december)/i;
  
  if (meetingKeywords.test(combinedText) && timeKeywords.test(combinedText)) {
    const titleMatch = subject.replace(/^(re:|fwd:)\s*/i, '').trim();
    extractedMeeting = {
      title: titleMatch,
      date: 'Next Week (Tentative)',
      time: 'TBD',
      location: combinedText.includes('zoom') ? 'Zoom Video Call' : (combinedText.includes('nyc') || combinedText.includes('new york') ? 'New York, NY' : 'San Francisco, CA'),
      attendees: ['Alexander Wright', sender.name || 'External Attendee'],
      status: 'pending_confirmation'
    };
  }

  // Generate AI Summary
  const tldr = generateTLDR(subject, body, sender, category);
  const keyTakeaways = generateKeyTakeaways(subject, body, category);
  const actionItems = generateActionItems(subject, body, category);

  return {
    category,
    confidence: Number(confidence.toFixed(2)),
    reason,
    suggestedAction,
    needsReview,
    originalCategory: category,
    aiSummary: {
      tldr,
      keyTakeaways,
      actionItems,
      urgency: clientScore > 3.5 ? 'urgent' : (assistantScore > 3.0 ? 'high' : 'medium'),
      sentiment: category === 'client_reply' ? 'urgent' : 'neutral'
    },
    extractedMeeting
  };
}

function generateTLDR(subject, body, sender, category) {
  const senderName = sender.name || 'Contact';
  if (category === 'client_reply') {
    return `${senderName} reached out regarding "${subject}". This requires Alexander's personal review and executive sign-off.`;
  }
  if (category === 'assistant_reply') {
    return `${senderName} submitted a request regarding "${subject}". The Executive Assistant can coordinate the response and schedule.`;
  }
  return `Automated or informational message from ${senderName} regarding "${subject}". No reply is expected.`;
}

function generateKeyTakeaways(subject, body, category) {
  const takeaways = [];
  takeaways.push(`Subject matter: ${subject}`);
  if (category === 'client_reply') {
    takeaways.push('Contains terms or decisions requiring direct CEO authority.');
    takeaways.push('A response is expected before the end of the current business cycle.');
  } else if (category === 'assistant_reply') {
    takeaways.push('Involves operational coordination, scheduling, or vendor processing.');
    takeaways.push('Assistant can resolve with standard operating procedures.');
  } else {
    takeaways.push('Informational broadcast; archived for future reference.');
  }
  return takeaways;
}

function generateActionItems(subject, body, category) {
  if (category === 'client_reply') {
    return [
      { text: `Review proposal/terms for ${subject}`, completed: false, assignee: 'client' },
      { text: 'Provide sign-off or instructions to assistant', completed: false, assignee: 'client' }
    ];
  }
  if (category === 'assistant_reply') {
    return [
      { text: 'Check calendar and coordinate with sender', completed: false, assignee: 'assistant' },
      { text: 'Draft reply and log status in dashboard', completed: false, assignee: 'assistant' }
    ];
  }
  return [];
}
