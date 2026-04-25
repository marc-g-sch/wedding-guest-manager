// ============================================================
// Google Apps Script — Wedding RSVP → Google Sheets
// ============================================================
//
// SETUP (one-time, ~3 minutes):
// 1. Go to https://script.google.com and create a NEW project
//    that is BOUND to your target Google Sheet
//    (open the Sheet → Extensions → Apps Script)
// 2. Paste ALL of this code into the editor (replace any existing code)
// 3. Click "Deploy" → "New deployment"
// 4. Type: Web app
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Click "Deploy" → copy the Web App URL
// 8. Open index.html, find SHEETS_URL and replace with your URL
// 9. Every time you edit this script you must create a NEW deployment
//    (or "Manage deployments" → edit → new version) — editing the
//    script does NOT update an existing deployment automatically.
// ============================================================

// Shared CORS headers — Apps Script returns these on every response
// so the browser allows the cross-origin fetch from your wedding site.
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

// OPTIONS preflight — browsers send this before a CORS POST
function doOptions(e) {
  Logger.log('doOptions called');
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  Logger.log('doPost called');
  Logger.log('e.postData type: ' + (e && e.postData ? e.postData.type : 'none'));
  Logger.log('e.postData contents: ' + (e && e.postData ? e.postData.contents : 'none'));

  try {
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('ERROR: Empty post body');
      throw new Error('Empty request body — no data received');
    }

    const raw = e.postData.contents;
    Logger.log('Raw body: ' + raw);

    const data = JSON.parse(raw);
    Logger.log('Parsed data: ' + JSON.stringify(data));

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    Logger.log('Sheet name: ' + sheet.getName() + ', last row: ' + sheet.getLastRow());

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name(s)', 'Friday', 'Saturday',
        'Food', 'Dietary Notes', 'Message', 'Email'
      ]);
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

    Logger.log('Row appended successfully');

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('ERROR in doPost: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check — visit the web app URL in a browser to confirm it's live
function doGet(e) {
  Logger.log('doGet called');
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
  Logger.log('Sheet initialised');
}
