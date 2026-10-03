#!/usr/bin/env python3
"""Generate the crawlable, printable profile from the portfolio's visible HTML.

Run after changing experience, skills, projects or certifications in index.html.
Uses only the Python standard library; no client-side rendering is required.
"""
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent


class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

    def all(self, tag=None, cls=None):
        found = []
        for child in self.children:
            if isinstance(child, Node):
                if (tag is None or child.tag == tag) and (cls is None or cls in child.attrs.get('class', '').split()):
                    found.append(child)
                found.extend(child.all(tag, cls))
        return found

    def one(self, tag=None, cls=None):
        return self.all(tag, cls)[0]

    def text(self):
        return ' '.join(' '.join(c.text() if isinstance(c, Node) else c for c in self.children).split())


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def text(node):
    return escape(node.text())


def link(node):
    return f'<a href="{escape(node.attrs["href"], quote=True)}">{text(node)}</a>'


doc = Document((ROOT / 'index.html').read_text()).root
profile_data = json.loads(next(n.text() for n in doc.all('script') if n.attrs.get('type') == 'application/ld+json'))
person = profile_data['mainEntity']
profile_data['@id'] = 'https://michaeljc2605.github.io/resume.html#profile'
profile_data['url'] = 'https://michaeljc2605.github.io/resume.html'
profile_data['name'] = 'Michael Joseph Candra — Professional Profile and Résumé'
summary = '\n'.join(f'<p>{text(n)}</p>' for n in doc.one(cls='about-description').all('p')[:2])
skills = '\n'.join(f'<li><strong>{text(n.one("h3"))}:</strong> {"; ".join(text(i) for i in n.all("li"))}.</li>' for n in doc.all(cls='skill-category'))
experience = []
for item in doc.all(cls='timeline-item'):
    description = item.one(cls='job-description')
    bullets = description.all('li') or [description]
    experience.append(f'''<article>
<h3>{text(item.one(cls='job-title'))}</h3>
<p class="meta"><strong>{text(item.one(cls='company-name'))}</strong> · {text(item.one(cls='timeline-date'))}</p>
<ul>{''.join(f'<li>{text(n)}</li>' for n in bullets)}</ul>
<p class="technologies">Technologies and focus: {', '.join(text(n) for n in item.all(cls='tag'))}.</p>
</article>''')
projects = []
for item in doc.all(cls='project-card'):
    links = [n for n in item.one(cls='project-links').all('a') if n.attrs.get('href') != '#']
    projects.append(f'''<article>
<h3>{text(item.one(cls='project-title'))}</h3>
<p>{text(item.one(cls='project-description'))}</p>
<p class="technologies">Technologies and focus: {', '.join(text(n) for n in item.all(cls='tag'))}.</p>
<p class="project-links">{' · '.join(link(n) for n in links)}</p>
</article>''')
certifications = []
for item in doc.all(cls='cert-card'):
    url = item.one(cls='cert-download-btn').attrs['href']
    certifications.append(f'<li><a href="{escape(url, quote=True)}">{text(item.one(cls="cert-title"))}</a> — {text(item.one(cls="cert-issuer"))}; {text(item.one(cls="cert-date"))}.</li>')

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Michael Joseph Candra | Professional Profile &amp; Résumé</title>
  <meta name="description" content="Michael Joseph Candra's experience, education, technical skills and certifications: Python, LangGraph, GRC automation, cybersecurity and full-stack development.">
  <meta name="author" content="Michael Joseph Candra">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://michaeljc2605.github.io/resume.html">
  <meta property="og:type" content="profile">
  <meta property="og:title" content="Michael Joseph Candra | Professional Profile &amp; Résumé">
  <meta property="og:description" content="Experience, skills, education and project evidence in cybersecurity, software engineering and AI automation.">
  <meta property="og:url" content="https://michaeljc2605.github.io/resume.html">
  <link rel="stylesheet" href="resume.css?v=mobile-profile-v1">
  <script type="application/ld+json">{json.dumps(profile_data, ensure_ascii=False, indent=2)}</script>
</head>
<body>
  <nav class="toolbar" aria-label="Profile navigation"><a href="./">← Portfolio</a><button type="button" onclick="window.print()">Print / Save PDF</button></nav>
  <main>
    <header>
      <p class="eyebrow">Professional profile &amp; résumé</p>
      <h1>Michael Joseph Candra</h1>
      <p class="specialties">Cybersecurity · Software Engineering · AI Automation · UI/UX Design</p>
      <address><a href="mailto:Michaelj005@e.ntu.edu.sg">Michaelj005@e.ntu.edu.sg</a><br>
      <a href="https://www.linkedin.com/in/michaeljosephcandra28">linkedin.com/in/michaeljosephcandra28</a><br>
      <a href="https://github.com/michaeljc2605">github.com/michaeljc2605</a></address>
    </header>
    <section aria-labelledby="summary"><h2 id="summary">Professional Summary</h2>{summary}</section>
    <section aria-labelledby="education"><h2 id="education">Education</h2>
      <h3>Nanyang Technological University (NTU)</h3>
      <p>Information Engineering &amp; Media — current student<br>CGPA: 4.57/5.00 · NTU-Google Scholarship recipient</p>
    </section>
    <section aria-labelledby="skills"><h2 id="skills">Technical Skills</h2><ul>{skills}</ul></section>
    <section aria-labelledby="experience"><h2 id="experience">Work Experience</h2>{''.join(experience)}</section>
    <section aria-labelledby="projects"><h2 id="projects">Projects &amp; Research</h2>{''.join(projects)}</section>
    <section aria-labelledby="certifications"><h2 id="certifications">Certifications &amp; Training</h2><ul>{''.join(certifications)}</ul></section>
    <footer><a href="./">Explore the full portfolio</a> · <a href="./#contact">Get in touch</a></footer>
  </main>
</body>
</html>
'''
(ROOT / 'resume.html').write_text(html)
print(f'Generated resume.html: {len(experience)} roles, {len(projects)} projects, {len(certifications)} certifications/training entries.')
