# Ahmed Walid Mohamed — Resume Site

A single-page resume and portfolio built with plain HTML, CSS and JavaScript. It has two themes, a dark "Analyst view" and a light "Recruiter view", with a toggle in the header.

**Live site:** https://ahmed-walid-resume-v2-ahmed-waleed.vercel.app

## What's on the site

- **About:** background and current direction (data analytics, data engineering, data science)
- **Education:** B.Sc. Computer Science & Mathematics (double major), Ain Shams University
- **Certifications:** Google Data Analytics Certificate on Coursera (7 of 8 courses completed), each linked to its verification page
- **Projects:**
  - Data Cleaning Console: a React and SheetJS tool that detects and fixes spreadsheet problems
  - Personal Portfolio Website
  - Sample Size Calculator
  - Ain Shams University site (practice build)
  - SQL & data cleaning practice in BigQuery
- **Skills:** HTML, CSS, JavaScript, C++, SQL (BigQuery), Excel and Google Sheets, data cleaning, Git

## Project structure

```
.
├── index.html                    # main resume page
├── data-cleaning-console.html
├── personal-portfolio-demo.html
├── sample-size-calculator.html
├── bigquery-sql-practice.html
├── ain-shams/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── privacy.html                  # privacy policy
├── terms.html                    # terms of use
├── 404.html                      # custom "page not found"
├── site.css / site.js            # shared styles; email assembly + privacy notice
├── favicon.svg, apple-touch-icon.png, og-image.png
├── robots.txt, sitemap.xml
└── vercel.json                   # security headers (HSTS, CSP, etc.) and caching
```

## Launch checklist notes

- Web Analytics: the pages include the Vercel Analytics snippet. Turn it on in the Vercel dashboard (project, Analytics tab) for it to record anything.
- Legal pages are plain-language templates, not legal advice. Review them before relying on them.
- If you add cookie-based tools (ads, tracking), replace the informational privacy notice with a real accept/decline banner.

## Run locally

No build step is needed. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

Hosted on Vercel. Every push to `main` redeploys the site automatically.

## Contact

- Email: ahmedwaleed180607@gmail.com
- LinkedIn: https://linkedin.com/in/ahmed-waleed-a8a261308
- GitHub: https://github.com/aw2818726-eng
- Location: Cairo, Egypt
