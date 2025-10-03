import { isEmpty } from 'lodash';
import * as XLSX from 'xlsx';

export interface LeadData {
  id: number;
  name: string;
  emailId: string;
  mobileNumber: string;
  location: string;
  where_you_met: string;
  company: string;
  updatedAt: string;
}

export const downloadLeadsAsXLSX = (leadsData: LeadData[], filename: string = 'leads_data') => {
  try {
    // Prepare data for Excel
    if(isEmpty(leadsData)) return false;
    const worksheetData = leadsData.map(lead => ({
      'Name': lead.name,
      'Email': lead.emailId,
      'Mobile': lead.mobileNumber,
      'Location': lead.location,
      'Source': lead.where_you_met,
      'Company': lead.company,
      'Date Added': lead.updatedAt
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Name
      { wch: 25 }, // Email
      { wch: 15 }, // Mobile
      { wch: 20 }, // Location
      { wch: 20 }, // Source
      { wch: 25 }, // Company
      { wch: 15 }  // Date
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const finalFilename = `${filename}_${timestamp}.xlsx`;

    // Write file
    XLSX.writeFile(workbook, finalFilename);

    return true;
  } catch (error) {
    console.error('Error downloading leads as XLSX:', error);
    return false;
  }
};
