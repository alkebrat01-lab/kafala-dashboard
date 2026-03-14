// Mock data for Kafala 200 Halaqa Campaign Dashboard
// Data extracted from "مانوس خاص" sheet in Google Sheets

export interface Project {
  id: string;
  name: string;
  collected: number;
  target: number;
  donors: number;
  transactions: number;
  marketer: string;
  status: 'zero' | 'partial' | 'complete';
}

export interface MarketerStats {
  name: string;
  projects: number;
  collected: number;
  target: number;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'يوسف العويد الثاني',
    collected: 6700,
    target: 9600,
    donors: 5,
    transactions: 6,
    marketer: 'يوسف العويد الثاني',
    status: 'partial'
  },
  {
    id: '2',
    name: 'مشاري المسيري',
    collected: 0,
    target: 48800,
    donors: 1,
    transactions: 1,
    marketer: 'مشاري المسيري',
    status: 'zero'
  },
  {
    id: '3',
    name: 'يوسف العويد الثاني',
    collected: 400,
    target: 9600,
    donors: 2,
    transactions: 3,
    marketer: 'يوسف العويد الثاني',
    status: 'partial'
  },
  {
    id: '4',
    name: 'يوسف العويد الثاني',
    collected: 250,
    target: 9600,
    donors: 3,
    transactions: 3,
    marketer: 'يوسف العويد الثاني',
    status: 'partial'
  },
  {
    id: '5',
    name: 'يوسف العويد الثاني',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'يوسف العويد الثاني',
    status: 'zero'
  },
  {
    id: '6',
    name: 'يوسف العويد الثاني',
    collected: 15150,
    target: 9600,
    donors: 5,
    transactions: 5,
    marketer: 'يوسف العويد الثاني',
    status: 'complete'
  },
  {
    id: '7',
    name: 'يوسف العويد الثاني',
    collected: 44,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'يوسف العويد الثاني',
    status: 'partial'
  },
  {
    id: '8',
    name: 'يوسف العويد الثاني',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'يوسف العويد الثاني',
    status: 'zero'
  },
  {
    id: '9',
    name: 'يوسف العويد الثاني',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'يوسف العويد الثاني',
    status: 'zero'
  },
  {
    id: '10',
    name: 'يوسف العويد الثاني',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'يوسف العويد الثاني',
    status: 'zero'
  },
  {
    id: '11',
    name: 'يوسف العويد الثاني',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'يوسف العويد الثاني',
    status: 'zero'
  },
  {
    id: '12',
    name: 'مشاري المسيري',
    collected: 0,
    target: 28800,
    donors: 1,
    transactions: 1,
    marketer: 'مشاري المسيري',
    status: 'zero'
  },
  {
    id: '13',
    name: 'ناصر الملحاء',
    collected: 1960,
    target: 9600,
    donors: 11,
    transactions: 17,
    marketer: 'ناصر الملحاء',
    status: 'partial'
  },
  {
    id: '14',
    name: 'السيد الدودي',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'السيد الدودي',
    status: 'zero'
  },
  {
    id: '15',
    name: 'السيد الدودي',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'السيد الدودي',
    status: 'zero'
  },
  {
    id: '16',
    name: 'السيد الدودي',
    collected: 100,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'السيد الدودي',
    status: 'partial'
  },
  {
    id: '17',
    name: 'الملك العقالي',
    collected: 100,
    target: 9600,
    donors: 3,
    transactions: 5,
    marketer: 'الملك العقالي',
    status: 'partial'
  },
  {
    id: '18',
    name: 'عبدالعزيز العقالي',
    collected: 115,
    target: 9600,
    donors: 5,
    transactions: 5,
    marketer: 'عبدالعزيز العقالي',
    status: 'partial'
  },
  {
    id: '19',
    name: 'عبدالعزيز العقالي',
    collected: 180,
    target: 9600,
    donors: 3,
    transactions: 3,
    marketer: 'عبدالعزيز العقالي',
    status: 'partial'
  },
  {
    id: '20',
    name: 'الدواهج المؤسسي',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'الدواهج المؤسسي',
    status: 'zero'
  },
  {
    id: '21',
    name: 'عبدالعزيز العقالي',
    collected: 1100,
    target: 9600,
    donors: 15,
    transactions: 25,
    marketer: 'عبدالعزيز العقالي',
    status: 'partial'
  },
  {
    id: '22',
    name: 'عبدالعزيز العقالي',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'عبدالعزيز العقالي',
    status: 'zero'
  },
  {
    id: '23',
    name: 'عبدالعزيز العقالي',
    collected: 140,
    target: 9600,
    donors: 3,
    transactions: 5,
    marketer: 'عبدالعزيز العقالي',
    status: 'partial'
  },
  {
    id: '24',
    name: 'الدواهج المؤسسي',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'الدواهج المؤسسي',
    status: 'zero'
  },
  {
    id: '25',
    name: 'عبدالعزيز العقالي',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'عبدالعزيز العقالي',
    status: 'zero'
  },
  {
    id: '26',
    name: 'عبدالعزيز العقالي',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'عبدالعزيز العقالي',
    status: 'zero'
  },
  {
    id: '27',
    name: 'عبدالعزيز العقالي',
    collected: 100,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'عبدالعزيز العقالي',
    status: 'partial'
  },
  {
    id: '28',
    name: 'عبدالعزيز العقالي',
    collected: 455,
    target: 9600,
    donors: 4,
    transactions: 5,
    marketer: 'عبدالعزيز العقالي',
    status: 'partial'
  },
  {
    id: '29',
    name: 'بحيصنها آل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'بحيصنها آل',
    status: 'zero'
  },
  {
    id: '30',
    name: 'محمد المعيقل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'محمد المعيقل',
    status: 'zero'
  },
  {
    id: '31',
    name: 'محمد المعيقل',
    collected: 695,
    target: 9600,
    donors: 3,
    transactions: 5,
    marketer: 'محمد المعيقل',
    status: 'partial'
  },
  {
    id: '32',
    name: 'محمد المعيقل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'محمد المعيقل',
    status: 'zero'
  },
  {
    id: '33',
    name: 'محمد المعيقل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'محمد المعيقل',
    status: 'zero'
  },
  {
    id: '34',
    name: 'محمد المعيقل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'محمد المعيقل',
    status: 'zero'
  },
  {
    id: '35',
    name: 'محمد المعيقل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'محمد المعيقل',
    status: 'zero'
  },
  {
    id: '36',
    name: 'محمد المعيقل',
    collected: 415,
    target: 9600,
    donors: 3,
    transactions: 4,
    marketer: 'محمد المعيقل',
    status: 'partial'
  },
  {
    id: '37',
    name: 'محمد المعيقل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'محمد المعيقل',
    status: 'zero'
  },
  {
    id: '38',
    name: 'محمد المعيقل',
    collected: 0,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'محمد المعيقل',
    status: 'zero'
  },
  {
    id: '39',
    name: 'يوسف العويد الثاني',
    collected: 850,
    target: 9600,
    donors: 2,
    transactions: 2,
    marketer: 'يوسف العويد الثاني',
    status: 'partial'
  },
  {
    id: '40',
    name: 'يوسف العويد الثاني',
    collected: 1085,
    target: 9600,
    donors: 11,
    transactions: 11,
    marketer: 'يوسف العويد الثاني',
    status: 'partial'
  },
  {
    id: '41',
    name: 'ناصر الملحاء',
    collected: 300,
    target: 9600,
    donors: 1,
    transactions: 1,
    marketer: 'ناصر الملحاء',
    status: 'partial'
  }
];

