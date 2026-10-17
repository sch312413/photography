// =====================================================================
// data.js — written by update_site.py, but safe to edit by hand: the
// updater keeps your changes. See README.md for what each field does.
// Keep the text between the SITE-START / SITE-END markers valid JSON
// (double quotes, commas between entries, no trailing comma).
// =====================================================================

const SITE = /*SITE-START*/{
  "categories": [
    {"id": "san-diego-yosemite", "label": "San Diego & Yosemite", "folder": "San Diego and Yosemite", "cover": "photos/san-diego-yosemite/01.jpg"},
    {"id": "japan", "label": "Japan", "folder": "japa", "cover": "photos/japan/09.jpg", "place": "Japan"},
    {"id": "daan-park", "label": "Daan Park", "folder": "daan park", "cover": "photos/daan-park/09.jpg", "place": "Daan Forest Park, Taipei"},
    {"id": "taipei", "label": "Taipei", "folder": "taipei", "cover": "photos/taipei/01.jpg", "place": "Taipei"},
    {"id": "nyc", "label": "NYC", "folder": "nyc", "cover": "photos/nyc/02.jpg", "place": "New York"},
    {"id": "sunset", "label": "Sunset", "folder": "sunset", "cover": "photos/sunset/01.jpg"}
  ],
  "photos": [
    {"src": "photos/san-diego-yosemite/01.jpg", "category": "san-diego-yosemite", "title": "Aircraft carrier in port", "place": "San Diego, California", "w": 1200, "h": 1800, "original": "San Diego and Yosemite/DSC07212.png"},
    {"src": "photos/san-diego-yosemite/02.jpg", "category": "san-diego-yosemite", "title": "Sunset over the Pacific", "place": "San Diego, California", "w": 1200, "h": 1800, "featured": 10, "original": "San Diego and Yosemite/DSC07277.JPG"},
    {"src": "photos/san-diego-yosemite/03.jpg", "category": "san-diego-yosemite", "title": "Stars above the treeline", "place": "Yosemite, California", "w": 1200, "h": 1800, "original": "San Diego and Yosemite/DSC07356 2.jpg"},
    {"src": "photos/san-diego-yosemite/04.jpg", "category": "san-diego-yosemite", "title": "The Milky Way, Yosemite", "place": "Yosemite, California", "w": 1800, "h": 1200, "original": "San Diego and Yosemite/DSC07371 2.PNG"},
    {"src": "photos/san-diego-yosemite/05.jpg", "category": "san-diego-yosemite", "title": "Night sky, long exposure", "place": "Yosemite, California", "w": 1800, "h": 1200, "original": "San Diego and Yosemite/DSC07372 2.PNG"},
    {"src": "photos/san-diego-yosemite/08.jpg", "category": "san-diego-yosemite", "title": "Star field", "place": "Yosemite, California", "w": 1200, "h": 1800, "original": "San Diego and Yosemite/DSC07386 2.PNG"},
    {"src": "photos/san-diego-yosemite/09.jpg", "category": "san-diego-yosemite", "title": "Granite and pines", "place": "Yosemite, California", "w": 1200, "h": 1800, "original": "San Diego and Yosemite/DSC07424 3.jpg"},
    {"src": "photos/san-diego-yosemite/10.jpg", "category": "san-diego-yosemite", "title": "Meadow pool through the trees", "place": "Yosemite, California", "w": 1800, "h": 1200, "original": "San Diego and Yosemite/DSC07551 2.jpg"},
    {"src": "photos/san-diego-yosemite/11.jpg", "category": "san-diego-yosemite", "title": "Valley view under branches", "place": "Yosemite, California", "w": 1800, "h": 1200, "original": "San Diego and Yosemite/DSC07552.png"},
    {"src": "photos/san-diego-yosemite/12.jpg", "category": "san-diego-yosemite", "title": "Granite cliffs, Yosemite Valley", "place": "Yosemite, California", "w": 1800, "h": 1200, "hero": true, "original": "San Diego and Yosemite/DSC07600.png"},
    {"src": "photos/san-diego-yosemite/13.jpg", "category": "san-diego-yosemite", "title": "Ground squirrel", "place": "Yosemite, California", "w": 1199, "h": 1800, "featured": 8, "original": "San Diego and Yosemite/DSC07647.png"},
    {"src": "photos/san-diego-yosemite/14.jpg", "category": "san-diego-yosemite", "title": "Ground squirrel, eating", "place": "Yosemite, California", "w": 1800, "h": 1199, "original": "San Diego and Yosemite/DSC07654.png"},
    {"src": "photos/japan/01.jpg", "category": "japan", "title": "Autumn maples", "place": "Japan", "w": 1800, "h": 1200, "original": "japa/DSC04177.png"},
    {"src": "photos/japan/02.jpg", "category": "japan", "title": "Pampas grass", "place": "Japan", "w": 1200, "h": 1800, "original": "japa/DSC04421.png"},
    {"src": "photos/japan/03.jpg", "category": "japan", "title": "Waterfall in autumn", "place": "Japan", "w": 1800, "h": 1200, "featured": 1, "original": "japa/DSC04520.png"},
    {"src": "photos/japan/04.jpg", "category": "japan", "title": "Train crossing overhead", "place": "Japan", "w": 1800, "h": 1200, "original": "japa/DSC05154.png"},
    {"src": "photos/japan/05.jpg", "category": "japan", "title": "Crossing at dusk", "place": "Japan", "w": 1200, "h": 1800, "original": "japa/DSC05177.png"},
    {"src": "photos/japan/06.jpg", "category": "japan", "title": "Yakitori on the grill", "place": "Japan", "w": 1800, "h": 1200, "featured": 6, "original": "japa/DSC05257.png"},
    {"src": "photos/japan/07.jpg", "category": "japan", "title": "Train arriving", "place": "Japan", "w": 1200, "h": 1800, "original": "japa/DSC06420.png"},
    {"src": "photos/japan/08.jpg", "category": "japan", "title": "Soufflé pancakes", "place": "Japan", "w": 1800, "h": 1200, "original": "japa/DSC06459.png"},
    {"src": "photos/japan/09.jpg", "category": "japan", "title": "Pagoda at blue hour", "place": "Japan", "w": 1200, "h": 1800, "featured": 4, "original": "japa/DSC06881.png"},
    {"src": "photos/japan/10.jpg", "category": "japan", "title": "Lantern", "place": "Japan", "w": 1800, "h": 1200, "featured": 12, "original": "japa/DSC06886.jpg"},
    {"src": "photos/japan/11.jpg", "category": "japan", "title": "Red lanterns", "place": "Japan", "w": 1800, "h": 1200, "hero": true, "original": "japa/DSC06960.jpg"},
    {"src": "photos/daan-park/01.jpg", "category": "daan-park", "title": "Leaves turning in Daan Park", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC03661.png"},
    {"src": "photos/daan-park/02.jpg", "category": "daan-park", "title": "Bird and persimmon", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC03719.png"},
    {"src": "photos/daan-park/03.jpg", "category": "daan-park", "title": "Bird among autumn leaves", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC03721.png"},
    {"src": "photos/daan-park/04.jpg", "category": "daan-park", "title": "Bird in the grass", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC04560.png"},
    {"src": "photos/daan-park/05.jpg", "category": "daan-park", "title": "Cattle egret", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "featured": 2, "original": "daan park/DSC04594.png"},
    {"src": "photos/daan-park/06.jpg", "category": "daan-park", "title": "Red blossoms", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC04623.png"},
    {"src": "photos/daan-park/07.jpg", "category": "daan-park", "title": "Egrets at the nest", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC04697.png"},
    {"src": "photos/daan-park/08.jpg", "category": "daan-park", "title": "Egrets, wings raised", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC04698.png"},
    {"src": "photos/daan-park/09.jpg", "category": "daan-park", "title": "Barbet at its nest hole", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "hero": true, "original": "daan park/DSC04807.png"},
    {"src": "photos/daan-park/10.jpg", "category": "daan-park", "title": "Egret on the lawn", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC05657.png"},
    {"src": "photos/daan-park/11.jpg", "category": "daan-park", "title": "Persimmons against the sky", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "original": "daan park/DSC05690.png"},
    {"src": "photos/daan-park/12.jpg", "category": "daan-park", "title": "White butterfly on salvia", "place": "Daan Forest Park, Taipei", "w": 1800, "h": 1200, "featured": 9, "original": "daan park/DSC06030.png"},
    {"src": "photos/taipei/01.jpg", "category": "taipei", "title": "Fireworks over Taipei", "place": "Taipei", "w": 1800, "h": 1200, "hero": true, "original": "taipei/DSC05100.png"},
    {"src": "photos/taipei/02.jpg", "category": "taipei", "title": "Fireworks, second burst", "place": "Taipei", "w": 1800, "h": 1200, "featured": 7, "original": "taipei/DSC05101.png"},
    {"src": "photos/taipei/03.jpg", "category": "taipei", "title": "Two shells, last of the night", "place": "Taipei", "w": 1800, "h": 1200, "original": "taipei/DSC05111.png"},
    {"src": "photos/nyc/01.jpg", "category": "nyc", "title": "Statue of Liberty", "place": "New York", "w": 1200, "h": 1800, "original": "nyc/DSC04897.png"},
    {"src": "photos/nyc/02.jpg", "category": "nyc", "title": "Subway car, empty seats", "place": "New York", "w": 1200, "h": 1800, "featured": 5, "original": "nyc/DSC04931.png"},
    {"src": "photos/nyc/03.jpg", "category": "nyc", "title": "Street corner, Manhattan", "place": "New York", "w": 1200, "h": 1800, "original": "nyc/DSC04941.png"},
    {"src": "photos/nyc/04.jpg", "category": "nyc", "title": "Coneflowers", "place": "New York", "w": 1800, "h": 1200, "original": "nyc/DSC04975.png"},
    {"src": "photos/nyc/05.jpg", "category": "nyc", "title": "Avenue at night", "place": "New York", "w": 1200, "h": 1800, "featured": 11, "original": "nyc/DSC05055.png"},
    {"src": "photos/sunset/01.jpg", "category": "sunset", "title": "Sun on the horizon", "w": 1800, "h": 1200, "hero": true, "original": "sunset/DSC03536.png"},
    {"src": "photos/sunset/02.jpg", "category": "sunset", "title": "Clouds lit from below", "w": 1800, "h": 1200, "original": "sunset/DSC03540.png"}
  ]
}/*SITE-END*/;

const CATEGORIES = SITE.categories;
const PHOTOS = SITE.photos;
