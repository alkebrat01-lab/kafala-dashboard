import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Project, MarketerStats } from '@/lib/mockData';

interface ChartSectionProps {
  projects: Project[];
  marketerStats: MarketerStats[];
}

export default function ChartSection({ projects, marketerStats }: ChartSectionProps) {
  // Status distribution data
  const statusData = [
    {
      name: 'مكتمل',
      value: projects.filter(p => p.status === 'complete').length,
      color: '#10B981'
    },
    {
      name: 'جزئي',
      value: projects.filter(p => p.status === 'partial').length,
      color: '#F59E0B'
    },
    {
      name: 'بدون تبرعات',
      value: projects.filter(p => p.status === 'zero').length,
      color: '#EF4444'
    }
  ];

  // Top marketers data
  const topMarketers = marketerStats.slice(0, 5).map(m => ({
    name: m.name,
    collected: m.collected,
    target: m.target
  }));

  const COLORS = ['#1B5E4D', '#C9A961', '#2D7A66', '#D4B896', '#0F3D32'];

  return (
    <div className="space-y-8">
      {/* Status Distribution */}
      <div className="stat-card">
        <h3 className="text-xl font-bold text-foreground mb-6">توزيع حالة المشاريع</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} مشروع`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Marketers */}
      {topMarketers.length > 0 && (
        <div className="stat-card">
          <h3 className="text-xl font-bold text-foreground mb-6">أفضل المسوقين</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topMarketers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip formatter={(value) => `${value.toLocaleString('ar-SA')} ريال`} />
              <Legend />
              <Bar dataKey="collected" fill="#1B5E4D" name="المبلغ المجموع" />
              <Bar dataKey="target" fill="#C9A961" name="الهدف" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
