/* =====================================================================
   content.js  |  THE ONLY FILE YOU EDIT
   ---------------------------------------------------------------------
   Everything the website shows lives here: text, links, projects,
   research status labels and certificates.

   RULES
   1. Text goes between "double quotes". Keep the comma at the end of a line.
   2. An empty field looks like this:  ""   Empty fields are hidden on the site.
   3. Never delete a field name. Leave it empty instead.
   4. To add something, copy a TEMPLATE block (see the bottom of each list),
      paste it above the "TEMPLATES" comment, and fill it in.

   If the site goes blank after an edit, you probably removed a comma or a
   quote. Undo your last change and try again.
   ===================================================================== */

window.SITE_CONTENT = {

  /* ------------------------------------------------------------------
     1. BASICS
     ------------------------------------------------------------------ */
  person: {
    name: "Ghufran Ahmad",
    brand: "GhufranMedDesigns",
    role: "Third-year PharmD student",
    location: "Multan, Pakistan",
    // One honest line. Shown in the hero on the home page.
    // Put *stars* around ONE word to colour it with the accent.
    updated: "November 2026",                   // shown in the footer as "Last updated ..."
    photo: "assets/images/ghufran-ahmad.jpg",   // shown on the About page. Empty = no photo.
    headline: "Pharmacy student turning drug mechanisms into *visuals*.",
    subline: "I make infographics and interactive learning tools that explain how drugs and the body work, and I am learning to do research properly. A student at the beginning, not a researcher yet."
  },

  /* ------------------------------------------------------------------
     1b. FACTS  (the row of big numbers under the hero)
     ------------------------------------------------------------------
     Real numbers only. Change, add or remove lines (2 to 4 looks best).
     Example to add:  { number: "60+", label: "posts on LinkedIn" },
     ------------------------------------------------------------------ */
  facts: [
    { number: "2",    label: "interactive 3D learning tools" },
    { number: "12",   label: "mechanism posts, each with a cited source" },
    { number: "8",    label: "certificates" }
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
    cv:        "",   // your CV file, for example "assets/cv.pdf". Adds a "Download CV" button.
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
      caption: "An interactive 3D lesson for learning respiratory anatomy, physiology and disease. It follows one breath from the whole body down to the cell across eleven hands-on chapters, and the Clinic chapter covers nine conditions, from asthma and pneumonia to opioid overdose and carbon monoxide poisoning.",
      src: "breath-journey/index.html",              // the full-screen page it opens
      image: "assets/images/breath-journey-poster.jpg",
      alt: "Cover image for Breath Journey: a transparent 3D body with the lungs highlighted",
      status: "Ready to explore",
      why: "It began as an experiment in turning one physiology topic into something a student can explore, not just read.",
      note: "Educational visualization for students. Not for clinical use.",
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
      title: "CNS 3D Atlas: the central nervous system",
      // WHEN YOU ADD THE DISEASE CHAPTERS, replace the caption below with this one:
      //   "An interactive 3D atlas for learning the anatomy, diseases and drugs of the central nervous system, from the whole brain down to a single synapse, with guided tours and beginner, student and advanced levels."
      // and change status to "Ready to explore".
      caption: "An interactive 3D atlas for learning the anatomy of the central nervous system, from the whole brain down to a single synapse, with guided tours and beginner, student and advanced levels. It is the base for the disease and drug lessons that come next.",
      src: "cns-atlas/index.html",
      image: "assets/images/cns-atlas-poster.jpg",
      alt: "Cover image for the CNS 3D Atlas: a colour-coded 3D brain",
      status: "Ready to explore",
      why: "Third-year Pharmacology-II covers many CNS drugs, so I built this to help students see the anatomy first, then the diseases and the drugs.",
      note: "Educational visualization for students. Not for clinical use.",
      credit: "Brain model adapted from \"Brain for Blender\" by Anderson M. Winkler (brainder.org), CC BY-SA 3.0.",
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
      caption: "Infographic summarising a 2025 mouse study (Lin et al., Science Advances). Human studies are still needed.",
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
      caption: "Reference-style infographic with severity colour coding.",
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
      featured: false,
      draft: false,
      title: "Aloe (Aloe barbadensis) pharmacognosy profile",
      caption: "A complete pharmacognostic profile of Aloe barbadensis, prepared and presented at the Allied PharmaExhibition 2026, Allied Institute, Multan. I designed the poster and presented it alongside my group, supervised by Dr. Asad Saleem Sial.",
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
      note: "Educational visualization for students. Not for clinical use.",
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
    linkedinNote:  "Infographics and notes on what I am learning.",
    facebookNote:  "Infographics for pharmacy and medical students.",
    instagramNote: "",
    youtubeNote:   "",

    highlight: {
      label: "Most discussed post",
      big: "450+ reactions, 49 comments",
      text: "A metformin mechanism infographic on LinkedIn.",
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
    note: "Posts written for LinkedIn. Each one explains a single mechanism and names the source it is built on.",
    posts: [
      { topic: "Drug withdrawal",  title: "Withdrawal is not one thing. It is four.", source: "Ross, Br Heart J 1981. ESE and Endocrine Society joint guideline 2024. And others." },
      { topic: "Abacavir",         title: "The drug did not change the immune system. It changed what the immune system was looking at.", source: "Illing et al., Nature 2012. Mallal et al., NEJM 2008." },
      { topic: "Thalidomide",      title: "One pure form goes in. Both come out.", source: "Eriksson et al., Chirality 1995 and 1998." },
      { topic: "Food and drugs",   title: "Four reasons a drug comes with a food instruction.", source: "" },
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
    note: "A side project. Short animated explainers on YouTube and Instagram, with every claim sourced in the caption.",
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
      label: "The Pakistan ICU Handbook",
      status: "In review",
      title: "The Pakistan ICU Handbook: A Practical Bedside Guide (2026 Edition)",
      summary: "A practical bedside guide for nurses, junior doctors and pharmacists in Pakistan, with 42 chapters across nine parts.",
      role: "Editor. I compile, edit and produce the book with a senior colleague who is first author. Content is reviewed by my senior colleague and a doctor.",
      when: "Aug 2026 to present",
      with: "",            // name your senior here ONLY after he agrees, for example "First author: ..."
      note: "In review. Not published yet.",
      link: ""
    },
    {
      id: "ppi-narrative-review",
      label: "Narrative review on long-term proton pump inhibitor safety",
      status: "Under review",
      title: "Safety of long-term proton pump inhibitor use across renal, bone, and rebound acid hypersecretion outcomes: a critical narrative review of study design, comparators, and mechanisms",
      summary: "A critical narrative review of long-term proton pump inhibitor (PPI) use, examining renal, bone and rebound acid hypersecretion outcomes, with a focus on study design, comparators and mechanisms.",
      role: "Author",
      when: "Aug 2026 to present",
      with: "",
      note: "Submitted to the European Journal of Clinical Pharmacology, in peer review.",
      link: ""
    },
    {
      id: "metabolic-syndrome",
      label: "Metabolic syndrome review and hospital-based study proposal",
      status: "Planned",
      title: "",
      summary: "",
      role: "",
      note: "Early stage. Learning the background and methods first.",
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
    { title: "Introduction to the Principles and Practice of Clinical Research", issuer: "The National Institutes of Health (NIH)", date: "May 2026", credentialId: "", verifyUrl: "" },
    { title: "Career Essentials in Generative AI by Microsoft and LinkedIn", issuer: "Microsoft", date: "June 2026", credentialId: "", verifyUrl: "https://www.linkedin.com/learning/certificates/6cad66929ea55d51d6fb6ea70a23c366d7ca64d855dc07e0ab3a0e200fe8d8e8/" },
    { title: "AI Fluency for students", issuer: "Anthropic", date: "June 2026", credentialId: "6jofyqazc2kv", verifyUrl: "https://verify.skilljar.com/c/6jofyqazc2kv" },
    { title: "Claude 101", issuer: "Anthropic", date: "May 2026", credentialId: "g4sry7ykpy26", verifyUrl: "" },
    { title: "Graphic Design", issuer: "DigiSkills.pk", date: "February 2024", credentialId: "Y7US83HMK", verifyUrl: "https://digiskills.pk/verify" },
    { title: "Freelancing", issuer: "DigiSkills.pk", date: "February 2024", credentialId: "AJQYJB6MK", verifyUrl: "https://digiskills.pk/verify" },
    { title: "Communication and Soft Skills", issuer: "DigiSkills.pk", date: "July 2024", credentialId: "XHM9P3PMK", verifyUrl: "https://digiskills.pk/verify" },
    { title: "Data Analytics and Business Intelligence", issuer: "DigiSkills.pk", date: "July 2024", credentialId: "HJTGXREMK", verifyUrl: "https://digiskills.pk/verify" }

    /* ================= TEMPLATE: CERTIFICATE ===========================
    { title: "", issuer: "", date: "", credentialId: "", verifyUrl: "" },
    ==================================================================== */
  ],

  /* ------------------------------------------------------------------
     9. ABOUT PAGE
     bio: each "..." is one paragraph.
     ------------------------------------------------------------------ */
  about: {
    bio: [
      "I am a third-year PharmD student at Allied Institute of Medical Sciences, Multan (University of the Punjab), with a focus on pharmacology and clinical pharmacy.",
      "I turn drug mechanisms into clear visuals, and I am learning to do research properly. My long-term goal is a research career, with a funded PhD abroad.",
      "I care about getting the pharmacology right before making it look good, and my seniors review what I produce."
    ],
    doing: [
      { name: "GhufranMedDesigns", text: "Infographics and short animations that explain how drugs work, made for pharmacy and medical students and shared on LinkedIn and Facebook." },
      { name: "The Pakistan ICU Handbook", text: "A practical bedside guide for nurses, junior doctors and pharmacists. I edit and compile it with a senior colleague, and it is now in review." },
      { name: "A narrative review", text: "Submitted to a journal and in peer review." }
    ],
    building: "Research skills: reading papers critically, study design and scientific writing. I completed NIH's Introduction to the Principles and Practice of Clinical Research course, and I know I am at the beginning.",
    connect: "If you are a researcher, clinical pharmacist or senior student with advice for someone starting out, I would be glad to hear from you.",
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
      "Build real research skills, one method at a time.",
      "A research career.",
      "A funded PhD abroad."
    ],
    skills: ["Pharmacology", "Medical Writing", "Research Skills", "Scientific Writing", "Clinical Pharmacology", "Clinical Pharmacy", "Pharmacognosy", "Infographics", "Graphic Design", "Canva", "Data Visualization", "Literature Review", "Clinical Trials"],
    activities: [
      { name: "Member, International Society of Oncology Pharmacy Practitioners (ISOPP)", when: "Jun 2026 to present", text: "" },
      { name: "Active Member, Student Society, Allied Institute of Medical Sciences", when: "Mar 2025 to present", text: "Helped organize and run college events." }
    ]
  }
};
