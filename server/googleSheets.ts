import axios from 'axios';

export interface SheetProject {
  name: string;
  collected: number;
  target: number;
  donors: number;
  transactions: number;
  marketer: string;
  team: string;
}

/**
 * سحب البيانات من جوجل شيت
 * الرابط: https://docs.google.com/spreadsheets/d/1B6OgOCaRWQgDU3NKUY8m9ZK1PwmFgZAkmhiUPE2yEEU/edit?gid=104154291#gid=104154291
 * الصفحة: الورقة3 (gid=104154291)
 */
export async function fetchGoogleSheetData(): Promise<SheetProject[]> {
  try {
    const spreadsheetId = '1B6OgOCaRWQgDU3NKUY8m9ZK1PwmFgZAkmhiUPE2yEEU';
    const gid = '104154291'; 

    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;

    const response = await axios.get(csvUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const csvData = response.data;
    const lines = csvData.split('\n').filter((line: string) => line.trim());

    if (lines.length < 2) {
      console.warn('No data found in Google Sheet');
      return [];
    }

    const projects: SheetProject[] = [];

    // دالة لتحويل الأرقام مع تنظيف كامل
    const parseNumber = (str: string): number => {
      if (!str || str.trim() === '') return 0;
      // تجاهل القيم غير الصالحة مثل #N/A و #DIV/0! وغيرها
      if (str.includes('#')) return 0;
      const cleaned = str.replace(/[^\d.-]/g, '').trim();
      if (cleaned === '' || cleaned === '-') return 0;
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : num;
    };

    // تخطي رأس الجدول
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;

      const parts = parseCSVLine(line);

      // توزيع الأعمدة بناءً على الفحص الخام:
      // 0: اسم المشروع
      // 1: مستهدف المشروع
      // 2: ماتم جمعه للمشروع
      // 3: عدد المتبرعين
      // 4: عدد العمليات
      // 5: المسوق
      // 6: رابط المشروع (أو نص إضافي)
      // 9: الفريق (العمود العاشر)
      
      if (parts.length < 5) continue;

      const name = parts[0]?.trim() || '';
      if (!name || name === 'اسم المشروع') continue;

      const target = parseNumber(parts[1]);
      const collected = parseNumber(parts[2]);
      const donors = Math.floor(parseNumber(parts[3]));
      const transactions = Math.floor(parseNumber(parts[4]));
      const marketer = parts[5]?.trim() || 'غير محدد';
      
      // العمود J (الفريق) - يحتوي على "الفردي" أو "المجموعات"
      let team = parts[9]?.trim() || '';
      // تنظيف قيمة الفريق من المسافات الزائدة
      team = team.replace(/\s+/g, ' ').trim();
      // إذا كانت القيمة فارغة أو صفري، استخدم "غير محدد"
      if (!team || team === '' || team === 'صفري') {
        team = 'غير محدد';
      }

      projects.push({
        name,
        target,
        collected,
        donors,
        transactions,
        marketer,
        team
      });
    }

    console.log(`Fetched ${projects.length} projects from Google Sheet (Sheet 3)`);
    return projects;
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    throw new Error('Failed to fetch data from Google Sheet');
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

export function calculateStats(projects: SheetProject[]) {
  const totalCollected = projects.reduce((sum, p) => sum + p.collected, 0);
  const totalTarget = projects.reduce((sum, p) => sum + p.target, 0);
  const totalDonors = projects.reduce((sum, p) => sum + p.donors, 0);
  const totalTransactions = projects.reduce((sum, p) => sum + p.transactions, 0);
  const zeroProjects = projects.filter(p => p.collected === 0).length;
  const completeProjects = projects.filter(p => p.collected >= p.target && p.target > 0).length;
  const halaqa = Math.floor(totalCollected / 5000);
  
  // Campaign target: 1,000,000 SAR (أو يمكن استخدامه من المجموع إذا لزم الأمر)
  const campaignTarget = 1000000;
  const progressPercentage = (totalCollected / campaignTarget) * 100;

  return {
    totalCollected,
    totalTarget,
    totalDonors,
    totalTransactions,
    projectCount: projects.length,
    zeroProjects,
    completeProjects,
    halaqa,
    progressPercentage: Math.min(progressPercentage, 100),
    campaignTarget
  };
}

export function groupByTeam(projects: SheetProject[]) {
  const teamMap = new Map<string, {
    name: string;
    projects: number;
    collected: number;
    target: number;
    shares: number;
  }>();

  projects.forEach(project => {
    const teamName = project.team || 'العام';
    const existing = teamMap.get(teamName) || {
      name: teamName,
      projects: 0,
      collected: 0,
      target: 0,
      shares: 0
    };

    const updatedCollected = existing.collected + project.collected;
    teamMap.set(teamName, {
      ...existing,
      projects: existing.projects + 1,
      collected: updatedCollected,
      target: existing.target + project.target,
      shares: Math.floor(updatedCollected / 5000)
    });
  });

  return Array.from(teamMap.values()).sort((a, b) => b.collected - a.collected);
}

export function groupByMarketer(projects: SheetProject[]) {
  const marketerMap = new Map<string, {
    name: string;
    projects: number;
    collected: number;
    target: number;
  }>();

  projects.forEach(project => {
    const marketerName = project.marketer || 'غير محدد';
    const existing = marketerMap.get(marketerName) || {
      name: marketerName,
      projects: 0,
      collected: 0,
      target: 0
    };

    marketerMap.set(marketerName, {
      ...existing,
      projects: existing.projects + 1,
      collected: existing.collected + project.collected,
      target: existing.target + project.target
    });
  });

  return Array.from(marketerMap.values()).sort((a, b) => b.collected - a.collected);
}
