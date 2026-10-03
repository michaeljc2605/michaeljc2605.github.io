# michaeljc2605.github.io
I am an Information Engineering &amp; Media student at NTU, passionate about cybersecurity, software engineering, and UI/UX design. I builds secure, user-friendly, and scalable tech solutions, shares projects, and explores the intersection of technology, security, and human-centered design.

## Local preview

Run both the portfolio and the Disney HTML design demo together:

```bash
bash start-local.sh
```

Then open <http://localhost:4173/>. The Disney case study is available from the Projects section, and the working Disney demo runs at <http://localhost:5176/>.

The Disney app remains a separate project in `DISNEY HTML ONLY THEMED/`, which keeps the root portfolio lightweight while preserving the moodboard and editable PSD alongside the source.

## Professional profile and search metadata

`index.html` is the source of truth for the visible career information. After updating its summary, skills, experience, projects or certifications, regenerate the plain HTML résumé:

```bash
python3 scripts/build-resume.py
```

Commit the generated `resume.html` alongside the portfolio changes. The profile works without JavaScript and includes print styles for the browser's Save as PDF option. Keep the Person JSON-LD in `index.html` consistent with the visible name, current role and skills; the generator carries it into the profile.

`robots.txt` allows crawling and points to `sitemap.xml`. Add new public pages to the sitemap using their canonical GitHub Pages URLs. Page descriptions, canonical links and social previews live in each HTML head. Search engines and AI systems choose whether and when to index or surface these pages; metadata does not guarantee ranking or hiring outcomes.

Long descriptions remain complete in the initial HTML. JavaScript adds Read more / Read less only when text exceeds the preview height, and print styles reveal the full text. Phone styles use 13px body copy, smaller headings and compact controls; form inputs stay at 16px to prevent iOS focus zoom. Check the 390 × 844 layout and nearby widths after changing content or spacing.