export function calculateDashboardStats(projects: Project[]) {
  const totalCollected = projects.reduce((sum, p) => sum + p.collected, 0);
  const totalTarget = projects.reduce((sum, p) => sum + p.target, 0);
  const totalDonors = projects.reduce((sum, p) => sum + p.donors, 0);
  const totalTransactions = projects.reduce((sum, p) => sum + p.transactions, 0);
  const zeroProjects = projects.filter(p => p.status === 'zero').length;
  const completeProjects = projects.filter(p => p.status === 'complete').length;
  const halaqa = Math.floor(totalCollected / 9600);

  return {
    totalCollected,
    totalTarget,
    totalDonors,
    totalTransactions,
    projectCount: projects.length,
    zeroProjects,
    completeProjects,
    halaqa
  };
}

export function getMarketerStats(projects: Project[]): MarketerStats[] {
  const marketerMap = new Map<string, MarketerStats>();

  projects.forEach(project => {
    const existing = marketerMap.get(project.marketer) || {
      name: project.marketer,
      projects: 0,
      collected: 0,
      target: 0
    };

    marketerMap.set(project.marketer, {
      ...existing,
      projects: existing.projects + 1,
      collected: existing.collected + project.collected,
      target: existing.target + project.target
    });
  });

  return Array.from(marketerMap.values()).sort((a, b) => b.collected - a.collected);
}
