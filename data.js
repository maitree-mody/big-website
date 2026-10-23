/*
 * ============================================================
 *  BIG WEBSITE CONTENT — edit this file to update the site.
 *  No coding needed: change the text between the quotes,
 *  copy/paste a { ... } block to add a new item.
 * ============================================================
 */

window.BIG = {
  links: {
    email: "barnardinvestmentgroup@gmail.com",
    instagram: "https://www.instagram.com/barnardinvestmentgroup/",
    linkedin: "https://www.linkedin.com/company/barnard-investment-group/",
    substack: "https://barnardinvestmentgroup.substack.com/",
    subscribe: "https://barnardinvestmentgroup.substack.com/subscribe",
    linktree: "https://linktr.ee/barnardinvestmentgroup",
    // Paste the e-board application form link here when applications open (leave "" to hide the button)
    eboardApplication: "",
  },


  // "Speakers & site visits with" list on the home page
  firms: [
    { name: "Goldman Sachs", note: "Site visits · Speakers" },
    { name: "Bank of America", note: "Site visits" },
    { name: "BlackRock", note: "Fireside chat" },
    { name: "Blackstone", note: "Speaker" },
    { name: "KKR", note: "Speaker" },
    { name: "Morgan Stanley", note: "Speaker" },
    { name: "J.P. Morgan", note: "Speaker" },
    { name: "Macquarie", note: "Speaker" },
    { name: "HSBC", note: "Site visit · Office hours" },
    { name: "PGIM", note: "Recruiting events" },
    { name: "Centerview Partners", note: "Speaker panel" },
    { name: "Santander", note: "Career panel" },
  ],

  /*
   * EVENTS — one list. The site sorts them by date automatically:
   * future dates show under "Upcoming", past dates go to the archive.
   * Every event gets its own page.
   *
   * type:        "speaker" | "site-visit" | "workshop" | "community"
   * date:        "YYYY-MM-DD"        time: any text, e.g. "5:00 – 6:00 PM"
   * description: one or two sentences (shown in lists and on the event page)
   * recap:       optional longer write-up for the event page — use "\n\n" between paragraphs
   * photos:      optional list of image paths, e.g. ["assets/events/gs-1.jpg", "assets/events/gs-2.jpg"]
   * link:        optional RSVP / registration link
   */
  events: [
    { date: "2026-10-30", time: "10:00 AM – 12:00 PM", type: "site-visit", title: "Bank of America Site Visit", org: "Bank of America", location: "One Bryant Park",
      description: "Tour Bank of America's headquarters and hear from professionals across the firm.", link: "https://barnardinvestmentgroup.substack.com/p/barnard-investment-group-weekly-newsletter-d99" },
    { date: "2026-10-25", time: "5:00 – 6:00 PM", type: "community", title: "First General Body Meeting", org: "BIG", location: "Milstein LL001",
      description: "Meet the E-Board, learn about careers in finance, and get an introduction to essential recruiting technicals. Attendance counts toward general body membership.", link: "https://barnardinvestmentgroup.substack.com/p/barnard-investment-group-weekly-newsletter-d99" },
    { date: "2026-10-23", time: "8:30 – 10:00 AM", type: "site-visit", title: "Goldman Sachs Site Visit", org: "Goldman Sachs", location: "200 West Street",
      description: "A morning panel at Goldman Sachs headquarters for selected members." },
    { date: "2026-10-22", time: "7:00 – 8:00 PM", type: "speaker", title: "Rock the Street, Wall Street Career Panel", org: "Rock the Street, Wall Street", location: "Diana 203",
      description: "Career exploration in finance with panelists Rose Lee (Santander) and Allison Jegla (private market investing).",
      recap: "An informative session on career exploration in finance, aimed especially at first-years and sophomores. Panelists Rose Lee of Santander and Allison Jegla, who works in private market investing, talked through how they found their paths into the industry.\n\nRock the Street, Wall Street is a nonprofit that equips university women with career experience, mentorship, and a network of finance professionals, including free coffee chats and access to selective programs with its industry partners." },
    { date: "2026-10-16", time: "11:00 AM – 12:00 PM", type: "speaker", title: "PGIM Fixed Income Recruiting Event", org: "PGIM", location: "Milstein" },
    { date: "2026-09-24", time: "6:30 PM", type: "workshop", title: "Girls Who Invest Info Session", org: "Girls Who Invest", location: "Milstein",
      description: "An info session on the Girls Who Invest Scholars Program, a pathway into asset management." },
    { date: "2026-05-05", type: "workshop", title: "Renting in New York Webinar", org: "Cooper & Cooper Real Estate", location: "Virtual",
      description: "A practical session on finding and renting an apartment in New York City." },
    { date: "2026-04-22", time: "6:30 – 7:30 PM", type: "speaker", title: "ÊTRE Speaker Panel", org: "ÊTRE", location: "Milstein",
      description: "A speaker panel led by ÊTRE's founder on navigating corporate spaces with confidence." },
    { date: "2026-04-21", time: "6:30 – 7:30 PM", type: "speaker", title: "Amanda Magliaro, Partner", org: "KKR Capital Markets", location: "Milbank",
      description: "A conversation with Amanda Magliaro, Partner in KKR's Capital Markets business." },
    { date: "2026-04-13", type: "speaker", title: "Venkat Kausik, Vice President", org: "Macquarie Group",
      description: "A talk with Venkat Kausik, Vice President in Principal Investing at Macquarie Group and a Columbia alum." },
    { date: "2026-03-03", type: "speaker", title: "Fireside Chat with Jasmine Fan", org: "BlackRock",
      description: "A fireside chat with Jasmine Fan, Investment Strategist at BlackRock." },
    { date: "2026-02-27", type: "workshop", title: "Financial Well-Being × BIG", org: "Lefrak Financial Well-Being" },
    { date: "2026-02-13", type: "site-visit", title: "HSBC Site Visit", org: "HSBC", location: "Hudson Yards" },
    { date: "2026-02-09", time: "7:00 – 8:00 PM", type: "workshop", title: "Resume Review Workshop", org: "Beyond Barnard", location: "304 Barnard Hall",
      description: "Resume feedback from BIG board members and Beyond Barnard staff." },
    { date: "2026-02-05", time: "7:00 – 8:00 PM", type: "speaker", title: "Alessandra Rago", org: "Blackstone", location: "Milstein",
      description: "A conversation with Alessandra Rago of Blackstone's Private Wealth Solutions group." },
    // NOTE: photos below were matched to events by guesswork from Instagram — please confirm or swap
    { date: "2026-01-30", type: "site-visit", title: "Goldman Sachs Site Visit", org: "Goldman Sachs", location: "200 West Street",
      description: "Members visited Goldman Sachs headquarters for a panel with professionals across the firm.",
      photos: ["assets/gallery/photo-01.jpg", "assets/gallery/photo-11.jpg", "assets/gallery/photo-12.jpg"] },
    { date: "2025-11-24", time: "6:00 – 7:00 PM", type: "community", title: "Recruitment & Return Offer Q&A", org: "BIG", location: "Fayerweather 301",
      description: "A candid conversation with upperclassmen about recruitment: how to prepare, the dos and don'ts, and what they wish they knew.",
      photos: ["assets/gallery/photo-08.jpg", "assets/gallery/photo-06.jpg", "assets/gallery/photo-04.jpg"] },
    { date: "2025-11-17", time: "7:00 – 8:00 PM", type: "speaker", title: "Saumya Jain", org: "Morgan Stanley Investment Management", location: "Hamilton",
      description: "A talk with Saumya Jain of Morgan Stanley Investment Management." },
    { date: "2025-10-15", time: "6:00 – 7:00 PM", type: "speaker", title: "PGIM Fixed Income Recruiting Event", org: "PGIM", location: "Lerner",
      description: "PGIM professionals on careers in fixed income and upcoming internship opportunities." },
    { date: "2025-10-03", time: "3:30 – 5:00 PM", type: "speaker", title: "Goldman Sachs Asset Management", org: "Goldman Sachs", location: "Lerner",
      description: "Investors from Goldman Sachs Asset Management, featuring a student stock pitch and Q&A." },
    { date: "2025-02-19", time: "7:00 PM", type: "speaker", title: "Speaker Panel", org: "Centerview Partners", location: "Lerner Cinema" },
    { date: "2024-12-06", time: "9:00 – 10:30 AM", type: "site-visit", title: "Goldman Sachs Site Visit", org: "Goldman Sachs",
      photos: ["assets/gallery/photo-07.jpg", "assets/gallery/photo-05.jpg"] },
    { date: "2024-12-03", type: "speaker", title: "The Wall Street Skinny", org: "The Wall Street Skinny", location: "Virtual",
      description: "Meet the founders of The Wall Street Skinny, transforming finance education for the next generation." },
    { date: "2024-11-15", type: "site-visit", title: "Bank of America Site Visit", org: "Bank of America", location: "One Bryant Park",
      description: "A visit to Bank of America's headquarters with a panel of professionals, a tour of the office, and a look at career paths and internships.",
      photos: ["assets/gallery/photo-03.jpg", "assets/gallery/photo-09.jpg"] },
    { date: "2024-11-13", time: "6:00 – 7:00 PM", type: "speaker", title: "Wedbush Securities", org: "Wedbush", location: "Satow Room" },
    { date: "2024-10-17", time: "7:00 – 8:00 PM", type: "speaker", title: "Rahul Rana & Krish Nagpal", org: "Solari · Amazon", location: "Diana 203" },
    { date: "2024-09-19", time: "6:00 – 7:00 PM", type: "speaker", title: "Seema Chetal, Managing Director", org: "J.P. Morgan",
      description: "Seema Chetal, Managing Director in alternative investments at J.P. Morgan, on her 30+ years in the industry." },
  ],

  /*
   * EXECUTIVE BOARD — photo goes in assets/eboard/ (square works best).
   * Leave photo "" to show initials. Leave linkedin "" to hide the link.
   */
  eboardYear: "2026–2027",
  eboard: [
    { name: "Annabelle Lu", role: "President", major: "Economics–Political Economy", photo: "assets/eboard/annabelle-lu.jpg",
      experience: ["HSBC", "J.P. Morgan", "Girls Who Invest"], linkedin: "" },
    { name: "Akansha Gupta", role: "Vice President", major: "Economics–Statistics", photo: "assets/eboard/akansha-gupta.jpg",
      experience: ["Zeus Global", "Kotak Asset Managers", "Chai Ventures"], linkedin: "" },
    { name: "Sachi Goel", role: "Vice President", major: "Economics", photo: "assets/eboard/sachi-goel.jpg",
      experience: ["Argo Partners", "Waterford Real Estate"], linkedin: "" },
    { name: "Dena Chawaldit", role: "Treasurer", major: "Economics", photo: "assets/eboard/dena-chawaldit.jpg",
      experience: ["LGT Private Bank", "CG Capital", "BankX"], linkedin: "" },
    { name: "Sunayna Adoni", role: "Secretary", major: "Economics", photo: "assets/eboard/sunayna-adoni.jpg",
      experience: ["PGIM", "Girls Who Invest", "Ally Equity Partners"], linkedin: "" },
    { name: "Geya Ling Bu", role: "Secretary", major: "Economics", photo: "assets/eboard/geya-ling-bu.jpg",
      experience: ["Inveready", "Galaxy Venture Capital"], linkedin: "" },
    { name: "Pallavi Saxena", role: "Head of Education", major: "Economics & Cognitive Science", photo: "assets/eboard/pallavi-saxena.jpg",
      experience: ["Tech & WM Consulting", "Product / UX Research"], linkedin: "" },
    { name: "Nuna Endale", role: "Head of Outreach", major: "Economics & Social History", photo: "assets/eboard/nuna-endale.jpg",
      experience: ["American Express", "Laidlaw Research Scholar"], linkedin: "" },
    { name: "Ashley Wang", role: "Board Member", major: "Financial Economics", photo: "assets/eboard/ashley-wang.jpg",
      experience: ["UBS", "Stellex Capital", "Girls Who Invest"], linkedin: "" },
  ],
};
