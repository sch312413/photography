"""
update_site.py — makes the website match your photos_web folder.

    python3 update_site.py      (or double-click "Update website.command")

What it does, every time:
  - every folder in photos_web/ becomes a collection on the site
    (a new folder = a new collection, a deleted folder = gone)
  - new or changed photos are resized into photos/<collection>/
  - photos you deleted from photos_web/ are removed from the site
  - js/data.js is rewritten, KEEPING everything you edited there
    (titles, places, collection names, covers, hero/featured picks)

Safe to run as often as you like; it only does work when something changed.
"""
import json, os, re, sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow isn't installed. Run:  python3 -m pip install pillow")

Image.MAX_IMAGE_PIXELS = None  # big camera exports are fine

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "photos_web")
OUT = os.path.join(ROOT, "photos")
DATA = os.path.join(ROOT, "js", "data.js")
MAX_DIM = 1800
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"}
START, END = "/*SITE-START*/", "/*SITE-END*/"


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-") or "photo"


def load_site():
    with open(DATA, encoding="utf-8") as f:
        text = f.read()
    if START not in text:
        sys.exit("js/data.js isn't in the format this script expects.")
    return json.loads(text.split(START, 1)[1].split(END, 1)[0])


def write_site(site):
    cats = ",\n".join("    " + json.dumps(c, ensure_ascii=False) for c in site["categories"])
    photos = ",\n".join("    " + json.dumps(p, ensure_ascii=False) for p in site["photos"])
    body = f'{{\n  "categories": [\n{cats}\n  ],\n  "photos": [\n{photos}\n  ]\n}}'
    with open(DATA, "w", encoding="utf-8") as f:
        f.write(
            "// =====================================================================\n"
            "// data.js — written by update_site.py, but safe to edit by hand: the\n"
            "// updater keeps your changes. See README.md for what each field does.\n"
            "// Keep the text between the SITE-START / SITE-END markers valid JSON\n"
            "// (double quotes, commas between entries, no trailing comma).\n"
            "// =====================================================================\n\n"
            f"const SITE = {START}{body}{END};\n\n"
            "const CATEGORIES = SITE.categories;\n"
            "const PHOTOS = SITE.photos;\n"
        )


def resize(src_path, out_path):
    im = Image.open(src_path)
    im.draft("RGB", (MAX_DIM, MAX_DIM))
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    elif im.mode != "RGB":
        im = im.convert("RGB")
    im.thumbnail((MAX_DIM, MAX_DIM), Image.LANCZOS)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    im.save(out_path, "JPEG", quality=86, optimize=True, progressive=True)


def main():
    site = load_site()
    old_cats = {c["folder"]: c for c in site["categories"]}
    old_photos = {p["original"]: p for p in site["photos"]}

    folders = sorted(
        d for d in os.listdir(SRC)
        if not d.startswith(".") and os.path.isdir(os.path.join(SRC, d))
    )
    # existing collections keep their order; new folders go at the end
    ordered = [c["folder"] for c in site["categories"] if c["folder"] in folders]
    ordered += [f for f in folders if f not in ordered]

    used_ids = set()
    cats, photos, keep = [], [], set()
    added, resized, skipped = [], [], []

    for folder in ordered:
        cat = dict(old_cats.get(folder) or {"id": slugify(folder), "label": folder, "folder": folder})
        while cat["id"] in used_ids:
            cat["id"] += "-2"
        used_ids.add(cat["id"])

        files = sorted(f for f in os.listdir(os.path.join(SRC, folder)) if not f.startswith("."))
        cat_photos, used_src = [], set()
        for fname in files:
            ext = os.path.splitext(fname)[1].lower()
            if ext not in IMAGE_EXT:
                if ext not in {".xmp"}:
                    skipped.append(f"{folder}/{fname}")
                continue

            original = f"{folder}/{fname}"
            src_path = os.path.join(SRC, folder, fname)
            p = dict(old_photos.get(original) or {})
            if not p:
                stem = slugify(os.path.splitext(fname)[0])
                p = {"src": f"photos/{cat['id']}/{stem}.jpg", "category": cat["id"],
                     "title": cat["label"], "original": original}
                if cat.get("place"):
                    p["place"] = cat["place"]
                added.append(original)
            p["category"] = cat["id"]
            while p["src"] in used_src:
                p["src"] = p["src"][:-4] + "-2.jpg"
            used_src.add(p["src"])

            out_path = os.path.join(ROOT, p["src"])
            if not os.path.exists(out_path) or os.path.getmtime(src_path) > os.path.getmtime(out_path):
                try:
                    resize(src_path, out_path)
                    resized.append(original)
                except Exception as e:  # unreadable file: skip it, keep going
                    skipped.append(f"{original} ({e})")
                    continue
            with Image.open(out_path) as im:
                p["w"], p["h"] = im.size
            keep.add(os.path.normpath(out_path))
            cat_photos.append(p)

        if not cat_photos:
            continue
        if cat.get("cover") not in {p["src"] for p in cat_photos}:
            cat["cover"] = cat_photos[0]["src"]
        cats.append(cat)
        photos += cat_photos

    # the home slideshow needs at least one photo
    if photos and not any(p.get("hero") for p in photos):
        for c in cats:
            next(p for p in photos if p["category"] == c["id"])["hero"] = True

    removed = [o for o in old_photos if o not in {p["original"] for p in photos}]

    # delete web copies nothing points to any more
    for dirpath, _, files in os.walk(OUT, topdown=False):
        for f in files:
            path = os.path.normpath(os.path.join(dirpath, f))
            if path not in keep:
                os.remove(path)
        if dirpath != OUT and not os.listdir(dirpath):
            os.rmdir(dirpath)

    write_site({"categories": cats, "photos": photos})

    print(f"{len(cats)} collections, {len(photos)} photos on the site.")
    for label, items in (("Added", added), ("Resized", resized), ("Removed", removed),
                         ("Skipped (not a web image)", skipped)):
        if items:
            print(f"{label}:")
            for i in items:
                print(f"  {i}")
    if not (added or resized or removed):
        print("No photo changes.")


if __name__ == "__main__":
    main()
