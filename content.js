/* content.js: all text, links, projects and certificates for the site.
   Empty "" fields are hidden. Keep the commas. */

window.SITE_CONTENT = {

  /* ------------------------------------------------------------------
     1. BASICS
     ------------------------------------------------------------------ */
  person: {
    name: "Ghufran Ahmad",
    brand: "GhufranMedDesigns",
    role: "Third-year PharmD student",
    location: "Multan, Pakistan",
    // Hero line on the home page.
    // Put *stars* around ONE word to colour it with the accent.
    updated: "November 2026",                   // shown in the footer as "Last updated ..."
    photo: "assets/images/ghufran-ahmad.jpg",   // shown on the About page. Empty = no photo.
    headline: "I make pharmacology easier to *see*.",
    subline: "Mostly infographics and 3D learning tools for pharmacy students. On the side, I'm learning how research is actually done."
  },

  /* ------------------------------------------------------------------
     1b. FACTS  (the row of big numbers under the hero)
     ------------------------------------------------------------------
     Real numbers only. Change, add or remove lines (2 to 4 looks best).
     Example to add:  { number: "60+", label: "posts on LinkedIn" },
     ------------------------------------------------------------------ */
  facts: [
    { number: "auto:tools",        label: "interactive 3D learning tools" },        // counted for you from section 4
    { number: "Weekly",            label: "mechanism posts, each with a cited source" },
    { number: "auto:certificates", label: "certificates" }                          // counted for you from section 8
  ],

  /* ------------------------------------------------------------------
     2. LINKS  (any link left as "" is hidden everywhere on the site)
     ------------------------------------------------------------------
     Instagram and YouTube appear as small footer links only.
     (To also show them as big channel cards on the home page, add
     "instagram" and "youtube" to channels.cards in section 5.)
     ------------------------------------------------------------------ */
  links: {
    linkedin:  "https://linkedin.com/in/ghufranmeddesigns",
    github:    "",   // hidden. Paste your GitHub profile link here if you want it shown.
    cv:        "assets/cv.pdf",   // the web copy of your CV (phone number removed). Set to "" to hide the button.
    orcid:     "https://orcid.org/0009-0008-8929-9729",
    instagram: "https://www.instagram.com/ghufran.meddesigns",
    youtube:   "https://www.youtube.com/@ghufranmeddesigns",
    facebook:  "",   // optional: your Facebook page URL
    email:     "ghufranahmad0318@gmail.com"    // shown as an email button. Set to "" to hide it.
  },

  /* ------------------------------------------------------------------
     3. TOPICS  (the moving strip of words on the home page)
     ------------------------------------------------------------------ */
  topics: ["Pharmacology", "Medical Writing", "Clinical Pharmacy", "Infographics", "Research Skills"],

  /* ------------------------------------------------------------------
     4. PROJECTS  (Work page, home page, case-study pages)
     ------------------------------------------------------------------
     type      one of: "tool" | "infographic" | "exhibit" | "animation" | "video" | "external"
     id        short unique name, lowercase, hyphens only. Used in the page
               address: project.html?id=your-id   Never reuse an id.
     featured  true = also shown on the home page
     draft     true = HIDDEN from the whole site (use it for unfinished work)
     Optional on every project: tools, date, status, result, note, credit,
     instagramUrl, youtubeUrl, linkedinUrl. Empty ones are hidden.
     The order here is the order on the site. Put your best work first.
     ------------------------------------------------------------------ */
  projects: [

    {
      id: "breath-journey",
      type: "tool",
      featured: true,
      draft: false,
      title: "Breath Journey: Every Breath, Body to Cell",
      caption: "A 3D lesson on breathing. You follow one breath from the nose down to a single cell over 11 chapters. The last one, Clinic, covers 9 conditions, including asthma, pneumonia, opioid overdose and carbon monoxide poisoning.",
      src: "breath-journey/index.html",              // the full-screen page it opens
      image: "assets/images/breath-journey-poster.jpg",
      alt: "Cover image for Breath Journey: a transparent 3D body with the lungs highlighted",
      status: "Ready to explore",
      why: "It started as an experiment. I wanted to see if one physiology topic could become something you click through and explore, instead of a page you read.",
      note: "For learning only. Not for patient care.",
      credit: "Anatomy models: BodyParts3D (DBCLS, CC BY 4.0) and HuBMAP Human Reference Atlas 3D models (Browne and Schlehlein, CC BY 4.0).",
      result: "",
      tools: [],
      date: "2026",
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: ""
    },

    {
      id: "cns-atlas",
      type: "tool",
      featured: true,
      draft: false,
      title: "CNS Atlas: brain diseases and their drugs",
      caption: "My biggest project so far. Each lesson starts with a healthy brain, shows what goes wrong in the disease, and then puts each drug where it acts. Five diseases for now: Parkinson, Alzheimer, multiple sclerosis, ALS and Huntington. Every lesson ends with a case quiz, and there is a quick revision mode for the night before an exam.",
      src: "cns-atlas/index.html",
      image: "assets/images/cns-atlas-poster.jpg",
      alt: "Cover image for CNS Atlas: the headline Follow each drug to its target in the brain, beside a branching neuron",
      status: "Ready to explore",
      why: "Pharmacology-II this year is full of CNS drugs, so I started here. It is my biggest build so far: the brain anatomy came first, then five diseases, then each drug placed where it acts.",
      note: "For learning only. Not for patient care.",
      credit: "Drug facts checked against Katzung, Basic and Clinical Pharmacology, Lippincott Pharmacology and FDA labels, as listed inside the tool. Brain model adapted from \"Brain for Blender\" by Anderson M. Winkler (brainder.org), CC BY-SA 3.0. Neuron shapes from NeuroMorpho.Org (Jacobs archive). Music: \"Vaporware\" by The Cynic Project (OpenGameArt.org, CC0). Button sounds: Kenney UI SFX Set (CC0).",
      result: "",
      tools: [],
      date: "2026",
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: ""
    },

    {
      id: "metformin-mechanism",
      type: "infographic",
      featured: true,
      draft: false,
      title: "Metformin: a newly described brain pathway",
      caption: "Based on a 2025 mouse study (Lin et al., Science Advances). It was done in mice, so it still has to be shown in people.",
      series: "",
      image: "assets/images/metformin-mechanism.png",
      alt: "Infographic titled Metformin: a newly described brain pathway",
      result: "450+ reactions and 49 comments on LinkedIn",
      status: "",
      note: "",
      credit: "",
      tools: [],          // example: ["Canva"]
      date: "2026",           // example: "October 2026"
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: "https://lnkd.in/p/dptf3tgV"
    },

    {
      id: "drug-interactions-5",
      type: "infographic",
      featured: true,
      draft: false,
      title: "5 drug interactions every pharmacist should know",
      caption: "Five combinations worth checking before you dispense, colour coded by how serious they are.",
      series: "",
      image: "assets/images/drug-interactions-5.png",
      alt: "Infographic titled 5 drug interactions every pharmacist should know",
      result: "74 reactions on LinkedIn",
      status: "",
      note: "",
      credit: "",
      tools: [],
      date: "2026",
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: ""
    },

    {
      id: "acetylcholine-mechanism",
      type: "infographic",
      featured: false,
      draft: true,         // HIDDEN from the site. Change to false to bring it back.
      title: "Acetylcholine: mechanism of action",
      caption: "Seven-step infographic covering synthesis, storage, release, receptor binding, signal transduction, termination and recycling, with nicotinic and muscarinic receptor types.",
      series: "",
      image: "assets/images/acetylcholine-mechanism.png",
      alt: "Infographic titled Acetylcholine: mechanism of action",
      result: "",
      status: "",
      note: "",
      credit: "",
      tools: [],
      date: "",
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: ""
    },

    {
      id: "aloe-pharmacognosy",
      type: "exhibit",
      featured: true,
      draft: false,
      title: "Aloe (Aloe barbadensis) pharmacognosy profile",
      caption: "Our group's pharmacognosy table on Aloe barbadensis at the Allied PharmaExhibition 2026 in Multan. I designed the poster and presented with my group. Supervised by Dr. Asad Saleem Sial.",
      series: "",
      image: "assets/images/aloe-pharmacognosy.jpg",
      alt: "Exhibition table with labelled samples: dried aloe latex, aloe gel, a market product, an aloe leaf and aloe vera plants",
      gallery: [          // extra pictures shown on the project page
        { image: "assets/images/aloe-poster.jpg", alt: "The Aloe pharmacognosy poster, covering source, constituents, internal structure, actions, uses and market products" },
        { image: "assets/images/aloe-presenting.jpg", alt: "Ghufran Ahmad standing beside the Aloe display and poster at the exhibition" }
      ],
      result: "",
      status: "",
      note: "",
      credit: "",
      tools: [],
      date: "May to June 2026",
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: ""
    }

    /* ================= TEMPLATES: copy one, paste it ABOVE this comment,
       and add a comma after the closing } of the project before it. =====

    // ---------- INTERACTIVE TOOL (a full-screen .html page in its own folder) ----------
    {
      id: "my-new-tool",
      type: "tool",
      featured: true,
      draft: false,
      title: "",
      caption: "",
      src: "my-new-tool/index.html",                // put the file at  my-new-tool/index.html
      image: "assets/images/my-new-tool-poster.jpg", // a screenshot, wide shape
      alt: "",
      status: "Ready to explore",
      note: "For learning only. Not for patient care.",
      credit: "",                                   // credit and licence for any third-party 3D models
      result: "",
      tools: [],
      date: "",
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: ""
    },

    // ---------- INFOGRAPHIC (an image) ----------
    {
      id: "my-new-infographic",
      type: "infographic",
      featured: false,
      draft: false,
      title: "",
      caption: "",
      series: "",
      image: "assets/images/my-new-infographic.png",
      alt: "",                                      // one line describing the image
      result: "",                                   // example: "120 reactions on LinkedIn" (real numbers only)
      status: "",
      note: "",
      credit: "",
      tools: [],
      date: "",
      instagramUrl: "",
      youtubeUrl: "",
      linkedinUrl: ""
    },

    // ---------- EXHIBIT (a photo of a poster, stall or event) ----------
    {
      id: "my-exhibit",
      type: "exhibit",
      featured: false,
      draft: false,
      title: "",
      caption: "",
      image: "assets/images/my-exhibit.jpg",
      alt: "",
      gallery: [],                                  // optional extra pictures: { image: "", alt: "" }
      date: "",
      result: "", status: "", note: "", credit: "", tools: [],
      instagramUrl: "", youtubeUrl: "", linkedinUrl: ""
    },

    // ---------- ANIMATION (a small self-contained .html file shown inside the page) ----------
    {
      id: "my-new-animation",
      type: "animation",
      featured: false,
      draft: false,
      title: "",
      caption: "",
      src: "assets/animations/my-new-animation.html",
      poster: "assets/images/my-new-animation-poster.png",
      alt: "",
      aspect: "16 / 9",                             // "9 / 16" tall, "16 / 9" wide, "1 / 1" square
      result: "", status: "", note: "", credit: "", tools: [], date: "",
      instagramUrl: "", youtubeUrl: "", linkedinUrl: ""
    },

    // ---------- SHORT VIDEO (vertical 9:16 .mp4) ----------
    {
      id: "my-new-video",
      type: "video",
      featured: false,
      draft: false,
      title: "",
      caption: "",
      src: "assets/videos/my-new-video.mp4",
      poster: "assets/images/my-new-video-poster.png",
      alt: "",
      duration: "",                                 // example: "0:42"
      result: "", status: "", note: "", credit: "", tools: [], date: "",
      instagramUrl: "", youtubeUrl: "", linkedinUrl: ""
    },

    // ---------- EXTERNAL POST (a card that opens a LinkedIn, Instagram or YouTube post) ----------
    {
      id: "my-external-post",
      type: "external",
      featured: false,
      draft: false,
      title: "",
      caption: "",
      platform: "LinkedIn",                         // "LinkedIn" | "Instagram" | "YouTube"
      url: "",                                      // the full link to the post
      image: "",                                    // optional thumbnail in assets/images
      alt: "",
      date: ""
    },

    ==================================================================== */
  ],

  /* ------------------------------------------------------------------
     5. CHANNELS  (home page block)
     ------------------------------------------------------------------
     A channel card appears only when its link in section 2 is filled.
     highlight: one real result to show beside the channel cards.
     youtubeVideos: paste only the video ID (the part after "v=").
     instagramPosts: cards that link out to a post. No embed scripts.
     ------------------------------------------------------------------ */
  channels: {
    // which links become big cards on the home page. Others stay as footer links only.
    cards: ["linkedin", "facebook"],
    linkedinNote:  "Infographics, and notes on what I'm learning.",
    facebookNote:  "Infographics for pharmacy and medical students.",
    instagramNote: "",
    youtubeNote:   "",

    highlight: {
      label: "Most discussed",
      big: "450+ reactions, 49 comments",
      text: "My metformin post. Still the one people comment on most.",
      url: "https://lnkd.in/p/dptf3tgV"
    },

    youtubeVideos: [
      // { videoId: "", title: "" },
    ],

    instagramPosts: [
      // { url: "", title: "", image: "" },
    ]
  },

  /* ------------------------------------------------------------------
     5a. MECHANISM SERIES  (a text list on the Work page)
     ------------------------------------------------------------------
     Your written LinkedIn posts. Each line: the drug or topic, the post's
     headline, and the paper it is built on. Newest first.
     To add one, copy a line. To hide the whole list:  posts: []
     ------------------------------------------------------------------ */
  writing: {
    note: "Short LinkedIn posts, one mechanism each. The source goes at the bottom so anyone can check it.",
    posts: [
      { topic: "Drug withdrawal",  title: "Withdrawal is not one thing. It is four.", source: "Ross, Br Heart J 1981. ESE and Endocrine Society joint guideline 2024. And others." },
      { topic: "Abacavir",         title: "The drug did not change the immune system. It changed what the immune system was looking at.", source: "Illing et al., Nature 2012. Mallal et al., NEJM 2008." },
      { topic: "Thalidomide",      title: "One pure form goes in. Both come out.", source: "Eriksson et al., Chirality 1995 and 1998." },
      { topic: "Food and drugs",   title: "Four reasons a drug comes with a food instruction.", source: "" },   // add the source to show this post on the site
      { topic: "Dosage forms",     title: "Oral drugs you must never crush: four mechanisms.", source: "ISMP list of oral dosage forms that should not be crushed." },
      { topic: "Codeine",          title: "Codeine is a courier, not the cure.", source: "Mignat, Life Sciences 1995. Vree, Int J Clin Pract 2000. CPIC 2011." },
      { topic: "Irinotecan",       title: "The liver disarms the chemo. The bacteria re-arm it.", source: "Wallace et al., Science 2010." },
      { topic: "Sorivudine",       title: "Two safe drugs. Eighteen deaths.", source: "Okuda et al., JPET 1998. Nakayama et al., Pharmacogenetics 1997." },
      { topic: "Levodopa",         title: "Your gut bacteria are eating your Parkinson's medication.", source: "Maini Rekdal et al., Science 2019. van Kessel et al., Nature Communications 2019." },
      { topic: "Digoxin",          title: "The dose was right. The gut disagreed.", source: "Haiser et al., Science 2013." },
      { topic: "Paracetamol",      title: "Nobody fully knows how paracetamol works.", source: "Ayoub, Temperature 2021." },
      { topic: "GLP-1 drugs",      title: "We call them GLP-1 drugs. The newest science points to a different hormone.", source: "McMorrow et al., JCI 2025. Teixidor-Deulofeu et al., Cell Metabolism 2025." }
    ]
  },

  /* ------------------------------------------------------------------
     5b. SCIENCE COMMUNICATION  (side project: short explainer videos)
     ------------------------------------------------------------------
     videoId = the code at the end of a YouTube link.
       youtube.com/shorts/saVG_Ka_kcI   ->   "saVG_Ka_kcI"
     Thumbnail: save the video's cover picture as
       assets/images/shorts/<videoId>.jpg   (tall shape, 720 x 1280)
     Without that picture the card shows the title on a plain background.
     Show your best 3 or 4 only. Each video loads only when clicked.
     To hide the whole section, empty the list:  videos: []
     ------------------------------------------------------------------ */
  shorts: {
    note: "A side project: short pixel-art explainers on YouTube and Instagram. Sources are in the captions.",
    videos: [
      { videoId: "saVG_Ka_kcI", title: "Where your painkiller goes after you swallow it" },
      { videoId: "GHDlJOQhN1c", title: "Your liver has 500 jobs, not 1" },
      { videoId: "gcnXsrytFoo", title: "Why coffee doesn't give you energy" },
      { videoId: "rhNdqYgUDxk", title: "Why headaches hurt even though the brain can't feel pain" }
    ]
  },

  /* ------------------------------------------------------------------
     6. RESEARCH AND WRITING
     ------------------------------------------------------------------
     status MUST be exactly one of:
       "Published" | "Accepted" | "Under review" | "Submitted" | "In review" | "Planned"
     Only write "Published" or "Accepted" when it is truly so.
     label = short description, always shown.  title = the real title.
     role, summary, note, link = shown only when filled.
     ------------------------------------------------------------------ */
  research: [
    {
      id: "icu-handbook",
      art: "book",          // small line drawing on the card: "book", "manuscript", "plan" or ""
      label: "The Pakistan ICU Handbook",
      status: "In review",
      title: "The Pakistan ICU Handbook: A Practical Bedside Guide (2026 Edition)",
      summary: "A bedside guide for nurses, junior doctors and pharmacists working in ICUs in Pakistan. 42 chapters in nine parts.",
      role: "Editor. I compile and edit the book and put it together. Adeel Bhutta is first author, and he and a doctor review the content.",
      when: "Aug 2026 to present",
      with: "First author: Adeel Bhutta",
      withUrl: "https://www.linkedin.com/in/adeel-bhutta-8a8839276/",
      note: "Not published yet.",
      link: ""
    },
    {
      id: "ppi-narrative-review",
      art: "manuscript",
      label: "Narrative review on long-term proton pump inhibitor safety",
      status: "Under review",
      title: "Safety of long-term proton pump inhibitor use across renal, bone, and rebound acid hypersecretion outcomes: a critical narrative review of study design, comparators, and mechanisms",
      summary: "A critical look at the evidence on long-term PPI use: kidneys, bones and rebound acid, and how well the studies behind those claims were designed.",
      role: "First and corresponding author",
      when: "Aug 2026 to present",
      with: "Contributor: Adeel Bhutta",
      withUrl: "https://www.linkedin.com/in/adeel-bhutta-8a8839276/",
      note: "Submitted to the European Journal of Clinical Pharmacology. In peer review.",
      link: ""
    },
    {
      id: "metabolic-syndrome",
      art: "plan",
      label: "Metabolic syndrome review and hospital-based study proposal",
      status: "Planned",
      title: "",
      summary: "",
      role: "",
      note: "Very early. I'm still learning the background and the methods.",
      link: ""
    }

    /* ================= TEMPLATE: RESEARCH ITEM =========================
    {
      id: "my-new-item",
      label: "",
      status: "Planned",
      title: "",
      summary: "",
      role: "",
      note: "",
      link: ""
    },
    ==================================================================== */
  ],

  /* ------------------------------------------------------------------
     7. CURRENTLY LEARNING  (a moving strip, hidden while the list is empty)
     ------------------------------------------------------------------ */
  currentlyLearning: ["Reading papers critically", "Study design", "Scientific writing"],

  /* ------------------------------------------------------------------
     8. CERTIFICATES
     verifyUrl: paste the verification link. Empty = no "Verify" button.
     mark: the short issuer name shown at the top of the card, for example "NIH".
     The FIRST FOUR are shown. The rest appear after "Show all".
     So keep your strongest four at the top.
     ------------------------------------------------------------------ */
  coursesInProgress: [
    { title: "Clinical pharmacology course", issuer: "NIH", state: "In progress" },
    { title: "Writing in the Sciences", issuer: "Stanford Online, on Coursera", state: "Enrolled" },
    { title: "Understanding Clinical Research: Behind the Statistics", issuer: "University of Cape Town, on Coursera", state: "Next" }
    // When you finish one, delete its line here and add it to "certificates" below.
  ],

  certificates: [
    { title: "Introduction to the Principles and Practice of Clinical Research", issuer: "The National Institutes of Health (NIH)", mark: "NIH", date: "May 2026", credentialId: "", verifyUrl: "" },
    { title: "Career Essentials in Generative AI by Microsoft and LinkedIn", issuer: "Microsoft", mark: "Microsoft", date: "June 2026", credentialId: "", verifyUrl: "https://www.linkedin.com/learning/certificates/6cad66929ea55d51d6fb6ea70a23c366d7ca64d855dc07e0ab3a0e200fe8d8e8/" },
    { title: "AI Fluency for students", issuer: "Anthropic", mark: "Anthropic", date: "June 2026", credentialId: "6jofyqazc2kv", verifyUrl: "https://verify.skilljar.com/c/6jofyqazc2kv" },
    { title: "Claude 101", issuer: "Anthropic", mark: "Anthropic", date: "May 2026", credentialId: "g4sry7ykpy26", verifyUrl: "" },
    { title: "Graphic Design", issuer: "DigiSkills.pk", mark: "DigiSkills", date: "February 2024", credentialId: "Y7US83HMK", verifyUrl: "https://digiskills.pk/verify" },
    { title: "Freelancing", issuer: "DigiSkills.pk", mark: "DigiSkills", date: "February 2024", credentialId: "AJQYJB6MK", verifyUrl: "https://digiskills.pk/verify" },
    { title: "Communication and Soft Skills", issuer: "DigiSkills.pk", mark: "DigiSkills", date: "July 2024", credentialId: "XHM9P3PMK", verifyUrl: "https://digiskills.pk/verify" },
    { title: "Data Analytics and Business Intelligence", issuer: "DigiSkills.pk", mark: "DigiSkills", date: "July 2024", credentialId: "HJTGXREMK", verifyUrl: "https://digiskills.pk/verify" }

    /* ================= TEMPLATE: CERTIFICATE ===========================
    { title: "", issuer: "", mark: "", date: "", credentialId: "", verifyUrl: "" },
    ==================================================================== */
  ],

  /* ------------------------------------------------------------------
     9. ABOUT PAGE
     bio: each "..." is one paragraph.
     ------------------------------------------------------------------ */
  about: {
    bio: [
      "I'm a third-year PharmD student at Allied Institute of Medical Sciences, Multan (University of the Punjab).",
      "I make infographics and 3D learning tools that explain how drugs work, for pharmacy and medical students. My long-term goal is a PhD and a career in research.",
      "I want the pharmacology to be right before it looks good, so my seniors review my work before it goes out."
    ],
    doing: [
      { name: "GhufranMedDesigns", text: "My page for infographics and short animations about how drugs work. I post on LinkedIn and Facebook." },
      { name: "The Pakistan ICU Handbook", text: "A bedside guide for ICU staff. I'm the editor, working with Adeel Bhutta. It's in review now." },
      { name: "A review article", text: "On long-term PPI safety. Submitted and in peer review." }
    ],
    building: "Reading papers critically, study design and scientific writing. I finished the NIH clinical research course. I'm now on an NIH clinical pharmacology course, with two Coursera courses next.",
    connect: "If you're a researcher, a clinical pharmacist or a senior student and you have advice for someone just starting, please message me.",
    education: [
      {
        degree: "Doctor of Pharmacy (PharmD)",
        place: "Allied Institute of Medical Sciences, Multan",
        detail: "Affiliated with the University of the Punjab, Lahore",
        when: "Nov 2024 to Nov 2029 / Third year"
      },
      {
        degree: "FSc Pre-Medical",
        place: "KIPS Education System",
        detail: "80%",
        when: "Oct 2021 to Aug 2023"
      }
    ],
    goals: [
      "Get good at research methods, one at a time.",
      "A PhD, then a career in research."
    ],
    skills: ["Pharmacology", "Medical Writing", "Research Skills", "Scientific Writing", "Clinical Pharmacology", "Clinical Pharmacy", "Pharmacognosy", "Infographics", "Graphic Design", "Canva", "Data Visualization", "Literature Review", "Clinical Trials"],
    activities: [
      { name: "Member, International Society of Oncology Pharmacy Practitioners (ISOPP)", when: "Jun 2026 to present", text: "" },
      { name: "Active Member, Student Society, Allied Institute of Medical Sciences", when: "Mar 2025 to present", text: "I help with event management and arts and crafts for college events." }
    ]
  }
};
