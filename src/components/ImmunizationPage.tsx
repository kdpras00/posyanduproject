import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Shield, Calendar as CalendarIcon, Plus, Search, Syringe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ImmunizationRecord {
  id: number;
  childName: string;
  vaccine: string;
  scheduledDate: string;
  status: 'Completed' | 'Scheduled' | 'Pending';
  age: string;
  notes: string;
  givenDate?: string;
  givenBy?: string;
  batchNumber?: string;
  reaction?: string;
  nextSchedule?: string;
}

export const ImmunizationPage = () => {
  const [date, setDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ImmunizationRecord | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    childName: '',
    vaccine: '',
    scheduledDate: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewSchedule(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Menyimpan jadwal imunisasi baru:', newSchedule);
    setNewSchedule({
      childName: '',
      vaccine: '',
      scheduledDate: '',
      notes: ''
    });
    setShowAddForm(false);
  };
  
  const handleViewDetails = (record: ImmunizationRecord) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  const immunizationSchedule: ImmunizationRecord[] = [
    {
      id: 1,
      childName: 'Ahmad Rizki',
      vaccine: 'DPT-HB-Hib 1',
      scheduledDate: '2024-02-15',
      status: 'Scheduled',
      age: '2 bulan',
      notes: 'Imunisasi dasar',
      nextSchedule: '2024-03-15'
    },
    {
      id: 2,
      childName: 'Siti Aminah',
      vaccine: 'Polio 2',
      scheduledDate: '2024-02-10',
      status: 'Completed',
      age: '4 bulan',
      notes: 'Sudah selesai',
      givenDate: '2024-02-10',
      givenBy: 'Dr. Budi',
      batchNumber: 'VAC2024-021',
      reaction: 'Tidak ada',
      nextSchedule: '2024-03-10'
    },
    {
      id: 3,
      childName: 'Budi Santoso',
      vaccine: 'Campak',
      scheduledDate: '2024-02-20',
      status: 'Pending',
      age: '9 bulan',
      notes: 'Menunggu persetujuan orang tua',
      nextSchedule: '2024-02-27'
    }
  ];

  const vaccineTypes = [
    { name: 'Hepatitis B', description: 'Pencegahan Hepatitis B', schedule: '0, 1, 6 bulan' },
    { name: 'DPT-HB-Hib', description: 'Difteri, Pertusis, Tetanus, Hepatitis B, Haemophilus influenzae type b', schedule: '2, 3, 4 bulan' },
    { name: 'Polio', description: 'Poliomielitis', schedule: '1, 2, 3, 4 bulan' },
    { name: 'PCV', description: 'Pneumokokus', schedule: '2, 4, 6 bulan' },
    { name: 'Rotavirus', description: 'Diare rotavirus', schedule: '2, 4 bulan' },
    { name: 'Campak', description: 'Campak', schedule: '9, 18 bulan' }
  ];
  
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
      <div>
        <h2 className="text-3xl font-bold text-foreground">Jadwal Imunisasi</h2>
        <p className="text-muted-foreground">
          Kelola jadwal dan tracking imunisasi balita
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Sudah Imunisasi</p>
                <p className="text-lg font-bold">245</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Jadwal Bulan Ini</p>
                <p className="text-lg font-bold">32</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Syringe className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Pending</p>
                <p className="text-lg font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Plus className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Vaksin</p>
                <p className="text-lg font-bold">285</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Jadwal Imunisasi</CardTitle>
              <CardDescription>Daftar jadwal imunisasi balita</CardDescription>
            </div>
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Jadwal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Tambah Jadwal Imunisasi</DialogTitle>
                  <DialogDescription>
                    Silakan isi data untuk jadwal imunisasi baru
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="childName" className="text-right">
                      Nama Balita
                    </Label>
                    <Select 
                      value={newSchedule.childName} 
                      onValueChange={(value) => handleSelectChange('childName', value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih balita" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ahmad Rizki">Ahmad Rizki</SelectItem>
                        <SelectItem value="Siti Aminah">Siti Aminah</SelectItem>
                        <SelectItem value="Budi Santoso">Budi Santoso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vaccine" className="text-right">
                      Jenis Vaksin
                    </Label>
                    <Select 
                      value={newSchedule.vaccine} 
                      onValueChange={(value) => handleSelectChange('vaccine', value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih jenis vaksin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hepatitis B">Hepatitis B</SelectItem>
                        <SelectItem value="DPT-HB-Hib 1">DPT-HB-Hib 1</SelectItem>
                        <SelectItem value="DPT-HB-Hib 2">DPT-HB-Hib 2</SelectItem>
                        <SelectItem value="DPT-HB-Hib 3">DPT-HB-Hib 3</SelectItem>
                        <SelectItem value="Polio 1">Polio 1</SelectItem>
                        <SelectItem value="Polio 2">Polio 2</SelectItem>
                        <SelectItem value="Polio 3">Polio 3</SelectItem>
                        <SelectItem value="Polio 4">Polio 4</SelectItem>
                        <SelectItem value="Campak">Campak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="scheduledDate" className="text-right">
                      Tanggal Jadwal
                    </Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      className="col-span-3"
                      value={newSchedule.scheduledDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                      Catatan
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Tambahkan catatan jika diperlukan"
                      className="col-span-3"
                      value={newSchedule.notes}
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
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama balita atau jenis vaksin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="space-y-4">
            {immunizationSchedule.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{item.childName}</h3>
                    <p className="text-sm text-muted-foreground">{item.vaccine}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Usia: {item.age}</span>
                      <span>Tanggal: {item.scheduledDate}</span>
                      <span>Catatan: {item.notes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        item.status === 'Completed' ? 'default' : 
                        item.status === 'Scheduled' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {item.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(item)}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Immunization Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Detail Imunisasi</DialogTitle>
            <DialogDescription>
              Informasi lengkap jadwal imunisasi
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Informasi Balita</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nama:</span>
                      <span className="font-medium">{selectedRecord.childName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usia:</span>
                      <span className="font-medium">{selectedRecord.age}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Informasi Vaksin</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jenis:</span>
                      <span className="font-medium">{selectedRecord.vaccine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge 
                        variant={
                          selectedRecord.status === 'Completed' ? 'default' : 
                          selectedRecord.status === 'Scheduled' ? 'secondary' : 
                          'destructive'
                        }
                      >
                        {selectedRecord.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Jadwal</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Terjadwal:</span>
                    <span className="font-medium">{formatDate(selectedRecord.scheduledDate)}</span>
                  </div>
                  {selectedRecord.givenDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tanggal Pemberian:</span>
                      <span className="font-medium">{formatDate(selectedRecord.givenDate)}</span>
                    </div>
                  )}
                  {selectedRecord.nextSchedule && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jadwal Berikutnya:</span>
                      <span className="font-medium">{formatDate(selectedRecord.nextSchedule)}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedRecord.status === 'Completed' && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Detail Pemberian</h4>
                  <div className="space-y-2">
                    {selectedRecord.givenBy && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pemberi:</span>
                        <span className="font-medium">{selectedRecord.givenBy}</span>
                      </div>
                    )}
                    {selectedRecord.batchNumber && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">No. Batch:</span>
                        <span className="font-medium">{selectedRecord.batchNumber}</span>
                      </div>
                    )}
                    {selectedRecord.reaction && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reaksi:</span>
                        <span className="font-medium">{selectedRecord.reaction}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Catatan</h4>
                <p className="text-sm border p-2 rounded-md">{selectedRecord.notes || "Tidak ada catatan"}</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDetails(false)}>Tutup</Button>
                {selectedRecord.status !== 'Completed' && (
                  <Button>Tandai Selesai</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Vaccine Types */}
      <Card>
        <CardHeader>
          <CardTitle>Jenis Vaksin</CardTitle>
          <CardDescription>Daftar vaksin yang tersedia di posyandu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaccineTypes.map((vaccine, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-sm">{vaccine.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{vaccine.description}</p>
                <Badge variant="outline" className="text-xs">
                  Jadwal: {vaccine.schedule}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default ImmunizationPage;