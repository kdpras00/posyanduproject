import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2, Stethoscope, Calendar, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface CheckupRecord {
  id: number;
  childName: string;
  date: string;
  type: string;
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  followUp?: string;
}

export const MedicalCheckupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [newCheckup, setNewCheckup] = useState({
    childName: '',
    date: '',
    type: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    followUp: '',
    referral: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewCheckup(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewCheckup(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log(editMode ? 'Memperbarui data pemeriksaan:' : 'Menyimpan data pemeriksaan baru:', newCheckup);
    setNewCheckup({
      childName: '',
      date: '',
      type: '',
      symptoms: '',
      diagnosis: '',
      treatment: '',
      followUp: '',
      referral: '',
      notes: ''
    });
    setShowAddForm(false);
    setEditMode(false);
    setSelectedRecordId(null);
  };

  const handleEdit = (record: CheckupRecord) => {
    setEditMode(true);
    setSelectedRecordId(record.id);
    setNewCheckup({
      childName: record.childName,
      date: record.date,
      type: record.type,
      symptoms: record.symptoms || '',
      diagnosis: record.diagnosis || '',
      treatment: record.treatment || '',
      followUp: record.followUp || '',
      referral: '',
      notes: record.notes || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (recordId: number) => {
    console.log('Menghapus data pemeriksaan dengan ID:', recordId);
    // Logika untuk menghapus data pemeriksaan
    // Dalam aplikasi nyata, ini akan memanggil API untuk menghapus data dari database
    
    // Simulasi penghapusan dengan memperbarui UI
    alert(`Data pemeriksaan dengan ID ${recordId} berhasil dihapus`);
  };

  const checkupRecords: CheckupRecord[] = [
    {
      id: 1,
      childName: 'Andi Pratama',
      date: '2024-01-10',
      type: 'Rutin',
      symptoms: 'Batuk ringan',
      diagnosis: 'ISPA Ringan',
      treatment: 'Sirup OBH',
      notes: 'Kondisi umum baik',
      followUp: '2024-02-10'
    },
    {
      id: 2,
      childName: 'Siti Nurhaliza',
      date: '2024-01-15',
      type: 'Imunisasi',
      diagnosis: 'Sehat',
      treatment: 'Vitamin A',
      notes: 'Pemberian vitamin A rutin'
    },
    {
      id: 3,
      childName: 'Budi Santoso',
      date: '2024-01-05',
      type: 'Sakit',
      symptoms: 'Demam, batuk',
      diagnosis: 'Demam common cold',
      treatment: 'Parasetamol sirup, OBH',
      notes: 'Perlu istirahat yang cukup',
      followUp: '2024-01-12'
    }
  ];

  const filteredRecords = checkupRecords.filter(record => {
    let matchesSearch = record.childName.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesChild = !selectedChild || record.childName === selectedChild;
    let matchesType = !selectedType || record.type === selectedType;
    
    return matchesSearch && matchesChild && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Pemeriksaan Kesehatan</h2>
        <p className="text-muted-foreground">
          Kelola data pemeriksaan kesehatan balita
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Pemeriksaan</p>
                <p className="text-lg font-bold">324</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Bulan Ini</p>
                <p className="text-lg font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Rujukan</p>
                <p className="text-lg font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Plus className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Tindak Lanjut</p>
                <p className="text-lg font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Pencarian Data</CardTitle>
          <CardDescription>
            Cari dan filter data pemeriksaan kesehatan balita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama balita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih balita" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Andi Pratama">Andi Pratama</SelectItem>
                  <SelectItem value="Siti Nurhaliza">Siti Nurhaliza</SelectItem>
                  <SelectItem value="Budi Santoso">Budi Santoso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Jenis pemeriksaan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rutin">Pemeriksaan Rutin</SelectItem>
                  <SelectItem value="Sakit">Pemeriksaan Sakit</SelectItem>
                  <SelectItem value="Imunisasi">Imunisasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="mr-2" onClick={() => {
              setSearchTerm('');
              setSelectedChild('');
              setSelectedType('');
            }}>
              Reset
            </Button>
            <Dialog open={showAddForm} onOpenChange={(open) => {
              setShowAddForm(open);
              if (!open) {
                setEditMode(false);
                setSelectedRecordId(null);
                setNewCheckup({
                  childName: '',
                  date: '',
                  type: '',
                  symptoms: '',
                  diagnosis: '',
                  treatment: '',
                  followUp: '',
                  referral: '',
                  notes: ''
                });
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pemeriksaan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editMode ? 'Edit Data Pemeriksaan' : 'Tambah Data Pemeriksaan'}</DialogTitle>
                  <DialogDescription>
                    {editMode ? 'Edit data pemeriksaan kesehatan balita' : 'Catat data pemeriksaan kesehatan balita baru'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="childName" className="text-right">
                      Nama Balita
                    </Label>
                    <Select
                      value={newCheckup.childName}
                      onValueChange={(value) => handleSelectChange('childName', value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih balita" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Andi Pratama">Andi Pratama</SelectItem>
                        <SelectItem value="Siti Nurhaliza">Siti Nurhaliza</SelectItem>
                        <SelectItem value="Budi Santoso">Budi Santoso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Tanggal Pemeriksaan
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      className="col-span-3"
                      value={newCheckup.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Jenis Pemeriksaan
                    </Label>
                    <Select
                      value={newCheckup.type}
                      onValueChange={(value) => handleSelectChange('type', value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih jenis pemeriksaan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rutin">Pemeriksaan Rutin</SelectItem>
                        <SelectItem value="Sakit">Pemeriksaan Sakit</SelectItem>
                        <SelectItem value="Imunisasi">Imunisasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="symptoms" className="text-right">
                      Keluhan / Gejala
                    </Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Masukkan keluhan atau gejala"
                      className="col-span-3"
                      value={newCheckup.symptoms}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="diagnosis" className="text-right">
                      Diagnosis
                    </Label>
                    <Textarea
                      id="diagnosis"
                      placeholder="Masukkan diagnosis"
                      className="col-span-3"
                      value={newCheckup.diagnosis}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="treatment" className="text-right">
                      Tindakan / Pengobatan
                    </Label>
                    <Textarea
                      id="treatment"
                      placeholder="Masukkan tindakan atau pengobatan"
                      className="col-span-3"
                      value={newCheckup.treatment}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="followUp" className="text-right">
                      Tanggal Kontrol
                    </Label>
                    <Input
                      id="followUp"
                      type="date"
                      className="col-span-3"
                      value={newCheckup.followUp}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="referral" className="text-right">
                      Rujukan
                    </Label>
                    <Select
                      value={newCheckup.referral}
                      onValueChange={(value) => handleSelectChange('referral', value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih jika perlu rujukan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tidak Perlu">Tidak Perlu Rujukan</SelectItem>
                        <SelectItem value="Puskesmas">Puskesmas</SelectItem>
                        <SelectItem value="Rumah Sakit">Rumah Sakit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Catatan Tambahan
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Tambahkan catatan jika diperlukan"
                      className="col-span-3"
                      value={newCheckup.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setShowAddForm(false);
                    setEditMode(false);
                    setSelectedRecordId(null);
                  }}>Batal</Button>
                  <Button onClick={handleSubmit}>{editMode ? 'Simpan Perubahan' : 'Simpan'}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Checkup Records Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Stethoscope className="h-5 w-5 mr-2" />
            Data Pemeriksaan Kesehatan
          </CardTitle>
          <CardDescription>
            Daftar riwayat pemeriksaan kesehatan balita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Balita</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Diagnosa</TableHead>
                  <TableHead>Tindakan</TableHead>
                  <TableHead>Tindak Lanjut</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.childName}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.type === 'Rutin' ? 'default' :
                          record.type === 'Sakit' ? 'destructive' : 'secondary'
                        }
                      >
                        {record.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.diagnosis || '-'}</TableCell>
                    <TableCell>{record.treatment || '-'}</TableCell>
                    <TableCell>{record.followUp || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(record)}
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
                                Apakah Anda yakin ingin menghapus data pemeriksaan ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(record.id)}>Hapus</AlertDialogAction>
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

    </div>
  );
};

export default MedicalCheckupPage; 