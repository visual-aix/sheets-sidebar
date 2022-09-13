function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .createMenu("Visual AI")
    .addItem("Show", "showVisualAISidebar")
    .addToUi();

  showVisualAISidebar();
}

function showVisualAISidebar() {
  var html =
    HtmlService.createHtmlOutputFromFile("Sidebar").setTitle("Visual AI");
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showSidebar(html);
}

function getSettings() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName("index");

  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  var range = sheet.getRange(1, 1, 1, lastColumn);

  return {
    header: range.getValues()[0],
    lastRow: lastRow,
    lastColumn: lastColumn,
  };
}

function getPhotoshop() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName("photoshop");

  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  var range = sheet.getRange(1, 1, lastRow, lastColumn);

  var csv = range.getValues();

  var header = csv[0];
  csv.shift();
  csv = csv.reverse().filter((x) => x.join("") !== "");
  csv = [header, ...csv];

  console.log("Exporting", csv.length, "rows");

  const output = csv.reduce(
    (f, row) =>
      f +
      row.reduce((r, cell) => r + (!!r ? "," : "") + '"' + cell + '"', "") +
      "\n",
    ""
  );

  return output;
}

function getState() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheetName = spreadsheet.getSheetName();
  if (sheetName !== "index") return null;

  var selectedRange = spreadsheet.getSelection().getActiveRange();
  var current_row = selectedRange.getRow();

  var sheet = spreadsheet.getSheetByName("index");
  var lastColumn = sheet.getLastColumn();
  var row_range = spreadsheet
    .getActiveSheet()
    .getRange(current_row, 1, 1, lastColumn);
  var values = row_range.getDisplayValues();

  return {
    selection: selectedRange.getA1Notation(), //C34
    row_values: values[0],
    row_index: current_row,
  };
}
