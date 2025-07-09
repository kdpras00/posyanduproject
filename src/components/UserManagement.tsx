import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  status: 'Aktif' | 'Tidak Aktif';
  lastLogin: string;
}

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
    role: ''
  });

  const users: User[] = [
    {
      id: 1,
      name: 'Dr. Ahmad Sutrisno',
      username: 'admin',
      role: 'Administrator',
      status: 'Aktif',
      lastLogin: '2024-01-15 08:30'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      username: 'budi',
      role: 'Kader',
      status: 'Aktif',
      lastLogin: '2024-01-14 10:15'
    },
    {
      id: 3,
      name: 'Siti Aminah',
      username: 'siti',
      role: 'Petugas',
      status: 'Aktif',
      lastLogin: '2024-01-13 09:45'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setNewUser(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleSubmit = () => {
    // Logika untuk menyimpan pengguna baru
    console.log(editMode ? 'Memperbarui pengguna:' : 'Menyimpan pengguna baru:', newUser);
    // Reset form dan tutup dialog
    setNewUser({
      name: '',
      username: '',
      password: '',
      role: ''
    });
    setShowUserForm(false);
    setEditMode(false);
  };

  const handleEdit = (user: User) => {
    setEditMode(true);
    setNewUser({
      name: user.name,
      username: user.username,
      password: '',  // Password tidak ditampilkan untuk keamanan
      role: user.role
    });
    setShowUserForm(true);
  };

  const handleDelete = (userId: number) => {
    console.log('Menghapus pengguna dengan ID:', userId);
    // Logika untuk menghapus pengguna
    // Dalam aplikasi nyata, ini akan memanggil API untuk menghapus data dari database
    
    // Simulasi penghapusan dengan memperbarui UI
    alert(`Pengguna dengan ID ${userId} berhasil dihapus`);
  };
  
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Kelola Akun</h2>
          <p className="text-muted-foreground">
            Kelola data pengguna sistem posyandu
          </p>
        </div>
        <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-button">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</DialogTitle>
              <DialogDescription>
                {editMode ? 'Edit data pengguna' : 'Silakan isi data pengguna baru berikut ini'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama
                </Label>
                <Input
                  id="name"
                  placeholder="Nama lengkap"
                  className="col-span-3"
                  value={newUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  className="col-span-3"
                  value={newUser.username}
                  onChange={handleInputChange}
                  disabled={editMode}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={editMode ? "Kosongkan jika tidak ingin mengubah" : "Password"}
                  className="col-span-3"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Peran
                </Label>
                <Select value={newUser.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Petugas">Petugas</SelectItem>
                    <SelectItem value="Kader">Kader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowUserForm(false);
                setEditMode(false);
                setNewUser({
                  name: '',
                  username: '',
                  password: '',
                  role: ''
                });
              }}>Batal</Button>
              <Button onClick={handleSubmit}>{editMode ? 'Simpan Perubahan' : 'Simpan'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Pencarian Pengguna</CardTitle>
          <CardDescription>
            Cari berdasarkan nama, username, atau peran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau username..."
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

      {/* Users Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Daftar Pengguna</CardTitle>
          <CardDescription>
            Total {filteredUsers.length} pengguna terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Administrator' ? 'secondary' : 'default'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Aktif' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(user.id)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detail Pengguna</DialogTitle>
            <DialogDescription>
              Informasi detail pengguna
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium text-muted-foreground">Nama Lengkap:</p>
                <p className="col-span-2">{selectedUser.name}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium text-muted-foreground">Username:</p>
                <p className="col-span-2">{selectedUser.username}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium text-muted-foreground">Peran:</p>
                <p className="col-span-2">
                  <Badge variant={selectedUser.role === 'Administrator' ? 'secondary' : 'default'}>
                    {selectedUser.role}
                  </Badge>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium text-muted-foreground">Status:</p>
                <p className="col-span-2">
                  <Badge variant={selectedUser.status === 'Aktif' ? 'default' : 'secondary'}>
                    {selectedUser.status}
                  </Badge>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p className="font-medium text-muted-foreground">Login Terakhir:</p>
                <p className="col-span-2">{selectedUser.lastLogin}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowUserDetails(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement; 