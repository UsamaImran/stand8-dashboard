import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const placementsPDF = data => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF('l', 'mm');

  const tableRows = [];

  data.forEach(row => {
    const columns = [
      row.contractor,
      row.placement_id,
      row.recruiter,
      row.salesperson,
      row.end_date,
      row.days_before_end,
      row.notes,
    ];
    tableRows.push(columns);
  });

  autoTable(doc, {
    html: '#placements_report_pdf_table',
    startY: 10,
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 60 },
      2: { cellWidth: 30, halign: 'center' },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
      5: { halign: 'left', cellWidth: 30 },
      6: { halign: 'center', cellWidth: 30 },
      7: { halign: 'left', cellWidth: 40 },
    },

    didParseCell: cellData => {
      if (cellData.section === 'head') {
        // eslint-disable-next-line no-param-reassign
        cellData.cell.styles.fillColor = [224, 224, 224];
        // eslint-disable-next-line no-param-reassign
        cellData.cell.styles.fontStyle = 'bold';
        // eslint-disable-next-line no-param-reassign
        cellData.cell.styles.textColor = [39, 43, 65];
      }
    },
  });
  const date = Date().split(' ');
  const dateStr = date[2] + date[3] + date[4];
  doc.save(`30/60/90 Report_${dateStr}.pdf`);
};

export default placementsPDF;
