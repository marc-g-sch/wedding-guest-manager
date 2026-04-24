// ============================================================
// Google Apps Script — Wedding RSVP → Google Sheets
// ============================================================
//
// SETUP (one-time, ~3 minutes):
// 1. Go to https://script.google.com and create a NEW project
// 2. Paste ALL of this code into the editor (replace any existing code)
// 3. Click "Deploy" → "New deployment"
// 4. Type: Web app
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Click "Deploy" → copy the Web App URL
// 8. Open index.html, find the line:
//      const SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
//    and replace the placeholder with your copied URL
// 9. The script will automatically create column headers on the
//    first submission. You can also run initSheet() manually first.
// ============================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name(s)', 'Friday', 'Saturday',
        'Food', 'Dietary Notes', 'Message', 'Email'
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date().toLocaleString('de-AT'),
      data.names        || '',
      data.friday       || '',
      data.saturday     || '',
      data.food         || '',
      data.dietary_notes || '',
      data.message      || '',
      data.email        || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check — visit the web app URL in a browser to confirm it's live
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RSVP endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: run this manually once to pre-create headers
function initSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clearContents();
  sheet.appendRow([
    'Timestamp', 'Name(s)', 'Friday', 'Saturday',
    'Food', 'Dietary Notes', 'Message', 'Email'
  ]);
  sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  sheet.setFrozenRows(1);
}
