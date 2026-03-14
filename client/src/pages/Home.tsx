import { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import StatCard from '@/components/StatCard';
import ProjectCard from '@/components/ProjectCard';
import MarketerCard from '@/components/MarketerCard';
import ChartSection from '@/components/ChartSection';
import { BookOpen, Users, TrendingUp, Target, CheckCircle, AlertCircle, DollarSign, BarChart3, Download, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

/**
 * Kafala 200 Halaqa Campaign Dashboard
 * 
 * Design Philosophy:
 * - Green (#1B5E4D) and Gold (#C9A961) color scheme representing Islamic values and prosperity
 * - Clean, professional layout with clear information hierarchy
 * - Arabic-first design with RTL support
 * - Interactive cards with hover effects and smooth transitions
 * - Data-driven visualizations showing campaign progress
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'marketers' | 'teams'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [projectFilter, setProjectFilter] = useState('');
  const [marketerFilter, setMarketerFilter] = useState('');
  
  // سحب البيانات من جوجل شيت عبر API
  const { data: kafalaData, isLoading: isLoadingData, refetch } = trpc.kafala.getProjects.useQuery();
  
  const projects = kafalaData?.projects || [];
  const stats = kafalaData?.stats || {
    totalCollected: 0,
    totalTarget: 0,
    totalDonors: 0,
    totalTransactions: 0,
    projectCount: 0,
    zeroProjects: 0,
    completeProjects: 0,
    halaqa: 0,
    progressPercentage: 0,
    campaignTarget: 1000000
  };
  const marketerStats = kafalaData?.marketers || [];
  const teamStats = kafalaData?.teams || [];

  // فلترة البيانات
  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.name.includes(projectFilter) || p.marketer.includes(projectFilter)
    );
  }, [projects, projectFilter]);

  const filteredMarketers = useMemo(() => {
    return marketerStats.filter(m => m.name.includes(marketerFilter));
  }, [marketerStats, marketerFilter]);

  // بيانات الرسم البياني الدائري
  const pieData = [
    { name: 'مكتملة', value: stats.completeProjects, color: '#1B5E4D' },
    { name: 'جزئية', value: stats.projectCount - stats.completeProjects - stats.zeroProjects, color: '#C9A961' },
    { name: 'بدون تبرعات', value: stats.zeroProjects, color: '#E5E7EB' }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      setLastUpdated(new Date());
      toast.success('تم تحديث البيانات بنجاح ✓', {
        description: `آخر تحديث: ${new Date().toLocaleTimeString('ar-SA')}`,
        duration: 4000,
        position: 'top-right'
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('حدث خطأ أثناء تحديث البيانات', {
        description: 'يرجى المحاولة مرة أخرى',
        duration: 4000,
        position: 'top-right'
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-primary to-primary/90 text-white py-8 shadow-lg">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.webp" 
                alt="شعار حملة المبنى الاستثماري"
                className="h-20 w-auto object-contain"
              />
              <div>
                <h1 className="text-4xl font-bold text-yellow-400">داش بورد حملة المبنى الاستثماري</h1>
                <p className="text-white/80 mt-1">جمعية حفاظ القرآن الكريم بالرياض</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'projects'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            المشاريع
          </button>
          <button
            onClick={() => setActiveTab('marketers')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'marketers'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            المسوقون
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'teams'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            🏆 الفرق
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex gap-4 justify-end items-center">
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isRefreshing ? 'جاري التحديث...' : 'تحديث البيانات'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <Download className="w-4 h-4" />
                تحميل التقرير
              </button>
            </div>
            
            {/* Last Updated Info */}
            <div className="text-sm text-muted-foreground text-right">
              آخر تحديث: {lastUpdated.toLocaleString('ar-SA', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            {/* Key Statistics */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">الإحصائيات الرئيسية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  label="إجمالي المبلغ المجموع"
                  value={`${stats.totalCollected.toLocaleString('ar-SA')} ريال`}
                  icon={<DollarSign />}
                  variant="success"
                />
                <StatCard
                  label="عدد الأسهم التي تمت تغطيتها"
                  value={stats.halaqa}
                  icon={<BookOpen />}
                  variant="default"
                  subtext={`السهم = 5,000 ريال`}
                />
                <StatCard
                  label="عدد المتبرعين"
                  value={stats.totalDonors}
                  icon={<Users />}
                  variant="default"
                />
                <StatCard
                  label="عدد عمليات التبرع"
                  value={stats.totalTransactions}
                  icon={<TrendingUp />}
                  variant="default"
                />
              </div>
            </div>

            {/* Project Statistics */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">حالة المشاريع</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  label="إجمالي المشاريع"
                  value={stats.projectCount}
                  icon={<Target />}
                  variant="default"
                />
                <StatCard
                  label="المشاريع المكتملة"
                  value={stats.completeProjects}
                  icon={<CheckCircle />}
                  variant="success"
                />
                <StatCard
                  label="المشاريع بدون تبرعات"
                  value={stats.zeroProjects}
                  icon={<AlertCircle />}
                  variant="danger"
                />
              </div>
            </div>

            {/* Campaign Progress */}
            <div className="stat-card">
              <h3 className="text-xl font-bold text-foreground mb-4">تقدم الحملة</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">الهدف المالي</span>
                    <span className="text-sm text-muted-foreground">
                      {stats.totalCollected.toLocaleString('ar-SA')} من {stats.campaignTarget.toLocaleString('ar-SA')} ريال
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${Math.min((stats.totalCollected / stats.campaignTarget) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {((stats.totalCollected / stats.campaignTarget) * 100).toFixed(2)}% من الهدف
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex gap-6 mt-6 justify-center flex-wrap">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <ChartSection projects={projects} marketerStats={marketerStats} />
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">تفاصيل المشاريع</h2>
              <div className="relative">
                <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث عن مشروع..."
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                لم يتم العثور على مشاريع
              </div>
            )}
          </div>
        )}

        {/* Marketers Tab */}
        {activeTab === 'marketers' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">أداء المسوقين</h2>
              <div className="relative">
                <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث عن مسوق..."
                  value={marketerFilter}
                  onChange={(e) => setMarketerFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarketers.map(marketer => (
                <MarketerCard key={marketer.name} marketer={marketer} />
              ))}
            </div>
            {filteredMarketers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                لم يتم العثور على مسوقين
              </div>
            )}
          </div>
        )}
        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground">إنتاجية الفرق</h2>

            {/* Leaderboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamStats.map((team, idx) => {
                const campaignTarget = 1000000;
                const percentage = Math.min((team.collected / campaignTarget) * 100, 100);
                const isFirst = idx === 0;
                return (
                  <div
                    key={team.name}
                    className={`stat-card border-2 ${isFirst ? 'border-yellow-400 bg-yellow-50/30' : 'border-border'} hover:shadow-lg transition-all duration-300`}
                  >
                    {/* Team Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{isFirst ? '🥇' : '🥈'}</span>
                        <h3 className="text-lg font-bold text-foreground">{team.name || 'غير محدد'}</h3>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isFirst ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                        المركز {idx + 1}
                      </span>
                    </div>

                    {/* Progress toward campaign target */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">التقدم نحو الهدف الكلي</span>
                        <span className="text-sm font-bold text-primary">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="bg-primary/5 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-primary">{team.collected.toLocaleString('ar-SA')}</p>
                        <p className="text-xs text-muted-foreground mt-1">ريال مجموع</p>
                      </div>
                      <div className="bg-secondary/10 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-secondary">{team.shares}</p>
                        <p className="text-xs text-muted-foreground mt-1">سهم مغطى</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-foreground">{team.projects}</p>
                        <p className="text-xs text-muted-foreground mt-1">مشروع</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison Bar */}
            {teamStats.length === 2 && (
              <div className="stat-card">
                <h3 className="text-xl font-bold text-foreground mb-6">مقارنة الفرق</h3>
                <div className="space-y-4">
                  {teamStats.map((team, idx) => {
                    const total = teamStats.reduce((s, t) => s + t.collected, 0);
                    const share = total > 0 ? (team.collected / total) * 100 : 0;
                    return (
                      <div key={team.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{team.name || 'غير محدد'}</span>
                          <span className="text-sm font-bold text-primary">{share.toFixed(1)}% من إجمالي التبرعات</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-4">
                          <div
                            className="h-4 rounded-full transition-all duration-500"
                            style={{
                              width: `${share}%`,
                              backgroundColor: idx === 0 ? '#1B5E4D' : '#C9A961'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {teamStats.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">لا توجد بيانات فرق بعد</p>
                <p className="text-sm mt-2">تأكد من إضافة عمود الفريق (العمود G) في جوجل شيت</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
