// ============================================================
// Google Apps Script — Wedding RSVP → Google Sheets
// ============================================================
//
// SETUP:
// 1. Paste ALL of this code into your Apps Script editor (replace everything)
// 2. Fill in your SPREADSHEET_ID below — get it from your Sheet URL:
//    https://docs.google.com/spreadsheets/d/  ← SPREADSHEET_ID →  /edit
// 3. Click Save (💾), then Deploy → Manage deployments → edit → New version → Deploy
// ============================================================

// ▼▼▼ PASTE YOUR GOOGLE SHEET ID HERE ▼▼▼
const SPREADSHEET_ID = '1mHj-X3pUHy8TVywjXkhzZCQbrNC9RMnhjWvvI1xyMzU';
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

function getSheet() {
  // Works both as standalone script (uses SPREADSHEET_ID)
  // and as container-bound script (bound directly to a Sheet)
  try {
    if (SPREADSHEET_ID && SPREADSHEET_ID !== 'YOUR_SHEET_ID_HERE') {
      return SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    }
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  } catch (e) {
    throw new Error(
      'Cannot open spreadsheet. Either fill in SPREADSHEET_ID at the top of this script, ' +
      'or create the script from inside your Sheet via Extensions → Apps Script. Error: ' + e
    );
  }
}

function doPost(e) {
  Logger.log('=== doPost called ===');
  Logger.log('postData: ' + JSON.stringify(e ? e.postData : null));

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Empty request body — no data received');
    }

    const raw = e.postData.contents;
    Logger.log('Raw body: ' + raw);

    const data = JSON.parse(raw);
    Logger.log('Parsed: ' + JSON.stringify(data));

    const sheet = getSheet();
    Logger.log('Sheet: ' + sheet.getName() + ', rows: ' + sheet.getLastRow());

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name(s)', 'Friday', 'Saturday', 'Food', 'Dietary Notes', 'Message', 'Email']);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.setFrozenRows(1);
      Logger.log('Headers created');
    }

    sheet.appendRow([
      new Date().toLocaleString('de-AT'),
      data.names         || '',
      data.friday        || '',
      data.saturday      || '',
      data.food          || '',
      data.dietary_notes || '',
      data.message       || '',
      data.email         || ''
    ]);

    Logger.log('✅ Row written successfully');

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('❌ ERROR: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check — open the web app URL in a browser to confirm it's live
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RSVP endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this manually once to pre-create the header row
function initSheet() {
  const sheet = getSheet();
  sheet.clearContents();
  sheet.appendRow(['Timestamp', 'Name(s)', 'Friday', 'Saturday', 'Food', 'Dietary Notes', 'Message', 'Email']);
  sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  sheet.setFrozenRows(1);
  Logger.log('Sheet initialised: ' + sheet.getName());
}
