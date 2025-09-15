// utils/generateVCard.ts
export function generateVCard({ name, mobileNumbers, emails, websites }: any) {
  let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
  `;

  // Mobiles
  mobileNumbers.forEach((m: any) => {
    if(m.activeStatus === false) return
    vcard += `\nTEL;TYPE=${m.phoneNumberType || "CELL"}:${m.countryCode} ${m.phoneNumber}`;

  });

  // Emails
  emails.forEach((e: any) => {
    if(e.activeStatus === false) return
    vcard += `\nEMAIL;TYPE=${e.emailType || "INTERNET"}:${e.emailId}`;
  });

  // Websites
  websites.forEach((w: any) => {
    if(w.activeStatus === false) return
    vcard += `\nURL;TYPE=${w.websiteType || "HOME"}:${w.website}`;
  });

  vcard += `\nEND:VCARD`;

  return vcard.trim();
}
