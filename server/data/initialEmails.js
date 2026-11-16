const now = Date.now();
const minutesAgo = (m) => new Date(now - m * 60 * 1000).toISOString();
const hoursAgo = (h) => new Date(now - h * 3600 * 1000).toISOString();
const daysAgo = (d) => new Date(now - d * 86400 * 1000).toISOString();

export const initialEmails = [
  {
    id: 'em-101',
    accountId: 'acc-1',
    accountEmail: 'alexander.wright@apexholdings.com',
    subject: 'Series B Term Sheet Revisions — Final Valuation Collar Approval Needed',
    snippet: 'Alexander, we incorporated the 1x non-participating liquidation preference. Please review the updated valuation collar ($120M - $140M post) and confirm if we have your green light...',
    sender: {
      name: 'Marcus Vance',
      email: 'm.vance@valkyriecapital.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'General Partner',
      company: 'Valkyrie Capital'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' },
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
    ],
    receivedAt: minutesAgo(24),
    isRead: false,
    isStarred: true,
    isArchived: false,
    isHandled: false,
    tags: ['Investor Relations', 'Term Sheet', 'High Priority'],
    priority: 'urgent',
    classification: {
      category: 'client_reply',
      confidence: 0.98,
      reason: 'Direct investor negotiation requiring the CEO/Client to approve valuation bounds and legal terms before the term sheet is executed.',
      suggestedAction: 'Review the attached revised term sheet document and provide sign-off or counter-terms to Marcus directly.',
      needsReview: false,
      originalCategory: 'client_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Marcus Vance from Valkyrie Capital sent the revised Series B term sheet with the updated $120M–$140M post-money valuation collar and 1x non-participating liquidation preference, requiring Alexander’s sign-off before Friday 5 PM EST.',
      keyTakeaways: [
        'Valuation collar adjusted to $120M - $140M post-money.',
        '1x non-participating liquidation preference included as requested.',
        'Requires Alexander’s explicit approval before syndication closes Friday 5 PM EST.'
      ],
      actionItems: [
        { text: 'Review revised valuation collar on page 4', completed: false, assignee: 'client' },
        { text: 'Respond with formal approval or counter-amendments', completed: false, assignee: 'client' },
        { text: 'Brief legal counsel (Wilson Sonsini) on final numbers', completed: false, assignee: 'assistant' }
      ],
      urgency: 'urgent',
      sentiment: 'urgent'
    },
    extractedMeeting: null,
    messages: [
      {
        id: 'msg-101-1',
        senderName: 'Marcus Vance',
        senderEmail: 'm.vance@valkyriecapital.com',
        receivedAt: minutesAgo(24),
        body: `Alexander,

Good catching up earlier. Our investment committee convened this morning and unanimously approved moving forward with the revised structure.

We have incorporated your team's requested changes:
1. Revised the post-money valuation collar to $120M - $140M (downside protected).
2. Clean 1x non-participating liquidation preference.
3. 2 Founder board seats + 1 Valkyrie seat + 1 independent operator seat.

Attached is the redlined legal draft. We would love to finalize the lead syndicate before end of day Friday. Please confirm if these revised terms meet your expectations so we can send for formal signatures.

Best regards,
Marcus Vance
General Partner | Valkyrie Capital
m.vance@valkyriecapital.com`
      }
    ]
  },

  {
    id: 'em-102',
    accountId: 'acc-1',
    accountEmail: 'alexander.wright@apexholdings.com',
    subject: 'Reschedule Request: Bloomberg Tech Executive Dinner in NYC next Thursday',
    snippet: 'Hi Alexander, Due to a breaking White House press briefing, Claire needs to shift our dinner on Thursday from 7:00 PM to 8:30 PM at The Grill...',
    sender: {
      name: 'Claire Holloway',
      email: 'cholloway@bloomberg.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Bureau Chief & Anchor',
      company: 'Bloomberg Media'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' },
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
    ],
    receivedAt: minutesAgo(48),
    isRead: false,
    isStarred: false,
    isArchived: false,
    isHandled: false,
    tags: ['Scheduling', 'Press', 'Dinner'],
    priority: 'high',
    classification: {
      category: 'assistant_reply',
      confidence: 0.95,
      reason: 'Routine appointment rescheduling and restaurant reservation coordination, which can be handled entirely by the Executive Assistant without bothering the client.',
      suggestedAction: 'Check Alexander’s NYC calendar for Thursday, adjust reservation at The Grill to 8:30 PM, and confirm with Claire’s office.',
      needsReview: false,
      originalCategory: 'assistant_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Claire Holloway from Bloomberg requested shifting Thursday’s executive dinner in NYC from 7:00 PM to 8:30 PM at The Grill due to a newsroom scheduling conflict.',
      keyTakeaways: [
        'Date: Next Thursday, Nov 20, 2026',
        'New proposed time: 8:30 PM EST (moved from 7:00 PM)',
        'Location: The Grill, 99 E 52nd St, New York',
        'Alexander has an open slot after 8:00 PM with no conflicting engagements'
      ],
      actionItems: [
        { text: 'Adjust NYC calendar event to 8:30 PM - 10:30 PM', completed: false, assignee: 'assistant' },
        { text: 'Update OpenTable reservation at The Grill', completed: false, assignee: 'assistant' },
        { text: 'Send polite confirmation reply to Claire Holloway', completed: false, assignee: 'assistant' }
      ],
      urgency: 'high',
      sentiment: 'neutral'
    },
    extractedMeeting: {
      title: 'Bloomberg Tech Executive Dinner with Claire Holloway',
      date: 'Thursday, Nov 20, 2026',
      time: '8:30 PM - 10:30 PM EST',
      location: 'The Grill (Seagram Building, 99 E 52nd St, NYC)',
      attendees: ['Alexander Wright', 'Claire Holloway (Bloomberg)'],
      status: 'pending_reschedule'
    },
    messages: [
      {
        id: 'msg-102-1',
        senderName: 'Claire Holloway',
        senderEmail: 'cholloway@bloomberg.com',
        receivedAt: minutesAgo(48),
        body: `Hi Alexander (and Sarah),

Apologies for the last-minute adjustment. I've been called into a special evening broadcast panel that wraps up around 7:45 PM on Thursday.

Could we shift our reservation at The Grill from 7:00 PM to 8:30 PM? Really eager to discuss Apex's upcoming enterprise agent launch and your thoughts on autonomous workplace governance.

Let me or my EA knows if 8:30 PM works on your end.

Best,
Claire Holloway
Bureau Chief | Bloomberg Media`
      }
    ]
  },

  {
    id: 'em-103',
    accountId: 'acc-1',
    accountEmail: 'alexander.wright@apexholdings.com',
    subject: 'Executive Hire Sign-off: VP of Product Candidate Compensation Package',
    snippet: 'Alexander, we have concluded final references for David Lin (ex-Stripe Director of Product). Attached is the proposed offer structure including $320k base + 1.25% equity...',
    sender: {
      name: 'Elena Rostova',
      email: 'e.rostova@apexholdings.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      role: 'Head of People & Talent',
      company: 'Apex Holdings'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' }
    ],
    receivedAt: hoursAgo(2),
    isRead: true,
    isStarred: true,
    isArchived: false,
    isHandled: false,
    tags: ['Executive Hiring', 'Approvals', 'Internal'],
    priority: 'urgent',
    classification: {
      category: 'client_reply',
      confidence: 0.97,
      reason: 'Executive compensation package and equity grant for a C-suite/VP level direct report requires direct CEO approval.',
      suggestedAction: 'Review compensation package breakdown and grant approval or request modifications before the candidate deadline tomorrow.',
      needsReview: false,
      originalCategory: 'client_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Elena Rostova is requesting CEO approval for David Lin’s VP of Product offer ($320k base, $80k bonus target, 1.25% equity with 4-year vesting). Candidate has a competing offer expiring in 48 hours.',
      keyTakeaways: [
        'Candidate: David Lin (ex-Stripe Director of Product).',
        'References came back exceptionally strong across former peers and VP of Eng.',
        'Proposed Comp: $320,000 Base Salary + 25% Performance Bonus + 1.25% Stock Option Pool.',
        'Competing offer from Datadog expires Friday afternoon.'
      ],
      actionItems: [
        { text: 'Review equity dilution impact on ESOP pool', completed: false, assignee: 'client' },
        { text: 'Approve or counter David Lin offer package', completed: false, assignee: 'client' },
        { text: 'Notify Head of Talent to prepare DocuSign contract', completed: false, assignee: 'assistant' }
      ],
      urgency: 'urgent',
      sentiment: 'positive'
    },
    extractedMeeting: null,
    messages: [
      {
        id: 'msg-103-1',
        senderName: 'Elena Rostova',
        senderEmail: 'e.rostova@apexholdings.com',
        receivedAt: hoursAgo(2),
        body: `Hi Alexander,

Thrilled to share that David Lin's backchannel references from Stripe and Square were glowing. He scored in the top percentile on technical architecture and executive vision.

To close him before Datadog's deadline on Friday, we recommend the following package:
- Base: $320,000 USD
- Annual Bonus Target: 25% ($80,000 based on product delivery metrics)
- Equity Grant: 1.25% of common stock (standard 4-year vesting, 1-year cliff, 10-year exercise window)
- Relocation / Remote Setup: $15,000 lump sum

Please give your green light so I can extend the written offer this afternoon.

Warmly,
Elena Rostova
Head of Talent`
      }
    ]
  },

  {
    id: 'em-104',
    accountId: 'acc-2',
    accountEmail: 'alex.wright.personal@gmail.com',
    subject: 'Speaking Invitation: Keynote at Global AI Summit 2026 (San Francisco)',
    snippet: 'Dear Alexander, On behalf of the Steering Committee for Global AI Summit, we would be honored to invite you as our Opening Keynote Speaker on October 14th...',
    sender: {
      name: 'Dr. Aris Thorne',
      email: 'a.thorne@aisummit.org',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'Chairperson',
      company: 'Global AI Summit'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alex.wright.personal@gmail.com' },
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
    ],
    receivedAt: hoursAgo(4),
    isRead: false,
    isStarred: false,
    isArchived: false,
    isHandled: false,
    tags: ['Speaking Request', 'Events', 'PR'],
    priority: 'normal',
    classification: {
      category: 'assistant_reply',
      confidence: 0.91,
      reason: 'General speaking engagement inquiry and schedule check. Assistant can evaluate calendar availability, honorarium terms, and request conference syllabus.',
      suggestedAction: 'Send standard executive speaking packet, review October schedule, and request details on VIP panel logistics.',
      needsReview: false,
      originalCategory: 'assistant_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Dr. Aris Thorne invited Alexander to deliver the 30-minute Opening Keynote at the Global AI Summit at SF Moscone Center on October 14, 2026, offering travel accommodations and speaker pass.',
      keyTakeaways: [
        'Event: Global AI Summit 2026 at Moscone West, SF',
        'Date: Wednesday, October 14, 2026 at 9:15 AM',
        'Topic: "The Autonomous Agent Economy: Enterprise Realities"',
        'Assistant can confirm speaker requirements and preliminary calendar hold'
      ],
      actionItems: [
        { text: 'Verify October 14 calendar availability', completed: false, assignee: 'assistant' },
        { text: 'Send Alexander’s standard speaker bio and high-res headshot', completed: false, assignee: 'assistant' },
        { text: 'Confirm AV requirements and Q&A format with Dr. Thorne', completed: false, assignee: 'assistant' }
      ],
      urgency: 'medium',
      sentiment: 'positive'
    },
    extractedMeeting: {
      title: 'Global AI Summit Keynote',
      date: 'Wednesday, Oct 14, 2026',
      time: '9:15 AM - 10:00 AM PST',
      location: 'Moscone Center West, San Francisco, CA',
      attendees: ['Alexander Wright', 'Dr. Aris Thorne (Chair)'],
      status: 'invitation_received'
    },
    messages: [
      {
        id: 'msg-104-1',
        senderName: 'Dr. Aris Thorne',
        senderEmail: 'a.thorne@aisummit.org',
        receivedAt: hoursAgo(4),
        body: `Dear Alexander,

We have been following the groundbreaking progress Apex Holdings has made in autonomous workflow intelligence. 

The advisory board of the Global AI Summit 2026 would be deeply privileged to host you as our Opening Morning Keynote speaker on October 14th in San Francisco. The session is scheduled for 30 minutes, followed by an executive fireside chat.

We expect over 3,500 enterprise tech executives and investors in attendance. All travel and VIP hosting will be arranged by our team.

Please let us know if your calendar permits, or have your office connect with our program coordinator.

Warm regards,
Dr. Aris Thorne
Chair, Global AI Summit 2026`
      }
    ]
  },

  {
    id: 'em-105',
    accountId: 'acc-1',
    accountEmail: 'alexander.wright@apexholdings.com',
    subject: 'Enterprise Salesforce Annual Renewal — Invoice #INV-88912 & Order Form',
    snippet: 'Hi Alexander, Following our contract review call with Sarah, attached is the revised annual renewal order form reflecting the 18% tier volume discount...',
    sender: {
      name: 'Ryan Gallagher',
      email: 'rgallagher@salesforce.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      role: 'Enterprise Account Director',
      company: 'Salesforce'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' },
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
    ],
    receivedAt: hoursAgo(6),
    isRead: true,
    isStarred: false,
    isArchived: false,
    isHandled: false,
    tags: ['Finance', 'Vendor', 'Invoices'],
    priority: 'normal',
    classification: {
      category: 'assistant_reply',
      confidence: 0.94,
      reason: 'Routine vendor renewal paperwork and invoice processing. The assistant previously handled negotiations and can route the approved invoice to Accounts Payable.',
      suggestedAction: 'Verify that the 18% negotiated discount is accurately reflected, then route to Bill.com for automated AP disbursement.',
      needsReview: false,
      originalCategory: 'assistant_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Ryan Gallagher sent the finalized annual renewal order form for Salesforce Enterprise ($88,400/yr), containing the agreed 18% multi-year discount negotiated by Sarah.',
      keyTakeaways: [
        'Total contract: $88,400 (reflects 18% discount).',
        'Includes 65 Enterprise CRM seats + Service Cloud add-ons.',
        'Net 30 payment terms; due date December 1st.'
      ],
      actionItems: [
        { text: 'Cross-check invoice line items against Q4 budget', completed: true, assignee: 'assistant' },
        { text: 'Forward executed contract to Accounts Payable', completed: false, assignee: 'assistant' }
      ],
      urgency: 'low',
      sentiment: 'neutral'
    },
    extractedMeeting: null,
    messages: [
      {
        id: 'msg-105-1',
        senderName: 'Ryan Gallagher',
        senderEmail: 'rgallagher@salesforce.com',
        receivedAt: hoursAgo(6),
        body: `Hi Alexander and Sarah,

Thank you for working through the license reconciliation with us. As discussed on our call, we have applied the 18% enterprise tier discount for the upcoming calendar year.

The updated order form (Invoice #INV-88912) is attached. Once countersigned, the new licenses will seamlessly activate for your team.

Please let Sarah know if any AP vendor forms need updating.

Best,
Ryan Gallagher
Enterprise Account Director | Salesforce`
      }
    ]
  },

  {
    id: 'em-106',
    accountId: 'acc-1',
    accountEmail: 'alexander.wright@apexholdings.com',
    subject: 'Axios Pro: Autonomous Enterprise AI Agents & Venture Capital Shifts',
    snippet: 'Today in Tech: Why Fortune 500 CIOs are replacing monolithic SaaS platforms with adaptive AI agent fleets. Plus: Q3 software valuation multiples update...',
    sender: {
      name: 'Dan Primack',
      email: 'newsletters@axios.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      role: 'Editorial Director',
      company: 'Axios Media'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' }
    ],
    receivedAt: hoursAgo(7),
    isRead: true,
    isStarred: false,
    isArchived: false,
    isHandled: true,
    tags: ['Newsletter', 'Industry News', 'Automated'],
    priority: 'low',
    classification: {
      category: 'no_reply_needed',
      confidence: 0.99,
      reason: 'Mass automated industry newsletter subscription. Informational content containing no questions or obligations.',
      suggestedAction: 'No action required. Automatically archived into Tech Digests folder.',
      needsReview: false,
      originalCategory: 'no_reply_needed',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Axios Pro Tech newsletter highlighting autonomous agent deployment in Fortune 500 IT stacks and trends in late-stage software multiples.',
      keyTakeaways: [
        '73% of CIOs surveyed are budgeting for specialized autonomous agent systems in 2027.',
        'Series B median multiples rebounded to 11.2x ARR.',
        'Mentions Apex Holdings as a notable pioneer in enterprise workflows.'
      ],
      actionItems: [],
      urgency: 'low',
      sentiment: 'neutral'
    },
    extractedMeeting: null,
    messages: [
      {
        id: 'msg-106-1',
        senderName: 'Dan Primack (Axios)',
        senderEmail: 'newsletters@axios.com',
        receivedAt: hoursAgo(7),
        body: `Axios Pro Tech Digest — November 15, 2026

THE BIG STORY: The Great Agentic Re-architecture
Enterprise software buyers are increasingly skeptical of per-seat seat licenses and migrating toward autonomous agent workflows that directly produce verified outcomes...

DEALS IN THE PIPELINE:
- Autonomous ops startup raised $45M led by Lightspeed
- Apex Holdings expanding enterprise footprint with new intelligent triage suite

Read the full report on Axios Pro.`
      }
    ]
  },

  {
    id: 'em-107',
    accountId: 'acc-2',
    accountEmail: 'alex.wright.personal@gmail.com',
    subject: 'Quick coffee next week? Or thoughts on the JV structure?',
    snippet: 'Hey Alex, Long time no see! Heard great things about your new fund vehicle. Wondering if you are free for a quick coffee in SoHo or 20 mins to brainstorm the JV terms...',
    sender: {
      name: 'Julian Sterling',
      email: 'j.sterling@sterlingventures.co',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      role: 'Managing Partner',
      company: 'Sterling Capital'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alex.wright.personal@gmail.com' }
    ],
    receivedAt: hoursAgo(10),
    isRead: false,
    isStarred: false,
    isArchived: false,
    isHandled: false,
    tags: ['Advisory', 'Flagged for Review', 'Networking'],
    priority: 'normal',
    classification: {
      category: 'assistant_reply',
      confidence: 0.68,
      reason: 'Ambiguous intent: Julian is both a personal acquaintance requesting a casual coffee (which assistant can coordinate) and asking for strategic thoughts on a JV deal structure (which may require client input).',
      suggestedAction: 'Assistant should review: Decide whether Sarah should offer calendar availability or if Alexander wants to send a direct personal greeting.',
      needsReview: true,
      originalCategory: 'assistant_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Julian Sterling reached out warmly to reconnect over coffee in NYC and asked for Alexander’s high-level perspective on a joint venture partnership.',
      keyTakeaways: [
        'Sender is a longtime peer and fellow investor.',
        'Contains both a scheduling request (coffee in SoHo) and strategic deal inquiry.',
        'AI marked confidence at 68% and flagged for Assistant triage.'
      ],
      actionItems: [
        { text: 'Confirm whether Alexander wants to take a meeting with Julian', completed: false, assignee: 'assistant' },
        { text: 'Check calendar for SoHo coffee slots next Wednesday', completed: false, assignee: 'assistant' }
      ],
      urgency: 'medium',
      sentiment: 'positive'
    },
    extractedMeeting: null,
    messages: [
      {
        id: 'msg-107-1',
        senderName: 'Julian Sterling',
        senderEmail: 'j.sterling@sterlingventures.co',
        receivedAt: hoursAgo(10),
        body: `Hey Alex,

Hope you're having an awesome quarter. Saw the TechCrunch piece on Apex's new portfolio milestones — huge congratulations!

I'm in town next Tuesday through Thursday. Wondering if you have 30 minutes for a quick espresso in SoHo? Also wanted to bounce a couple ideas off you regarding the European JV structure we discussed at Sun Valley.

Let me know if you have any bandwidth, or feel free to put me in touch with your team.

Cheers,
Julian`
      }
    ]
  },

  {
    id: 'em-108',
    accountId: 'acc-1',
    accountEmail: 'alexander.wright@apexholdings.com',
    subject: 'Stripe Billing: Monthly Merchant Processing Statement & Invoice Paid',
    snippet: 'Your monthly statement for merchant account acct_1Nx98L is ready. Total volume processed: $318,400.00. No further action is needed on your part...',
    sender: {
      name: 'Stripe Notifications',
      email: 'support@stripe.com',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      role: 'Automated Billing Service',
      company: 'Stripe'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' }
    ],
    receivedAt: daysAgo(1),
    isRead: true,
    isStarred: false,
    isArchived: true,
    isHandled: true,
    tags: ['Receipts', 'Finance', 'Automated'],
    priority: 'low',
    classification: {
      category: 'no_reply_needed',
      confidence: 0.99,
      reason: 'Transaction receipt and monthly reconciliation statement. Automated system email requiring zero response.',
      suggestedAction: 'Auto-archived to Financial Records.',
      needsReview: false,
      originalCategory: 'no_reply_needed',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Automated Stripe statement confirming $318,400 in processed volume with fees debited automatically.',
      keyTakeaways: [
        'Monthly volume: $318,400.00',
        'Stripe processing fees: $9,233.60',
        'Statement marked paid and closed'
      ],
      actionItems: [],
      urgency: 'low',
      sentiment: 'neutral'
    },
    extractedMeeting: null,
    messages: [
      {
        id: 'msg-108-1',
        senderName: 'Stripe Notifications',
        senderEmail: 'support@stripe.com',
        receivedAt: daysAgo(1),
        body: `Hello Alexander,

Your monthly merchant processing statement for account acct_1Nx98L (Apex Enterprise Portal) is now available for download.

Period: October 1 - October 31, 2026
Gross Volume: $318,400.00
Net Payouts: $309,166.40

This is an automated notification. You do not need to reply to this email.`
      }
    ]
  },

  {
    id: 'em-109',
    accountId: 'acc-1',
    accountEmail: 'alexander.wright@apexholdings.com',
    subject: 'Board of Directors: Q4 Strategic Roadmap & Audit Committee Sign-Off',
    snippet: 'Alexander, following up on our executive committee discussion. The audit committee requests your written concurrence on the deferred revenue recognition policy...',
    sender: {
      name: 'Victoria Davenport',
      email: 'vdavenport@davenportlaw.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'Lead Outside Director & Counsel',
      company: 'Davenport & Partners LLP'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alexander.wright@apexholdings.com' }
    ],
    receivedAt: daysAgo(1),
    isRead: false,
    isStarred: true,
    isArchived: false,
    isHandled: false,
    tags: ['Board of Directors', 'Legal', 'Audit'],
    priority: 'urgent',
    classification: {
      category: 'client_reply',
      confidence: 0.96,
      reason: 'Formal governance and audit committee matter requiring the Chief Executive’s direct written sign-off and legal acknowledgement.',
      suggestedAction: 'Review paragraph 3 regarding ASC 606 revenue treatment and provide written concurrence.',
      needsReview: false,
      originalCategory: 'client_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Lead Director Victoria Davenport is requesting Alexander’s official written sign-off on the Q4 revenue recognition policy ahead of the formal board audit session next Monday.',
      keyTakeaways: [
        'Audit committee requires CEO concurrence on revised ASC 606 revenue recognition.',
        'PwC auditors have completed the preliminary review without material findings.',
        'Sign-off needed by Friday 6:00 PM EST.'
      ],
      actionItems: [
        { text: 'Review audit committee memo on ASC 606 adjustments', completed: false, assignee: 'client' },
        { text: 'Reply to Victoria Davenport with formal sign-off', completed: false, assignee: 'client' }
      ],
      urgency: 'urgent',
      sentiment: 'neutral'
    },
    extractedMeeting: {
      title: 'Board Audit Committee Review',
      date: 'Monday, Nov 24, 2026',
      time: '11:00 AM - 12:30 PM EST',
      location: 'Apex HQ Boardroom (Virtual Bridge Attached)',
      attendees: ['Alexander Wright', 'Victoria Davenport', 'Audit Committee Members'],
      status: 'confirmed'
    },
    messages: [
      {
        id: 'msg-109-1',
        senderName: 'Victoria Davenport',
        senderEmail: 'vdavenport@davenportlaw.com',
        receivedAt: daysAgo(1),
        body: `Dear Alexander,

I hope your week is off to a productive start.

As our audit committee prepares the year-end governance packet, PwC has requested standard CEO concurrence regarding the multi-year SaaS deferred revenue recognition schedule (Note 4 in the financials).

The memorandum from our CFO is attached. Please review and reply with your formal concurrence so we can finalize the audit binder before Monday’s board meeting.

Sincerely,
Victoria Davenport
Lead Outside Director | Apex Holdings`
      }
    ]
  },

  {
    id: 'em-110',
    accountId: 'acc-2',
    accountEmail: 'alex.wright.personal@gmail.com',
    subject: 'Flight Itinerary Confirmation: JFK to SFO for Tech Week (Delta DL 429)',
    snippet: 'Booking confirmation for Alexander Wright. JFK Departure: Sunday 8:15 AM -> SFO Arrival: 11:42 AM. First Class Seat 2B. Calendar invite attached...',
    sender: {
      name: 'Delta Air Lines',
      email: 'ticketreceipt@delta.com',
      avatar: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=150&auto=format&fit=crop&q=80',
      role: 'Automated Travel Desk',
      company: 'Delta Air Lines'
    },
    recipients: [
      { name: 'Alexander Wright', email: 'alex.wright.personal@gmail.com' },
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
    ],
    receivedAt: daysAgo(2),
    isRead: true,
    isStarred: false,
    isArchived: false,
    isHandled: true,
    tags: ['Travel', 'Flights', 'Logistics'],
    priority: 'low',
    classification: {
      category: 'no_reply_needed',
      confidence: 0.98,
      reason: 'Standard airline booking confirmation and itinerary. Handled by executive travel calendar sync.',
      suggestedAction: 'Calendar event already placed. Confirm car service arrival at JFK at 6:45 AM.',
      needsReview: false,
      originalCategory: 'no_reply_needed',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Confirmed flight itinerary for Alexander Wright: Delta DL 429 from JFK to SFO this Sunday, First Class seat 2B.',
      keyTakeaways: [
        'Departure: Sunday 8:15 AM JFK Terminal 4.',
        'Arrival: 11:42 AM SFO Terminal 2.',
        'Confirmation code: H8X9LQ.'
      ],
      actionItems: [
        { text: 'Coordinate SFO black car pickup with driver Jamal', completed: true, assignee: 'assistant' }
      ],
      urgency: 'low',
      sentiment: 'neutral'
    },
    extractedMeeting: {
      title: 'Flight DL 429: JFK -> SFO',
      date: 'Sunday, Nov 23, 2026',
      time: '8:15 AM - 11:42 AM PST',
      location: 'JFK Terminal 4 to SFO Terminal 2',
      attendees: ['Alexander Wright'],
      status: 'confirmed'
    },
    messages: [
      {
        id: 'msg-110-1',
        senderName: 'Delta Air Lines',
        senderEmail: 'ticketreceipt@delta.com',
        receivedAt: daysAgo(2),
        body: `Dear Alexander Wright,

Thank you for choosing Delta. Your flight has been confirmed.

Flight: DL 429
Depart: New York (JFK) - 8:15 AM, Sun Nov 23
Arrive: San Francisco (SFO) - 11:42 AM, Sun Nov 23
Class: First Class (Seat 2B)
SkyMiles: #9482710398

Sky Club access is available at JFK T4.`
      }
    ]
  },

  {
    id: 'em-111',
    accountId: 'acc-3',
    accountEmail: 'sophia.chen@bioventures.com',
    subject: 'Series A Lead Term Sheet & Board Representation — NeuroGenomics Inc.',
    snippet: 'Dr. Chen, our board convened and agreed to the $18M pre-money valuation with BioVentures as the lead investor. We require your sign-off on the 20% option pool allocation...',
    sender: {
      name: 'Dr. Ethan Bradley',
      email: 'e.bradley@neurogenomics.bio',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'CEO & Co-Founder',
      company: 'NeuroGenomics Inc.'
    },
    recipients: [
      { name: 'Dr. Sophia Chen', email: 'sophia.chen@bioventures.com' },
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
    ],
    receivedAt: hoursAgo(3),
    isRead: false,
    isStarred: true,
    isArchived: false,
    isHandled: false,
    tags: ['BioVentures', 'Lead Investment', 'Approvals'],
    priority: 'urgent',
    classification: {
      category: 'client_reply',
      confidence: 0.97,
      reason: 'Lead Series A venture investment term sheet and board seat appointment requires Managing Partner Dr. Chen direct signature.',
      suggestedAction: 'Review ESOP pool dilution clause and execute term sheet countersignature before syndicate deadline.',
      needsReview: false,
      originalCategory: 'client_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Dr. Ethan Bradley accepted BioVentures as lead investor for NeuroGenomics Series A ($8M check at $18M pre) and requests Sophia’s sign-off on the 20% ESOP pool clause.',
      keyTakeaways: [
        'BioVentures leading with an $8M check out of $12M round.',
        'Board seat granted to Dr. Sophia Chen.',
        'ESOP option pool fixed at 20% unallocated pre-money.'
      ],
      actionItems: [
        { text: 'Review ESOP expansion impact in cap table model', completed: false, assignee: 'client' },
        { text: 'Execute lead term sheet signature page', completed: false, assignee: 'client' }
      ],
      urgency: 'urgent',
      sentiment: 'positive'
    },
    extractedMeeting: null,
    messages: [
      {
        id: 'msg-111-1',
        senderName: 'Dr. Ethan Bradley',
        senderEmail: 'e.bradley@neurogenomics.bio',
        receivedAt: hoursAgo(3),
        body: `Dear Sophia,

Delighted to inform you that our board of directors unanimously selected BioVentures Capital as the lead investor for our Series A financing.

Attached is the revised term sheet reflecting the $18M pre-money valuation and the dedicated board seat for you. We need your written concurrence on Section 4.2 regarding the 20% unallocated option pool before our syndicate call tomorrow.

Looking forward to building the future of gene therapy together.

Warm regards,
Ethan Bradley, MD/PhD
CEO, NeuroGenomics Inc.`
      }
    ]
  },

  {
    id: 'em-112',
    accountId: 'acc-3',
    accountEmail: 'sophia.chen@bioventures.com',
    subject: 'Boston Biotech Executive Dinner — Table for 4 Confirmed at Contessa',
    snippet: 'Hi Sarah, confirming Dr. Chen’s dinner reservation at Contessa Boston next Wednesday, Nov 19 at 7:30 PM with Flagship Pioneering partners...',
    sender: {
      name: 'Contessa Concierge',
      email: 'reservations@contessaboston.com',
      avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&auto=format&fit=crop&q=80',
      role: 'VIP Reservations Desk',
      company: 'Contessa Boston'
    },
    recipients: [
      { name: 'Dr. Sophia Chen', email: 'sophia.chen@bioventures.com' },
      { name: 'Sarah Jenkins', email: 'sarah.jenkins@apexholdings.com' }
    ],
    receivedAt: hoursAgo(5),
    isRead: true,
    isStarred: false,
    isArchived: false,
    isHandled: false,
    tags: ['Dining', 'Calendar', 'Boston'],
    priority: 'normal',
    classification: {
      category: 'assistant_reply',
      confidence: 0.96,
      reason: 'Routine VIP dinner reservation confirmation and dining coordination suitable for the Executive Assistant.',
      suggestedAction: 'Calendar invite confirmed. Verify dietary restrictions for Flagship guests with Sarah.',
      needsReview: false,
      originalCategory: 'assistant_reply',
      overriddenBy: null,
      overriddenAt: null
    },
    aiSummary: {
      tldr: 'Confirmed private table for 4 for Dr. Sophia Chen at Contessa Boston next Wednesday at 7:30 PM.',
      keyTakeaways: [
        'Date: Wednesday, Nov 19, 2026 at 7:30 PM EST.',
        'Location: Contessa Rooftop (Newbury Hotel, Boston).',
        'Guests: 2 Managing Partners from Flagship Pioneering.'
      ],
      actionItems: [
        { text: 'Add Contessa reservation to Sophia’s travel calendar', completed: true, assignee: 'assistant' }
      ],
      urgency: 'low',
      sentiment: 'neutral'
    },
    extractedMeeting: {
      title: 'Biotech Executive Dinner with Flagship Partners',
      date: 'Wednesday, Nov 19, 2026',
      time: '7:30 PM - 9:30 PM EST',
      location: 'Contessa Rooftop (The Newbury Boston, 3 Newbury St)',
      attendees: ['Dr. Sophia Chen', 'Flagship Pioneering Partners'],
      status: 'confirmed'
    },
    messages: [
      {
        id: 'msg-112-1',
        senderName: 'Contessa Concierge',
        senderEmail: 'reservations@contessaboston.com',
        receivedAt: hoursAgo(5),
        body: `Dear Sarah,

We are pleased to confirm Dr. Sophia Chen's reservation:

Party Size: 4 Guests
Date: Wednesday, November 19, 2026
Time: 7:30 PM
Seating: Glass Rooftop Conservatory (Table 14)

Please let us know if any special dietary preferences or wine cellar requests should be pre-arranged.

Warm regards,
Contessa Concierge Team`
      }
    ]
  }
];
