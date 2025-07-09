import { Baby, Calendar, Shield, Users, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Dashboard = () => {
  const stats = [
    {
      title: 'Total Balita',
      value: '247',
      change: '+12%',
      icon: <Baby className="h-5 w-5" />,
      color: 'text-primary'
    },
    {
      title: 'Imunisasi Bulan Ini',
      value: '89',
      change: '+8%',
      icon: <Shield className="h-5 w-5" />,
      color: 'text-health-success'
    },
    {
      title: 'Pemeriksaan Hari Ini',
      value: '24',
      change: '+15%',
      icon: <Activity className="h-5 w-5" />,
      color: 'text-health-warning'
    },
    {
      title: 'Jadwal Mendatang',
      value: '156',
      change: '+3%',
      icon: <Calendar className="h-5 w-5" />,
      color: 'text-health-info'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Imunisasi',
      child: 'Andi Pratama',
      time: '2 jam yang lalu',
      status: 'Selesai'
    },
    {
      id: 2,
      type: 'Pemeriksaan',
      child: 'Siti Nurhaliza',
      time: '3 jam yang lalu',
      status: 'Selesai'
    },
    {
      id: 3,
      type: 'Registrasi',
      child: 'Budi Santoso',
      time: '5 jam yang lalu',
      status: 'Baru'
    }
  ];

  const upcomingSchedule = [
    {
      id: 1,
      time: '09:00',
      activity: 'Imunisasi DPT',
      child: 'Maya Sari',
      status: 'Terjadwal'
    },
    {
      id: 2,
      time: '10:30',
      activity: 'Pemeriksaan Rutin',
      child: 'Rizky Pratama',
      status: 'Terjadwal'
    },
    {
      id: 3,
      time: '14:00',
      activity: 'Konsultasi Gizi',
      child: 'Indah Permata',
      status: 'Terjadwal'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat datang di Sistem Informasi Posyandu Sehat
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-soft transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.color} p-2 bg-muted/50 rounded-full`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-health-success flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Aktivitas Terkini</CardTitle>
            <CardDescription>
              Aktivitas posyandu dalam 24 jam terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {activity.type} - {activity.child}
                      </p>
                      <span className="text-xs text-health-success bg-health-success/10 px-2 py-1 rounded">
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Jadwal Hari Ini</CardTitle>
            <CardDescription>
              Jadwal kegiatan posyandu hari ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedule.map((schedule) => (
                <div key={schedule.id} className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-primary w-16">
                    {schedule.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {schedule.activity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {schedule.child}
                    </p>
                  </div>
                  <span className="text-xs text-health-warning bg-health-warning/10 px-2 py-1 rounded">
                    {schedule.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Aksi Cepat</CardTitle>
          <CardDescription>
            Akses cepat ke fitur yang sering digunakan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-card rounded-lg border border-border hover:shadow-soft transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Registrasi Balita</h3>
                  <p className="text-sm text-muted-foreground">Daftarkan balita baru</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-card rounded-lg border border-border hover:shadow-soft transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-health-success/10 rounded-full">
                  <Shield className="h-5 w-5 text-health-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Jadwal Imunisasi</h3>
                  <p className="text-sm text-muted-foreground">Kelola jadwal imunisasi</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-card rounded-lg border border-border hover:shadow-soft transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-health-warning/10 rounded-full">
                  <Activity className="h-5 w-5 text-health-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pemeriksaan</h3>
                  <p className="text-sm text-muted-foreground">Catat hasil pemeriksaan</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};