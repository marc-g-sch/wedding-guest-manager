const SPREADSHEET_ID = '1mHj-X3pUHy8TVywjXkhzZCQbrNC9RMnhjWvvI1xyMzU';

function getSheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
}

function doPost(e) {
  Logger.log('=== doPost called ===');
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Empty request body');
    }
    const data = JSON.parse(e.postData.contents);
    Logger.log('Parsed: ' + JSON.stringify(data));

    const sheet = getSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name(s)', 'Friday', 'Saturday', 'Food', 'Dietary Notes', 'Message', 'Email']);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.setFrozenRows(1);
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

    Logger.log('✅ Row written');
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

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RSVP endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
