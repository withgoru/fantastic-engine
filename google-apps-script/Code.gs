/**
 * fantastic-engine #9 연동용 Google Apps Script Web App.
 *
 * 배포 방법: 스프레드시트 → 확장 프로그램 → Apps Script → 이 파일 내용을 Code.gs에 붙여넣기
 * → 배포 → 배포 관리 → 수정 → 새 버전 (기존 웹앱 URL을 유지하려면 "새 배포"가 아니라
 * 반드시 "새 버전"을 사용할 것).
 *
 * 시트의 1행 헤더:
 * timestamp | 품목 | 수량 | 현재_출하채널 | 현재_수수료입력값(%) | 시뮬레이션_예상정산율(%)
 * | 등록의향 | 실제수수료_응답(%) | 연락처 | 개인정보동의여부
 */

/**
 * 스프레드시트 수식/CSV 인젝션 방지.
 * "=", "+", "-", "@"로 시작하는 문자열은 스프레드시트가 수식으로 해석할 수 있으므로,
 * 앞에 작은따옴표를 붙여 강제로 텍스트로 저장한다 (셀에는 따옴표가 보이지 않음).
 */
function sanitizeForSheet(value) {
  if (typeof value !== 'string') return value;
  if (/^[=+\-@]/.test(value)) {
    return "'" + value;
  }
  return value;
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('responses')
    || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    sanitizeForSheet(data.item || ''),
    sanitizeForSheet(data.quantity || ''),
    sanitizeForSheet(data.currentChannel || ''),
    data.currentFeeRatePercent ?? '',
    sanitizeForSheet(String(data.simulationSettlementRatePercent ?? '')),
    data.registrationIntent || '',
    data.actualFeeRateResponsePercent ?? '',
    data.agreedToContact ? sanitizeForSheet(data.contactPhone || '') : '',
    data.agreedToContact ? 'Y' : 'N',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
