# Sharon Chen Photography — site guide

A photography portfolio in plain HTML/CSS/JS: no build step, no framework.
Open `index.html` directly, or run `python3 -m http.server 8000` in this
folder and visit `http://localhost:8000`.

## Structure

```
index.html      Home: hero slideshow, Selected work, Collections
photos.html     Collections index, or one collection (photos.html?category=japan)
contact.html    Contact
css/style.css   All styling (white gallery look, Newsreader + Geist)
js/data.js      Every photo: title, place, size, and home-page picks
update_site.py  Makes the site match photos_web/ (run by Update website.command)
js/gallery.js   Builds the galleries, collection pages, and the photo viewer
js/main.js      Footer year + hero slideshow
photos/         Web-sized copies the site uses
photos_web/     Your original full-size photos (not uploaded)
```

## Updating the website

1. Change `photos_web/` however you like: add photos, delete photos, add a
   new folder (it becomes a new collection), or delete a folder.
2. Double-click **Update website.command**.

It resizes new photos into `photos/`, removes deleted ones, updates
`js/data.js`, and uploads everything to GitHub. The live site refreshes
a minute or two later. (`photos_web/` itself is never uploaded; it stays
on your computer.)

The first time, macOS may ask to let Terminal access the Desktop folder
(say OK), and git may ask you to sign in to GitHub.

## Editing titles and picks (js/data.js)

New photos get the collection name as a placeholder title. To change
anything, edit `js/data.js`; the updater keeps your edits. Each photo
looks like:

```
{"src": "photos/japan/09.jpg", "category": "japan", "title": "Pagoda at blue hour",
 "place": "Japan", "w": 1200, "h": 1800, "featured": 2, "original": "japa/DSC06420.png"}
```

- `title`: the caption in the viewer and the image's alt text.
- `place`: shown next to the title.
- `"hero": true`: include the photo in the home slideshow (landscape works best).
- `"featured": <number>`: show it under "Selected work", in number order.
- Leave `src`, `w`, `h`, `original` alone; the updater manages them.

Each collection in `categories` has a `label` (the name shown on the site),
a `cover` image, an optional default `place` for new photos, and the
`folder` it comes from. Their order is the order on the site.

The file is JSON inside JavaScript, so keep double quotes and commas
between entries. If something breaks, the updater will say so.

## Notes

- Dates are not shown: the web copies' EXIF dates are the export date,
  not the day the photo was taken.
- `contact.html` uses a plain `mailto:` link. To add Instagram etc., see
  the commented example in that file.
