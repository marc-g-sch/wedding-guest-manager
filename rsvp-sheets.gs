const SPREADSHEET_ID = '1mHj-X3pUHy8TVywjXkhzZCQbrNC9RMnhjWvvI1xyMzU';
const NOTIFY_EMAIL   = 'josipovichlaura@gmail.com';

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

    // Send email notification
    sendNotification(data);

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

function sendNotification(data) {
  try {
    const name    = data.names    || '(no name)';
    const friday  = data.friday   || '—';
    const saturday= data.saturday || '—';
    const food    = data.food     || '—';
    const dietary = data.dietary_notes || '—';
    const message = data.message  || '—';
    const email   = data.email    || '—';

    const subject = '🎉 New RSVP: ' + name;
    const body =
      'New RSVP received for Laura & Marc!\n\n' +
      'Name(s):         ' + name     + '\n' +
      'Friday:          ' + friday   + '\n' +
      'Saturday:        ' + saturday + '\n' +
      'Food:            ' + food     + '\n' +
      'Dietary notes:   ' + dietary  + '\n' +
      'Message:         ' + message  + '\n' +
      'Email:           ' + email    + '\n\n' +
      'View all responses:\n' +
      'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID;

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    Logger.log('✅ Notification email sent to ' + NOTIFY_EMAIL);
  } catch (err) {
    Logger.log('⚠️ Email failed (non-fatal): ' + err.toString());
    // Don't rethrow — a failed email shouldn't break the RSVP submission
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RSVP endpoint is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
