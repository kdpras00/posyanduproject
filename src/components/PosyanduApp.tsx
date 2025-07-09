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
  const [editMode, setEditMode] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
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
    console.log(editMode ? 'Memperbarui jadwal posyandu:' : 'Menyimpan jadwal posyandu baru:', newSchedule);
    setNewSchedule({
      date: '',
      time: '',
      location: '',
      description: '',
      activities: ''
    });
    setShowAddForm(false);
    setEditMode(false);
    setSelectedScheduleId(null);
  };
  
  const handleEdit = (schedule: any) => {
    setEditMode(true);
    setSelectedScheduleId(schedule.id);
    
    // Convert activities array to string for form
    const activitiesStr = Array.isArray(schedule.activities) 
      ? schedule.activities.join(', ')
      : schedule.activities;
      
    setNewSchedule({
      date: schedule.date,
      time: schedule.time,
      location: schedule.location,
      description: schedule.description,
      activities: activitiesStr
    });
    
    setShowAddForm(true);
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
        <Dialog open={showAddForm} onOpenChange={(open) => {
          setShowAddForm(open);
          if (!open) {
            setEditMode(false);
            setSelectedScheduleId(null);
            setNewSchedule({
              date: '',
              time: '',
              location: '',
              description: '',
              activities: ''
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-button">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Jadwal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Jadwal Posyandu' : 'Tambah Jadwal Posyandu'}</DialogTitle>
              <DialogDescription>
                {editMode ? 'Edit jadwal kegiatan posyandu' : 'Buat jadwal kegiatan posyandu baru'}
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
              <Button variant="outline" onClick={() => {
                setShowAddForm(false);
                setEditMode(false);
                setSelectedScheduleId(null);
                setNewSchedule({
                  date: '',
                  time: '',
                  location: '',
                  description: '',
                  activities: ''
                });
              }}>Batal</Button>
              <Button onClick={handleSubmit}>{editMode ? 'Simpan Perubahan' : 'Simpan'}</Button>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(schedule)}
                        >
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
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Kader'
  });

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

  const handleRegister = (data: typeof registrationData) => {
    // Validasi data registrasi
    if (data.password !== data.confirmPassword) {
      alert('Password dan konfirmasi password tidak sama');
      return;
    }
    
    if (!data.name || !data.username || !data.password) {
      alert('Semua data harus diisi');
      return;
    }
    
    // Simpan data registrasi (dalam aplikasi nyata akan dikirim ke server)
    console.log('Data registrasi berhasil disimpan:', data);
    alert('Registrasi berhasil! Silakan login dengan akun baru Anda.');
    setShowRegistrationForm(false);
    
    // Reset form data
    setRegistrationData({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: 'Kader'
    });
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
    if (showRegistrationForm) {
      return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Registrasi Pengguna Baru
              </CardTitle>
              <CardDescription>
                Silakan isi data untuk membuat akun baru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                handleRegister(registrationData);
              }}>
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nama Lengkap</Label>
                  <Input
                    id="reg-name"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Username</Label>
                  <Input
                    id="reg-username"
                    value={registrationData.username}
                    onChange={(e) => setRegistrationData({...registrationData, username: e.target.value})}
                    placeholder="Masukkan username"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={registrationData.password}
                    onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})}
                    placeholder="Masukkan password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-confirm-password">Konfirmasi Password</Label>
                  <Input
                    id="reg-confirm-password"
                    type="password"
                    value={registrationData.confirmPassword}
                    onChange={(e) => setRegistrationData({...registrationData, confirmPassword: e.target.value})}
                    placeholder="Konfirmasi password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-role">Peran</Label>
                  <Select 
                    value={registrationData.role} 
                    onValueChange={(value) => setRegistrationData({...registrationData, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih peran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kader">Kader</SelectItem>
                      <SelectItem value="Wali">Wali Balita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Daftar
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowRegistrationForm(false)}>
                    Kembali ke Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onRegisterClick={() => setShowRegistrationForm(true)}
      />
    );
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