import { useState } from 'react';
import { PosyanduHeader } from './PosyanduHeader';
import { PosyanduSidebar } from './PosyanduSidebar';
import { LoginPage } from './LoginPage';
import { Dashboard } from './Dashboard';
import { ChildrenManagement } from './ChildrenManagement';
import { UserManagement } from './UserManagement';
import { ImmunizationPage } from './ImmunizationPage';
import { GrowthMonitoring } from './GrowthMonitoring';
import { MedicalCheckupPage } from './MedicalCheckupPage';
import { ChildHistoryPage } from './ChildHistoryPage';
import { ReportsPage } from './ReportsPage';
import { BackupPage } from './BackupPage';
import { Search, Plus, Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface User {
  name: string;
  username: string;
  role: string;
}

// Komponen untuk Halaman Jadwal Posyandu
const SchedulePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    date: '',
    time: '',
    location: '',
    description: '',
    activities: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Menyimpan jadwal posyandu baru:', newSchedule);
    setNewSchedule({
      date: '',
      time: '',
      location: '',
      description: '',
      activities: ''
    });
    setShowAddForm(false);
  };
  
  const schedules = [
    {
      id: 1,
      date: '2024-02-15',
      time: '08:00 - 12:00',
      location: 'Balai Desa Sukamaju',
      description: 'Posyandu Rutin Bulanan',
      activities: ['Pemeriksaan Balita', 'Imunisasi', 'Pemberian Vitamin A'],
      status: 'Upcoming'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '08:00 - 12:00',
      location: 'Balai Desa Sukamaju',
      description: 'Posyandu Rutin Bulanan',
      activities: ['Pemeriksaan Balita', 'Imunisasi', 'Pemberian Makanan Tambahan'],
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-02-25',
      time: '09:00 - 13:00',
      location: 'Puskesmas Harapan Jaya',
      description: 'Posyandu Khusus Imunisasi',
      activities: ['Imunisasi Campak', 'Konsultasi Kesehatan Balita'],
      status: 'Upcoming'
    }
  ];

  const filteredSchedules = schedules.filter(schedule =>
    schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Jadwal Posyandu</h2>
          <p className="text-muted-foreground">
            Kelola jadwal kegiatan posyandu
          </p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-button">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Jadwal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Jadwal Posyandu</DialogTitle>
              <DialogDescription>
                Buat jadwal kegiatan posyandu baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Tanggal
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                  value={newSchedule.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Waktu
                </Label>
                <Input
                  id="time"
                  placeholder="08:00 - 12:00"
                  className="col-span-3"
                  value={newSchedule.time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Lokasi
                </Label>
                <Input
                  id="location"
                  placeholder="Balai Desa Sukamaju"
                  className="col-span-3"
                  value={newSchedule.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Deskripsi
                </Label>
                <Input
                  id="description"
                  placeholder="Posyandu Rutin Bulanan"
                  className="col-span-3"
                  value={newSchedule.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="activities" className="text-right">
                  Kegiatan
                </Label>
                <Textarea
                  id="activities"
                  placeholder="Pemeriksaan Balita, Imunisasi, dll (pisahkan dengan koma)"
                  className="col-span-3"
                  value={newSchedule.activities}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Batal</Button>
              <Button onClick={handleSubmit}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Jadwal Bulan Ini</p>
                <p className="text-lg font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Jadwal Mendatang</p>
                <p className="text-lg font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Selesai</p>
                <p className="text-lg font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Partisipasi</p>
                <p className="text-lg font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Cari Jadwal</CardTitle>
          <CardDescription>
            Cari jadwal posyandu berdasarkan deskripsi atau lokasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari deskripsi atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Daftar Jadwal Posyandu</CardTitle>
          <CardDescription>
            Total {filteredSchedules.length} jadwal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Kegiatan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{formatDate(schedule.date)}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {schedule.location}
                      </div>
                    </TableCell>
                    <TableCell>{schedule.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {schedule.activities.map((activity, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          schedule.status === 'Completed' ? 'default' : 'secondary'
                        }
                      >
                        {schedule.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const PosyanduApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (username: string, password: string) => {
    // Simple authentication logic - in real app, this would be handled by backend
    if (username === 'admin' && password === 'admin') {
      setCurrentUser({
        name: 'Dr. Ahmad Sutrisno',
        role: 'Administrator',
        username: 'admin'
      });
      setIsAuthenticated(true);
    } else {
      // For demo purposes, accept any credentials
      setCurrentUser({
        name: 'Petugas Posyandu',
        role: 'Petugas',
        username: username
      });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'children':
        return <ChildrenManagement />;
      case 'users':
        return <UserManagement />;
      case 'immunization':
        return <ImmunizationPage />;
      case 'growth':
        return <GrowthMonitoring />;
      case 'checkup':
        return <MedicalCheckupPage />;
      case 'childHistory':
        return <ChildHistoryPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'reports':
        return <ReportsPage />;
      case 'backup':
        return <BackupPage />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <PosyanduHeader 
        user={currentUser} 
        onLogout={handleLogout} 
        onSidebarToggle={handleSidebarToggle}
      />
      <div className="flex">
        <PosyanduSidebar 
          isOpen={sidebarOpen} 
          activeItem={activeView} 
          onItemClick={setActiveView} 
        />
        <main className={`flex-1 p-6 ${sidebarOpen ? 'ml-64' : 'ml-16'} mt-16 transition-all duration-300`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};