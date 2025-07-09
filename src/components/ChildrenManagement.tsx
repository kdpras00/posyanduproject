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
import { useNavigate } from 'react-router-dom';

interface Child {
  id: number;
  name: string;
  birthDate: string;
  gender: 'L' | 'P';
  motherName: string;
  fatherName: string;
  address: string;
  lastCheckup: string;
  status: 'Aktif' | 'Tidak Aktif';
}

export const ChildrenManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    birthDate: '',
    gender: '',
    motherName: '',
    fatherName: '',
    address: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewChild(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleGenderChange = (value: string) => {
    setNewChild(prev => ({
      ...prev,
      gender: value
    }));
  };
  
  const handleSubmit = () => {
    // Logika untuk menyimpan balita baru
    console.log('Menyimpan balita baru:', newChild);
    // Reset form dan tutup dialog
    setNewChild({
      name: '',
      birthDate: '',
      gender: '',
      motherName: '',
      fatherName: '',
      address: ''
    });
    setShowAddForm(false);
  };

  const children: Child[] = [
    {
      id: 1,
      name: 'Andi Pratama',
      birthDate: '2022-03-15',
      gender: 'L',
      motherName: 'Siti Aminah',
      fatherName: 'Budi Pratama',
      address: 'Jl. Mawar No. 123',
      lastCheckup: '2024-01-10',
      status: 'Aktif'
    },
    {
      id: 2,
      name: 'Sari Indah',
      birthDate: '2021-11-20',
      gender: 'P',
      motherName: 'Dewi Sartika',
      fatherName: 'Ahmad Yani',
      address: 'Jl. Melati No. 456',
      lastCheckup: '2024-01-08',
      status: 'Aktif'
    },
    {
      id: 3,
      name: 'Rizki Maulana',
      birthDate: '2023-01-10',
      gender: 'L',
      motherName: 'Ratna Sari',
      fatherName: 'Hendro Utomo',
      address: 'Jl. Kenanga No. 789',
      lastCheckup: '2024-01-05',
      status: 'Aktif'
    }
  ];

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.fatherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    return months;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Data Balita</h2>
          <p className="text-muted-foreground">
            Kelola data balita di posyandu
          </p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-button">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Balita
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Registrasi Balita Baru</DialogTitle>
              <DialogDescription>
                Silakan isi data balita baru berikut ini
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama Balita
                </Label>
                <Input
                  id="name"
                  placeholder="Nama lengkap balita"
                  className="col-span-3"
                  value={newChild.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthDate" className="text-right">
                  Tanggal Lahir
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  className="col-span-3"
                  value={newChild.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Jenis Kelamin
                </Label>
                <Select value={newChild.gender} onValueChange={handleGenderChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="motherName" className="text-right">
                  Nama Ibu
                </Label>
                <Input
                  id="motherName"
                  placeholder="Nama ibu"
                  className="col-span-3"
                  value={newChild.motherName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fatherName" className="text-right">
                  Nama Ayah
                </Label>
                <Input
                  id="fatherName"
                  placeholder="Nama ayah"
                  className="col-span-3"
                  value={newChild.fatherName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Alamat
                </Label>
                <Input
                  id="address"
                  placeholder="Alamat lengkap"
                  className="col-span-3"
                  value={newChild.address}
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

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Pencarian Data</CardTitle>
          <CardDescription>
            Cari berdasarkan nama balita, nama ibu, atau nama ayah
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama balita, ibu, atau ayah..."
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

      {/* Children Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Daftar Balita</CardTitle>
          <CardDescription>
            Total {filteredChildren.length} balita terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Balita</TableHead>
                  <TableHead>Usia</TableHead>
                  <TableHead>Jenis Kelamin</TableHead>
                  <TableHead>Nama Ibu</TableHead>
                  <TableHead>Nama Ayah</TableHead>
                  <TableHead>Pemeriksaan Terakhir</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChildren.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell className="font-medium">{child.name}</TableCell>
                    <TableCell>{calculateAge(child.birthDate)} bulan</TableCell>
                    <TableCell>
                      <Badge variant={child.gender === 'L' ? 'default' : 'secondary'}>
                        {child.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </Badge>
                    </TableCell>
                    <TableCell>{child.motherName}</TableCell>
                    <TableCell>{child.fatherName}</TableCell>
                    <TableCell>{formatDate(child.lastCheckup)}</TableCell>
                    <TableCell>
                      <Badge variant={child.status === 'Aktif' ? 'default' : 'secondary'}>
                        {child.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedChild(child)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
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

      {/* Child Details Modal */}
      {selectedChild && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Detail Balita</CardTitle>
            <CardDescription>
              Informasi lengkap balita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Informasi Dasar</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nama:</span>
                    <span className="font-medium">{selectedChild.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Lahir:</span>
                    <span className="font-medium">{formatDate(selectedChild.birthDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usia:</span>
                    <span className="font-medium">{calculateAge(selectedChild.birthDate)} bulan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jenis Kelamin:</span>
                    <span className="font-medium">
                      {selectedChild.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Informasi Orang Tua</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nama Ibu:</span>
                    <span className="font-medium">{selectedChild.motherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nama Ayah:</span>
                    <span className="font-medium">{selectedChild.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alamat:</span>
                    <span className="font-medium">{selectedChild.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={selectedChild.status === 'Aktif' ? 'default' : 'secondary'}>
                      {selectedChild.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedChild(null)}>Tutup</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChildrenManagement;