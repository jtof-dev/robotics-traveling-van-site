# robotics-traveling-van-site

- deployed to [github pages](https://jtof-dev.github.io/robotics-traveling-van-site/) and to [nau.edu](https://www.ceias.nau.edu/capstone/projects/ME/2026/F25toSp26_TravelingRobotics/)

# notes

- header and footer sections for each webpage is seperated by `<!-- {{end of header}} -->` and `<!-- {{start of footer}} -->` comments respectively
- these are used to seperate out the re-usable sections in `site/index.html`, which are then applied to every other page in `site/**/index.html`
- to update the header or footer, apply the changes to `site/index.html`, then run `python ssg.py`
  - note: this script preserves the `<title>` element in the header

# todo

## content

- [x] remove most ME content
- [x] get info from EEs for the `about us` section
  - ask for new written bios, linkedin links, possibly resume, headshots, and any other links
- [ ] re-write robots 1 and 2 sections
- [x] add our own documents (instead of the ME ones)
- [x] get new photos for gallery
- [ ] flesh out project description page

## style

- [x] add dark mode and toggle
- [x] rework footer
- [x] rework top bar
- [x] really overhaul the home page
  - possibly combine most / all sections into one long, scrolling page with animations and all that
- [ ] fix page flashing dark while changing pages on light mode
