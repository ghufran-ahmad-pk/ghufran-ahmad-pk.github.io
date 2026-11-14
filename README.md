# Ghufran Ahmad: portfolio website

A free, static website. Plain HTML, CSS and JavaScript. No framework, no build step, nothing to install.

**The one rule: you only ever edit `content.js`.** All text, links, projects, status labels and certificates live there. The layout files read it and build the pages.

Live address after setup: **https://ghufran-ahmad-pk.github.io**

---

## What is in the folder

```
index.html            Home
work.html             Work (filterable grid)
project.html          Case-study page for one project (project.html?id=...)
research.html         Research and Learning
about.html            About
404.html              "Page not found"
content.js            <-- THE ONLY FILE YOU EDIT
css/style.css         The look (colours, type, layout)
js/site.js            Builds pages from content.js, runs the motion
js/art.js             Draws the hero wireframe, icons and placeholders
vendor/lenis.min.js   Free smooth-scroll library (desktop only)
breath-journey/       Breath Journey, the full-screen 3D lesson (one big file)
cns-atlas/            CNS 3D Atlas, the full-screen 3D model (one big file)
assets/fonts/         Instrument Serif, Instrument Sans and Geist Mono (free fonts, stored locally)
assets/images/        Your infographics, photos and preview images go here
assets/animations/    Your self-contained .html animations go here
assets/videos/        Your .mp4 videos go here
assets/og-image.png   The picture shown when you share the link
```

To preview on your computer: double-click `index.html`. It works without internet.

---

## (a) Put the site online with GitHub Pages (browser only)

You do this once. It takes about 10 minutes.

1. Go to **github.com** and sign in as `ghufran-ahmad-pk`.
2. Click the **+** at the top right, then **New repository**.
3. Repository name: type exactly **`ghufran-ahmad-pk.github.io`** (this exact name is what makes it your main site).
4. Choose **Public**. Do not tick any of the "Add a README" boxes. Click **Create repository**.
5. On the next page, click the link **"uploading an existing file"**.
6. Unzip the ZIP on your computer. Open the **`site`** folder inside it, select **everything inside `site`** (not the folder itself, and not the `notes` folder) and drag it into the browser window. `index.html` must end up at the top level of the repository, not inside a sub-folder.
7. Wait for the upload to finish, scroll down, and click **Commit changes**.
8. Open the repository's **Settings** tab, then **Pages** in the left menu.
9. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Set **Branch** to **main** and the folder to **/ (root)**. Click **Save**.
10. Wait 1 to 3 minutes, then open **https://ghufran-ahmad-pk.github.io**. If you see a 404, wait another minute and refresh.

Note: one file is called `.nojekyll`. Files starting with a dot are sometimes hidden on your computer. If it does not upload, nothing breaks. It is only a small speed-up for GitHub.

**To update the site later:** open the repository, click **Add file**, then **Upload files**, drag in the changed files (for example `content.js` plus a new image), and click **Commit changes**. Files with the same name are replaced. The live site updates in about a minute. If you do not see the change, hard-refresh (Ctrl + F5).

**To edit text directly on GitHub:** open `content.js` in the repository, click the pencil icon, make your change, click **Commit changes**.

---

## (b) Add a new project in 3 steps

1. **Drop the file in the right folder.**
   - Interactive tool: its own folder, for example `my-tool/index.html`, plus a wide screenshot in `assets/images/`
   - Infographic image or exhibition photo: `assets/images/`
   - Animation (.html) : `assets/animations/` and its poster image in `assets/images/`
   - Video (.mp4): `assets/videos/` and its poster image in `assets/images/`
   - Use lowercase file names with hyphens and no spaces, for example `warfarin-mechanism.png`.
2. **Copy one block in `content.js`.** Scroll to the `projects` list. At the bottom there are ready-made TEMPLATES for each type (infographic, animation, short video, external post). Copy one, paste it at the **top** of the list (newest first), and fill in `id`, `title`, `caption` and the file path. Make sure there is a comma after the closing `}`.
3. **Upload both to GitHub** (the media file and `content.js`), then commit.

That is all. The Work page, the filters, the counts on the home page and the case-study page update themselves.

Good to know:
- `id` must be unique, lowercase, hyphens only. It becomes the page address: `project.html?id=your-id`.
- `featured: true` also shows the project in "Selected work" on the home page.
- Any field left as `""` is hidden. Fill `tools`, `date`, `instagramUrl`, `youtubeUrl` when you have them.
- If a file is missing or the name is misspelled, the site shows a soft placeholder instead of a broken image. So a placeholder usually means "check the file name".
- File names are case-sensitive on GitHub: `Metformin.PNG` and `metformin.png` are different files.

The same idea works for **research items** and **certificates**: each list in `content.js` has its own template at the bottom.

---

### Updating one of the 3D tools

When you improve Breath Journey or the CNS Atlas, rename your new file to `index.html` and upload it into the same folder on GitHub (`breath-journey/` or `cns-atlas/`), replacing the old one. Nothing else needs to change. The cover pictures (`assets/images/breath-journey-poster.jpg` and `assets/images/cns-atlas-poster.jpg`) are designed covers, so they do not need to change when the tool does.

### Hiding unfinished work

Every project has a `draft` line. `draft: true` hides it from the whole site. Change it to `draft: false` when the piece is ready. The Aloe exhibition project is hidden this way until you add its photo.

