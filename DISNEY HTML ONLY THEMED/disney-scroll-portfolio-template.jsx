#target photoshop
app.displayDialogs = DialogModes.NO;

function color(hex) {
  var c = new SolidColor();
  c.rgb.hexValue = hex.replace('#', '');
  return c;
}

function fillRect(doc, name, hex, x, y, w, h, opacity) {
  var layer = doc.artLayers.add();
  layer.name = name;
  doc.activeLayer = layer;
  doc.selection.select([
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h]
  ]);
  doc.selection.fill(color(hex));
  doc.selection.deselect();
  if (opacity !== undefined) layer.opacity = opacity;
  return layer;
}

function fillAll(doc, name, hex, opacity) {
  return fillRect(doc, name, hex, 0, 0, 1600, 6000, opacity);
}

function text(doc, name, contents, x, y, size, hex, font, opacity) {
  var layer = doc.artLayers.add();
  layer.name = name;
  layer.kind = LayerKind.TEXT;
  var t = layer.textItem;
  t.contents = contents;
  t.position = [x, y];
  t.size = size;
  t.color = color(hex);
  t.font = font || 'ArialMT';
  if (opacity !== undefined) layer.opacity = opacity;
  return layer;
}

function placeAsset(doc, filePath, name, opacity) {
  var file = new File(filePath);
  if (!file.exists) return null;
  var idPlc = charIDToTypeID('Plc ');
  var desc = new ActionDescriptor();
  desc.putPath(charIDToTypeID('null'), file);
  desc.putEnumerated(charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa'));
  var offset = new ActionDescriptor();
  offset.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0);
  offset.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0);
  desc.putObject(charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), offset);
  executeAction(idPlc, desc, DialogModes.NO);
  var layer = doc.activeLayer;
  layer.name = name;
  if (opacity !== undefined) layer.opacity = opacity;
  return layer;
}

function placeSectionImage(doc, filePath, name, sectionY, opacity) {
  var layer = placeAsset(doc, filePath, name, opacity);
  if (!layer) return null;
  var b = layer.bounds;
  var width = b[2] - b[0];
  var height = b[3] - b[1];
  var scale = Math.max(1600 / width, 1000 / height) * 100;
  layer.resize(scale, scale, AnchorPosition.MIDDLECENTER);
  b = layer.bounds;
  width = b[2] - b[0];
  height = b[3] - b[1];
  layer.translate((1600 - width) / 2 - b[0], sectionY + (1000 - height) / 2 - b[1]);
  return layer;
}

function sectionHeader(doc, sectionY, index, label, accent) {
  fillRect(doc, 'SECTION ' + index + ' - HEADER RULE', 'FFFFFF', 96, sectionY + 74, 1408, 1, 28);
  text(doc, 'SECTION ' + index + ' - INDEX', index + ' / 06', 104, sectionY + 54, 13, accent, 'Arial-BoldMT');
  text(doc, 'SECTION ' + index + ' - LABEL', label, 1295, sectionY + 54, 13, 'FFF9EC', 'Arial-BoldMT', 82);
}

function realmRail(doc, sectionY, active, accent) {
  var labels = ['MEADOW', 'OCEAN', 'CITY', 'SANDS', 'FROST', 'COSMIC'];
  text(doc, 'SECTION ' + (active + 1) + ' - JOURNEY LABEL', 'YOUR JOURNEY', 1478, sectionY + 420, 12, 'FFF9EC', 'Arial-BoldMT', 76);
  for (var i = 0; i < labels.length; i++) {
    var y = sectionY + 500 + i * 54;
    fillRect(doc, 'SECTION ' + (active + 1) + ' - RAIL ' + (i + 1), i === active ? accent : 'FFFFFF', 1483, y, 16, 16, i === active ? 100 : 45);
    if (i === active) text(doc, 'SECTION ' + (active + 1) + ' - RAIL LABEL', labels[i], 1330, y + 13, 12, 'FFF9EC', 'Arial-BoldMT');
  }
}

var root = '/Users/michaeljosephcandra/Downloads/disney-multi-realm-homepage';
var output = new File('/Users/michaeljosephcandra/Downloads/disney-multi-realm-portfolio-scroll-template.psd');
var assets = {
  meadow: root + '/public/assets/grassland.jpg',
  ocean: root + '/public/assets/ocean.jpg',
  city: root + '/public/assets/city.jpg',
  sands: root + '/public/assets/desert.jpg',
  frost: root + '/public/assets/frost.jpg',
  cosmic: root + '/public/assets/cosmic.jpg',
  logo: root + '/public/assets/disney-logo.png'
};

