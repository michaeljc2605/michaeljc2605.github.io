#target photoshop
app.displayDialogs = DialogModes.NO;

function color(hex) {
  var c = new SolidColor();
  c.rgb.hexValue = hex.replace('#', '');
  return c;
}

function fullFill(doc, name, hex, opacity) {
  var layer = doc.artLayers.add();
  layer.name = name;
  doc.activeLayer = layer;
  doc.selection.selectAll();
  doc.selection.fill(color(hex));
  doc.selection.deselect();
  if (opacity !== undefined) layer.opacity = opacity;
  return layer;
}

function rectFill(doc, name, hex, x, y, w, h, opacity) {
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

function textLayer(doc, name, contents, x, y, size, hex, font, opacity) {
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

function placeImage(doc, filePath, name, opacity) {
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

var projectRoot = new Folder('/Users/michaeljosephcandra/Downloads/disney-multi-realm-homepage');
var outputFile = new File('/Users/michaeljosephcandra/Downloads/disney-multi-realm-portfolio-template.psd');
var heroFile = new File('/Users/michaeljosephcandra/Downloads/disney-multi-realm-homepage/public/assets/grassland.jpg');

var doc = app.documents.add(1600, 1000, 100, 'Disney Portfolio Template', NewDocumentMode.RGB, DocumentFill.TRANSPARENT);

// Palette and layered canvas foundation.
fullFill(doc, '01 - BACKGROUND / Deep Navy', '061127');
var hero = placeImage(doc, heroFile.fsName, '02 - HERO ARTWORK / Replaceable Image', 30);
if (hero) {
  var scale = Math.max(1600 / hero.bounds[2], 1000 / hero.bounds[3]) * 100;
  hero.resize(scale, scale, AnchorPosition.MIDDLECENTER);
  hero.translate((1600 - (hero.bounds[2] - hero.bounds[0])) / 2 - hero.bounds[0], (1000 - (hero.bounds[3] - hero.bounds[1])) / 2 - hero.bounds[1]);
}
fullFill(doc, '03 - ATMOSPHERE / Navy Overlay', '061127', 68);
rectFill(doc, '04 - PANEL / Project Details', '061127', 0, 0, 650, 1000, 93);
rectFill(doc, '05 - ACCENT / Gold Rule', 'F5D686', 104, 158, 74, 4, 100);
rectFill(doc, '06 - ACCENT / Blue Glow', '84CFFF', 650, 0, 2, 1000, 70);

// Editable header and case-study copy.
textLayer(doc, '07 - LABEL / Portfolio Case Study', 'PORTFOLIO  /  CASE STUDY', 104, 124, 18, 'F5D686', 'ArialMT');
textLayer(doc, '08 - TITLE / Project Name', 'ONE CASTLE.', 104, 285, 72, 'FFF9EC', 'Georgia-Bold');
textLayer(doc, '09 - TITLE / Project Name Continued', 'MANY REALMS.', 104, 382, 72, 'FFF9EC', 'Georgia-Bold');
textLayer(doc, '10 - SUBTITLE / Project Descriptor', 'A cinematic digital experience\rfor stories that feel limitless.', 108, 474, 28, 'D9EF9D', 'Georgia-Italic');
textLayer(doc, '11 - META / Role', 'ROLE', 108, 618, 12, 'F5D686', 'Arial-BoldMT');
textLayer(doc, '12 - META / Role Value', 'Art Direction  |  UX / UI  |  Front-end', 108, 645, 19, 'FFF9EC', 'ArialMT');
textLayer(doc, '13 - META / Year', 'YEAR', 108, 702, 12, 'F5D686', 'Arial-BoldMT');
textLayer(doc, '14 - META / Year Value', '2026', 108, 729, 19, 'FFF9EC', 'ArialMT');

// Right-side project statement.
textLayer(doc, '15 - LABEL / Overview', 'OVERVIEW', 920, 146, 14, 'F5D686', 'Arial-BoldMT');
rectFill(doc, '16 - OVERVIEW / Divider', 'FFFFFF', 920, 172, 64, 2, 45);
textLayer(doc, '17 - BODY / Project Overview', 'A homepage concept built as one\rcontinuous journey through six\rthemed worlds - warm, lyrical\rand full of possibility.', 920, 222, 28, 'FFF9EC', 'Georgia');
textLayer(doc, '18 - LABEL / Tools', 'TOOLS', 920, 436, 14, 'F5D686', 'Arial-BoldMT');
textLayer(doc, '19 - BODY / Tools', 'React  |  TypeScript  |  Motion  |  Prototyping', 920, 470, 17, 'FFF9EC', 'ArialMT');

// Realm index strip for portfolio case-study navigation.
textLayer(doc, '20 - LABEL / Realms', 'THE REALMS', 920, 582, 14, 'F5D686', 'Arial-BoldMT');
var realms = [
  ['01', 'MEADOW', 'F6D17F'],
  ['02', 'OCEAN', '9FE9FF'],
  ['03', 'CITY', 'FF5D62'],
  ['04', 'SANDS', 'FFD28A'],
  ['05', 'FROST', 'DFF9FF'],
  ['06', 'COSMIC', 'D3BAFF']
];
for (var i = 0; i < realms.length; i++) {
  var x = 920 + (i % 3) * 205;
  var y = 622 + Math.floor(i / 3) * 64;
  rectFill(doc, '21 - REALM ' + realms[i][0] + ' / Accent', realms[i][2], x, y, 24, 3, 100);
  textLayer(doc, '22 - REALM ' + realms[i][0] + ' / Label', realms[i][0] + '  ' + realms[i][1], x, y + 31, 14, 'FFF9EC', 'Arial-BoldMT');
}

// Footer cue and reusable placeholder note.
rectFill(doc, '23 - FOOTER / Rule', 'FFFFFF', 104, 898, 1392, 1, 25);
textLayer(doc, '24 - FOOTER / Replace Prompt', 'REPLACE TEXT + ARTWORK  /  KEEP THE SYSTEM', 104, 936, 13, 'FFFFFF', 'Arial-BoldMT', 66);
textLayer(doc, '25 - FOOTER / Page Marker', '01  -  06', 1390, 936, 13, 'F5D686', 'Arial-BoldMT');

doc.activeLayer = doc.layers[0];
doc.saveAs(outputFile, new PhotoshopSaveOptions(), true, Extension.LOWERCASE);
app.displayDialogs = DialogModes.ALL;