## (c) Change a research status label

1. Open `content.js` and find the `research` list.
2. Change the `status` line of the item. It must be **exactly** one of these (capital letters matter):

   `"Published"`, `"Accepted"`, `"Under review"`, `"Submitted"`, `"In review"`, `"Planned"`

3. Save, upload, commit.

Example: when the narrative review is accepted, change `status: "Submitted",` to `status: "Accepted",`.

Only write `"Published"` when the work is truly published. Then also fill `title` and `link`. If you type a label that is not in the list, the site hides the badge instead of showing something wrong.

Other fields per item: `title` (the real title), `summary` (one line), `role` (shown only when filled), `note`, `link`.

---

## (d) Compress videos with HandBrake (target: 8 to 15 MB at 720x1280)

Large videos make the site slow on phones, and GitHub blocks browser uploads above 25 MB. HandBrake is free: **handbrake.fr**.

1. Open HandBrake and drag your video in.
2. **Preset**: choose **Fast 720p30** (under General).
3. **Summary** tab: Format **MP4**. Tick **Web Optimized**.
4. **Dimensions** tab: because your video is vertical, set the resolution limit to **Custom** and enter width **720**, height **1280**. Leave "Anamorphic" off and cropping at 0.
5. **Video** tab: Video Encoder **H.264 (x264)**. Framerate **30**, Constant Framerate. Quality: **Constant Quality RF 24**. (Lower number = better quality and bigger file. If the file is above 15 MB, try RF 26. If it looks blurry, try RF 22.)
6. **Audio** tab: codec **AAC**, bitrate **96** or **128**. If the video has no sound, remove the audio track.
7. **Save As**: name it exactly as in `content.js`, for example `painkiller-journey.mp4`. Click **Start Encode**.
8. Check the file size. A 40-second clip usually lands around 4 to 10 MB with these settings.

**Poster image:** the still picture shown before the video plays. Take a screenshot of a good frame, save it as PNG or JPG at about 720x1280, and put it in `assets/images/` with the name used in `content.js`.

---

## (e) Use your own domain later (optional)

A custom domain (for example `ghufranahmad.com`) costs a yearly fee from a domain seller. GitHub Pages hosting stays free.

1. Buy the domain from any registrar (Namecheap, Cloudflare, GoDaddy and others).
2. In the registrar's **DNS settings**, add:
   - Four **A records** for host `@` pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME record** for host `www` pointing to: `ghufran-ahmad-pk.github.io`
3. On GitHub: repository **Settings**, **Pages**, **Custom domain**. Type your domain and click **Save**. GitHub adds a small file called `CNAME` to the repository. Do not delete it.
4. Wait for the DNS check to pass (minutes to a few hours), then tick **Enforce HTTPS**.
5. Then replace `https://ghufran-ahmad-pk.github.io` with your new address in these places: the `<link rel="canonical">` and `og:image` lines near the top of each `.html` file, plus `sitemap.xml` and `robots.txt`. (Find and replace in any text editor.)

Always check GitHub's own help page "Managing a custom domain for your GitHub Pages site" in case these numbers have changed.

---

## Other things you may want to change

| I want to... | Where |
|---|---|
| Change my headline or the small text under it | `content.js`, section 1 (`headline`, `subline`). Put `*stars*` around one word to colour it. |
| Add my Instagram or YouTube link | `content.js`, section 2. The buttons and channel cards appear automatically. |
| Show YouTube videos on the home page | `content.js`, section 5, `youtubeVideos`. Paste only the video ID. They load only when clicked. |
| Show Instagram posts on the home page | `content.js`, section 5, `instagramPosts`. Cards link out to the post. |
| Show a "Currently learning" ticker | `content.js`, section 7. Add items to the list. It is hidden while empty. |
| Add a certificate verification link | `content.js`, section 8, `verifyUrl`. |
| Edit my bio, education or goals | `content.js`, section 9. |
| Add an email button | `content.js`, section 2, `email`. Leave empty to keep it private. |
| Change colours | The first block of `css/style.css` (the lines starting with `--`). |

**For search engines and link previews:** your name, headline and bio are also written directly inside `index.html` and `about.html` so that Google and WhatsApp/LinkedIn previews can read them without running any code. If you change the headline or bio in `content.js`, visitors see the new text immediately. To keep previews in sync, also update the same sentence in the `.html` file (search for the old sentence and replace it). This is optional.

## If something breaks

- **The page looks empty or a red bar appears at the bottom:** `content.js` has a typing mistake, usually a missing comma or quote mark. Undo your last edit. On GitHub you can open the file's **History** and restore the previous version.
- **A placeholder shows instead of my image or video:** the file name in `content.js` does not match the uploaded file exactly (check capitals, spaces and the extension), or the file is in the wrong folder.
- **Changes do not show:** wait a minute, then hard-refresh with Ctrl + F5.

## Credits and licences

- Fonts: Instrument Serif, Instrument Sans and Geist Mono, SIL Open Font License 1.1.
- 3D anatomy models inside the tools: BodyParts3D (DBCLS, CC BY 4.0), HuBMAP Human Reference Atlas (CC BY 4.0), and "Brain for Blender" by Anderson M. Winkler (CC BY-SA 3.0). Keep these credit lines on the site.
- Smooth scrolling: Lenis, MIT License.
- The wireframe capsule, icons and placeholders are drawn by code written for this site.
- Educational content. Not medical advice.