var doc = app.documents.add(1600, 6000, 100, 'Disney Scroll Portfolio Template', NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
fillAll(doc, '00 - CANVAS / Deep Navy', '061127');

var sections = [
  { key: 'meadow', label: 'ENCHANTED MEADOW', title: 'One Castle.', italic: 'Many Realms.', body: 'A world made of stories\rfrom meadow to ocean, city and stars.', accent: 'F6D17F', prompt: 'BEGIN THE JOURNEY' },
  { key: 'ocean', label: 'OCEAN OF ADVENTURE', title: 'Go beyond', italic: 'the horizon.', body: 'Dive into a blue world where every current\rpoints toward a new story.', accent: '9FE9FF', prompt: 'DIVE INTO ADVENTURE' },
  { key: 'city', label: 'CITY OF HEROES', title: 'Courage changes', italic: 'the skyline.', body: 'Signals, sparks and electric light\rturn the journey into a heroic cityscape.', accent: 'FF5D62', prompt: 'ENTER THE ACTION' },
  { key: 'sands', label: 'SANDS OF WONDER', title: 'A wish can', italic: 'change everything.', body: 'Warm dunes and drifting stardust\rcreate a quieter chapter of possibility.', accent: 'FFD28A', prompt: 'FOLLOW THE STARLIT PATH' },
  { key: 'frost', label: 'THE FROZEN NORTH', title: 'Let your true', italic: 'colours show.', body: 'A crystalline world catches every movement\rwhile the centre stays bright and warm.', accent: 'DFF9FF', prompt: 'STEP INTO THE UNKNOWN' },
  { key: 'cosmic', label: 'GALACTIC FRONTIER', title: 'Stories reach', italic: 'beyond the stars.', body: 'Constellations and orbital trails\rmake the universe feel limitless.', accent: 'D3BAFF', prompt: 'LAUNCH INTO THE GALAXY' }
];

for (var s = 0; s < sections.length; s++) {
  var item = sections[s];
  var y = s * 1000;
  placeSectionImage(doc, assets[item.key], 'SECTION ' + (s + 1) + ' - ARTWORK / Replaceable ' + item.label, y, s === 0 ? 72 : 66);
  fillRect(doc, 'SECTION ' + (s + 1) + ' - ATMOSPHERE / Navy Overlay', '061127', 0, y, 1600, 1000, s === 0 ? 44 : 52);
  fillRect(doc, 'SECTION ' + (s + 1) + ' - LEFT PANEL / Readability', '061127', 0, y, s === 0 ? 760 : 690, 1000, 36);
  fillRect(doc, 'SECTION ' + (s + 1) + ' - ACCENT / Vertical Rule', item.accent, 684, y, 2, 1000, 75);
  sectionHeader(doc, y, s + 1, item.label, item.accent);
  realmRail(doc, y, s, item.accent);

  if (s === 0) {
    placeAsset(doc, assets.logo, 'SECTION 1 - BRAND / Disney Logo', 100);
    if (doc.activeLayer) {
      doc.activeLayer.invert();
      var lb = doc.activeLayer.bounds;
      var lw = lb[2] - lb[0];
      var lh = lb[3] - lb[1];
      var logoScale = Math.min(170 / lw, 55 / lh) * 100;
      doc.activeLayer.resize(logoScale, logoScale, AnchorPosition.TOPLEFT);
      lb = doc.activeLayer.bounds;
      doc.activeLayer.translate(104 - lb[0], 107 - lb[1]);
    }
    text(doc, 'SECTION 1 - BRAND / Wordmark', 'Disney', 104, y + 165, 68, 'FFF9EC', 'Georgia-Italic');
    text(doc, 'SECTION 1 - NAV / Explore', 'EXPLORE', 680, y + 120, 15, 'FFF9EC', 'Arial-BoldMT');
    text(doc, 'SECTION 1 - NAV / Watch', 'WATCH', 835, y + 120, 15, 'FFF9EC', 'Arial-BoldMT', 72);
    text(doc, 'SECTION 1 - NAV / Visit', 'VISIT', 980, y + 120, 15, 'FFF9EC', 'Arial-BoldMT', 72);
    text(doc, 'SECTION 1 - NAV / Play', 'PLAY', 1115, y + 120, 15, 'FFF9EC', 'Arial-BoldMT', 72);
    fillRect(doc, 'SECTION 1 - NAV / Search Circle', 'FFFFFF', 1280, y + 93, 52, 52, 12);
    fillRect(doc, 'SECTION 1 - NAV / Sound Pill', 'FFFFFF', 1360, y + 93, 170, 52, 10);
    text(doc, 'SECTION 1 - NAV / Sound Text', 'SOUND OFF', 1400, y + 126, 13, 'FFF9EC', 'Arial-BoldMT');
    text(doc, 'SECTION 1 - EYEBROW', 'A WORLD MADE OF STORIES', 128, y + 390, 16, item.accent, 'Arial-BoldMT');
    text(doc, 'SECTION 1 - TITLE / Primary', item.title, 126, y + 548, 104, 'FFF9EC', 'Georgia');
    text(doc, 'SECTION 1 - TITLE / Italic', item.italic, 126, y + 664, 104, item.accent, 'Georgia-Italic');
    text(doc, 'SECTION 1 - BODY / Intro', 'Journey from enchanted meadows to oceans, cities and stars - each\rworld changing around you as stories come alive.', 128, y + 760, 27, 'FFF9EC', 'ArialMT', 92);
    fillRect(doc, 'SECTION 1 - CTA / Begin Journey', 'FFF9EC', 126, y + 846, 350, 62, 100);
    text(doc, 'SECTION 1 - CTA / Begin Label', item.prompt, 166, y + 885, 14, '061127', 'Arial-BoldMT');
    text(doc, 'SECTION 1 - CTA / View All', 'VIEW ALL REALMS  >', 520, y + 885, 14, 'FFF9EC', 'Arial-BoldMT');
    fillRect(doc, 'SECTION 1 - STATUS / Card', '061127', 84, y + 920, 470, 70, 88);
    text(doc, 'SECTION 1 - STATUS / Live Realm', 'LIVE REALM', 126, y + 950, 12, item.accent, 'Arial-BoldMT');
    text(doc, 'SECTION 1 - STATUS / Meadow', 'MEADOW', 420, y + 950, 13, 'FFF9EC', 'Arial-BoldMT');
  } else {
    text(doc, 'SECTION ' + (s + 1) + ' - EYEBROW', 'REALM ' + ('0' + (s + 1)).slice(-2) + '  /  ' + item.label, 112, y + 280, 15, item.accent, 'Arial-BoldMT');
    text(doc, 'SECTION ' + (s + 1) + ' - TITLE / Primary', item.title, 110, y + 420, 78, 'FFF9EC', 'Georgia');
    text(doc, 'SECTION ' + (s + 1) + ' - TITLE / Italic', item.italic, 110, y + 510, 78, item.accent, 'Georgia-Italic');
    text(doc, 'SECTION ' + (s + 1) + ' - BODY / Description', item.body, 114, y + 600, 25, 'FFF9EC', 'ArialMT', 92);
    fillRect(doc, 'SECTION ' + (s + 1) + ' - CTA / Prompt', item.accent, 110, y + 744, 300, 58, 100);
    text(doc, 'SECTION ' + (s + 1) + ' - CTA / Label', item.prompt, 144, y + 780, 13, '061127', 'Arial-BoldMT');
    text(doc, 'SECTION ' + (s + 1) + ' - STORIES / Label', 'STORIES IN THIS REALM', 110, y + 895, 12, item.accent, 'Arial-BoldMT');
    text(doc, 'SECTION ' + (s + 1) + ' - STORIES / Names', ['Moana  |  The Little Mermaid  |  Lilo and Stitch', 'Avengers  |  Big Hero 6  |  Spider-Man', 'Aladdin  |  Jasmine  |  A Whole New World', 'Frozen  |  Frozen II  |  Olaf Presents', 'Star Wars  |  WALL-E  |  Lightyear'][s - 1], 110, y + 930, 15, 'FFF9EC', 'ArialMT', 90);
  }
  fillRect(doc, 'SECTION ' + (s + 1) + ' - FOOTER / Divider', 'FFFFFF', 96, y + 956, 1408, 1, 28);
  text(doc, 'SECTION ' + (s + 1) + ' - FOOTER / Note', 'SCROLL STORYBOARD  /  REPLACE TEXT + ARTWORK', 104, y + 984, 11, 'FFF9EC', 'Arial-BoldMT', 62);
}

doc.saveAs(output, new PhotoshopSaveOptions(), true, Extension.LOWERCASE);
app.displayDialogs = DialogModes.ALL;
