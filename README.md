# robotics-traveling-van-site

## website developing notes

- fork or download this fork of the website (to download, click the `<> Code` dropdown)
- edit the files with [vscode](https://code.visualstudio.com/)
  - there is a web view but I'm not sure how convenient that would be over the desktop app
  - with a couple of extensions, you can make it super easy to edit the website
    - list of extensions: `Gemini Code Assist, Live Preview (the one made by Microsoft)`

### extensions

- for gemini, click on the side tab (on the left) and sign in / set up the extension
  - turn on the `Agent` toggle on the bottom right, it lets Gemini read and edit files
  - then, open the folder with all the code (the folder with `site/`) in vscode so that gemini can see all the files it needs to edit
- for live preview, you can start a preview of the website that automatically updates when you edit any pages
  - manage it through the command palette (`ctrl+shift+p`), and type in `live preview`
    - the important options are start / stop server, and show preview (the preview server continues running in the background after closing the tab, so you should only need to start it once)

### making changes to the website

- generally, gemini is very good about keeping the code fairly tidy and not really messing up stuff, but some rules of thumb helps keep everything from falling apart (lol)
- I updated the team / about us page, but you will still need to add all the extra files and links and headshots
- you might also want to change the homepage / other pages to make them look a bit nicer but they work okay as is already

### general notes

- if you add any new pages, make sure to place them in `new webpage name/index.html` (this makes the url prettier)
- if you edit the header or footer, make sure to tell gemini to edit it on all pages once it looks the way you want it
- when adding documents, add them to the `assets/documents` folder and then ask gemini to update the documents page (it should do it all correctly automatically)

## uploading website to nau

- I am not entirely sure how you access the specific folder (I think you need to log into an on-campus computer / the virtual desktop online?)
- once you get to that specific folder, delete everything inside of it, then copy the full contents of `site/` into that folder
