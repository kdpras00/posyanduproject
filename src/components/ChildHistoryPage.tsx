import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Baby, Calendar, Shield, Activity, LineChart, Stethoscope } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Child {
  id: number;
  name: string;
  birthDate: string;
  gender: 'L' | 'P';
  motherName: string;
  fatherName: string;
  address: string;
  birthPlace: string;
}

interface ImmunizationRecord {
  id: number;
  date: string;
  vaccine: string;
  age: string;
  location: string;
  notes?: string;
}

interface GrowthRecord {
  id: number;
  date: string;
  age: string;
  weight: number; // kg
  height: number; // cm
  headCircumference: number; // cm
  status: string;
}

interface CheckupRecord {
  id: number;
  date: string;
  type: string;
  diagnosis?: string;
  treatment?: string;
  followUp?: string;
}

export const ChildHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const children: Child[] = [
    {
      id: 1,
      name: 'Andi Pratama',
      birthDate: '2023-01-15',
      gender: 'L',
      motherName: 'Siti Aminah',
      fatherName: 'Budi Pratama',
      address: 'Jl. Mawar No. 123',
      birthPlace: 'Jakarta'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      birthDate: '2023-03-20',
      gender: 'P',
      motherName: 'Dewi Sartika',
      fatherName: 'Ahmad Yani',
      address: 'Jl. Melati No. 456',
      birthPlace: 'Bandung'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      birthDate: '2023-05-10',
      gender: 'L',
      motherName: 'Ratna Sari',
      fatherName: 'Hendro Utomo',
      address: 'Jl. Kenanga No. 789',
      birthPlace: 'Surabaya'
    }
  ];

  const immunizationRecords: ImmunizationRecord[] = [
    {
      id: 1,
      date: '2023-01-20',
      vaccine: 'HB-0',
      age: '5 hari',
      location: 'Posyandu Dahlia',
      notes: 'Tidak ada reaksi'
    },
    {
      id: 2,
      date: '2023-02-15',
      vaccine: 'BCG',
      age: '1 bulan',
      location: 'Posyandu Dahlia',
      notes: 'Sedikit demam'
    },
    {
      id: 3,
      date: '2023-03-15',
      vaccine: 'DPT-HB-Hib 1',
      age: '2 bulan',
      location: 'Puskesmas',
      notes: 'Demam ringan'
    },
    {
      id: 4,
      date: '2023-04-15',
      vaccine: 'Polio 2',
      age: '3 bulan',
      location: 'Posyandu Dahlia',
    }
  ];

  const growthRecords: GrowthRecord[] = [
    {
      id: 1,
      date: '2023-02-15',
      age: '1 bulan',
      weight: 4.5,
      height: 55.2,
      headCircumference: 38.1,
      status: 'Normal'
    },
    {
      id: 2,
      date: '2023-03-15',
      age: '2 bulan',
      weight: 5.8,
      height: 58.4,
      headCircumference: 40.2,
      status: 'Normal'
    },
    {
      id: 3,
      date: '2023-04-15',
      age: '3 bulan',
      weight: 6.7,
      height: 61.3,
      headCircumference: 41.5,
      status: 'Normal'
    },
    {
      id: 4,
      date: '2023-05-15',
      age: '4 bulan',
      weight: 7.5,
      height: 63.8,
      headCircumference: 42.3,
      status: 'Normal'
    }
  ];

  const checkupRecords: CheckupRecord[] = [
    {
      id: 1,
      date: '2023-02-15',
      type: 'Rutin',
      diagnosis: 'Sehat',
      treatment: 'Vitamin A',
    },
    {
      id: 2,
      date: '2023-03-10',
      type: 'Sakit',
      diagnosis: 'ISPA Ringan',
      treatment: 'Sirup OBH',
      followUp: '2023-03-17'
    },
    {
      id: 3,
      date: '2023-04-15',
      type: 'Rutin',
      diagnosis: 'Sehat',
      treatment: 'Vitamin A',
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
    
    if (months < 12) {
      return `${months} bulan`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} tahun ${remainingMonths} bulan`;
    }
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
      <div>
        <h2 className="text-3xl font-bold text-foreground">Riwayat Balita</h2>
        <p className="text-muted-foreground">
          Lihat riwayat lengkap balita posyandu
        </p>
      </div>

      {/* Search Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Cari Balita</CardTitle>
          <CardDescription>
            Cari balita untuk melihat riwayat lengkap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama balita, nama ibu, atau nama ayah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Children List */}
      {!selectedChild && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Baby className="h-5 w-5 mr-2" />
              Daftar Balita
            </CardTitle>
            <CardDescription>
              Pilih balita untuk melihat riwayat lengkap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Balita</TableHead>
                    <TableHead>Tanggal Lahir</TableHead>
                    <TableHead>Usia</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Nama Ibu</TableHead>
                    <TableHead>Nama Ayah</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChildren.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell className="font-medium">{child.name}</TableCell>
                      <TableCell>{formatDate(child.birthDate)}</TableCell>
                      <TableCell>{calculateAge(child.birthDate)}</TableCell>
                      <TableCell>
                        <Badge variant={child.gender === 'L' ? 'default' : 'secondary'}>
                          {child.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </Badge>
                      </TableCell>
                      <TableCell>{child.motherName}</TableCell>
                      <TableCell>{child.fatherName}</TableCell>
                      <TableCell>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => setSelectedChild(child)}
                        >
                          Lihat Riwayat
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Child History View */}
      {selectedChild && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Riwayat Lengkap: {selectedChild.name}</h3>
              <p className="text-muted-foreground">
                {calculateAge(selectedChild.birthDate)} • {selectedChild.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedChild(null)}>
              Kembali ke Daftar
            </Button>
          </div>
          
          {/* Child Info */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Baby className="h-5 w-5 mr-2" />
                Data Balita
              </CardTitle>
              <CardDescription>
                Informasi dasar balita
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Nama Lengkap</span>
                    <span className="font-medium">{selectedChild.name}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Tanggal Lahir</span>
                    <span className="font-medium">{formatDate(selectedChild.birthDate)}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Tempat Lahir</span>
                    <span className="font-medium">{selectedChild.birthPlace}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Jenis Kelamin</span>
                    <span className="font-medium">{selectedChild.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Nama Ibu</span>
                    <span className="font-medium">{selectedChild.motherName}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Nama Ayah</span>
                    <span className="font-medium">{selectedChild.fatherName}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Alamat</span>
                    <span className="font-medium">{selectedChild.address}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Usia Saat Ini</span>
                    <span className="font-medium">{calculateAge(selectedChild.birthDate)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed History Records */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Riwayat Kesehatan</CardTitle>
              <CardDescription>
                Riwayat lengkap kesehatan dan perkembangan balita
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="growth" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="growth" className="flex items-center">
                    <LineChart className="h-4 w-4 mr-2" />
                    Pertumbuhan
                  </TabsTrigger>
                  <TabsTrigger value="immunization" className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Imunisasi
                  </TabsTrigger>
                  <TabsTrigger value="checkup" className="flex items-center">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Pemeriksaan
                  </TabsTrigger>
                </TabsList>
                
                {/* Growth Tab */}
                <TabsContent value="growth" className="border-none p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Usia</TableHead>
                        <TableHead>Berat (kg)</TableHead>
                        <TableHead>Tinggi (cm)</TableHead>
                        <TableHead>Lingkar Kepala (cm)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {growthRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell>{record.age}</TableCell>
                          <TableCell>{record.weight}</TableCell>
                          <TableCell>{record.height}</TableCell>
                          <TableCell>{record.headCircumference}</TableCell>
                          <TableCell>
                            <Badge>{record.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Immunization Tab */}
                <TabsContent value="immunization" className="border-none p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Usia</TableHead>
                        <TableHead>Vaksin</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Catatan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {immunizationRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell>{record.age}</TableCell>
                          <TableCell className="font-medium">{record.vaccine}</TableCell>
                          <TableCell>{record.location}</TableCell>
                          <TableCell>{record.notes || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Checkup Tab */}
                <TabsContent value="checkup" className="border-none p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Jenis</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Tindakan</TableHead>
                        <TableHead>Tindak Lanjut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {checkupRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{formatDate(record.date)}</TableCell>
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
                          <TableCell className="font-medium">{record.diagnosis || '-'}</TableCell>
                          <TableCell>{record.treatment || '-'}</TableCell>
                          <TableCell>{record.followUp ? formatDate(record.followUp) : '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ChildHistoryPage; 