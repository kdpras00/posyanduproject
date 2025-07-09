import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Baby, LineChart, Scale, Activity, Ruler, Plus } from 'lucide-react';
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

interface GrowthRecord {
  id: number;
  childName: string;
  ageInMonths: number;
  date: string;
  weight: number; // in kg
  height: number; // in cm
  headCircumference: number; // in cm
  nutritionStatus: 'Baik' | 'Kurang' | 'Buruk' | 'Lebih';
  notes?: string;
}

export const GrowthMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGrowthData, setNewGrowthData] = useState({
    childName: '',
    date: '',
    weight: '',
    height: '',
    headCircumference: '',
    nutritionStatus: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewGrowthData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewGrowthData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Menyimpan data pertumbuhan baru:', newGrowthData);
    setNewGrowthData({
      childName: '',
      date: '',
      weight: '',
      height: '',
      headCircumference: '',
      nutritionStatus: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const growthRecords: GrowthRecord[] = [
    {
      id: 1,
      childName: 'Andi Pratama',
      ageInMonths: 12,
      date: '2024-01-10',
      weight: 9.5,
      height: 75.2,
      headCircumference: 46.1,
      nutritionStatus: 'Baik',
      notes: 'Perkembangan sesuai usia'
    },
    {
      id: 2,
      childName: 'Siti Nurhaliza',
      ageInMonths: 18,
      date: '2024-01-15',
      weight: 10.2,
      height: 82.5,
      headCircumference: 48.0,
      nutritionStatus: 'Baik',
      notes: 'Perkembangan sesuai usia'
    },
    {
      id: 3,
      childName: 'Budi Santoso',
      ageInMonths: 8,
      date: '2024-01-05',
      weight: 7.1,
      height: 68.4,
      headCircumference: 44.5,
      nutritionStatus: 'Kurang',
      notes: 'Perlu pemantauan gizi'
    }
  ];

  const filteredRecords = selectedChild 
    ? growthRecords.filter(record => record.childName === selectedChild)
    : growthRecords.filter(record => 
        record.childName.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Monitoring Pertumbuhan</h2>
        <p className="text-muted-foreground">
          Pantau dan catat pertumbuhan dan perkembangan balita
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Status Gizi Baik</p>
                <p className="text-lg font-bold">185</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Perlu Perhatian</p>
                <p className="text-lg font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Status Gizi Buruk</p>
                <p className="text-lg font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Baby className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Balita</p>
                <p className="text-lg font-bold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Cari Data Pertumbuhan</CardTitle>
          <CardDescription>
            Cari berdasarkan nama balita
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
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedChild(''); }}>
                Reset
              </Button>
              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Tambah Data Pertumbuhan</DialogTitle>
                    <DialogDescription>
                      Catat data pertumbuhan balita baru
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="childName" className="text-right">
                        Nama Balita
                      </Label>
                      <Select
                        value={newGrowthData.childName}
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
                        Tanggal Pengukuran
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        className="col-span-3"
                        value={newGrowthData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="weight" className="text-right">
                        Berat (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        min="0"
                        className="col-span-3"
                        value={newGrowthData.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="height" className="text-right">
                        Tinggi (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        min="0"
                        className="col-span-3"
                        value={newGrowthData.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="headCircumference" className="text-right">
                        Lingkar Kepala (cm)
                      </Label>
                      <Input
                        id="headCircumference"
                        type="number"
                        step="0.1"
                        min="0"
                        className="col-span-3"
                        value={newGrowthData.headCircumference}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nutritionStatus" className="text-right">
                        Status Gizi
                      </Label>
                      <Select
                        value={newGrowthData.nutritionStatus}
                        onValueChange={(value) => handleSelectChange('nutritionStatus', value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih status gizi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Baik">Baik</SelectItem>
                          <SelectItem value="Kurang">Kurang</SelectItem>
                          <SelectItem value="Buruk">Buruk</SelectItem>
                          <SelectItem value="Lebih">Lebih</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Catatan
                      </Label>
                      <Input
                        id="notes"
                        placeholder="Tambahkan catatan jika diperlukan"
                        className="col-span-3"
                        value={newGrowthData.notes}
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
          </div>
        </CardContent>
      </Card>

      {/* Growth Records Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Data Pertumbuhan Balita
          </CardTitle>
          <CardDescription>
            Data pengukuran pertumbuhan balita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Balita</TableHead>
                  <TableHead>Usia (bulan)</TableHead>
                  <TableHead>Tanggal Pemeriksaan</TableHead>
                  <TableHead>Berat (kg)</TableHead>
                  <TableHead>Tinggi (cm)</TableHead>
                  <TableHead>Lingkar Kepala (cm)</TableHead>
                  <TableHead>Status Gizi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.childName}</TableCell>
                    <TableCell>{record.ageInMonths}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.weight}</TableCell>
                    <TableCell>{record.height}</TableCell>
                    <TableCell>{record.headCircumference}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.nutritionStatus === 'Baik' ? 'default' :
                          record.nutritionStatus === 'Kurang' ? 'secondary' :
                          record.nutritionStatus === 'Lebih' ? 'outline' : 'destructive'
                        }
                      >
                        {record.nutritionStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Growth Charts */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Grafik Pertumbuhan
          </CardTitle>
          <CardDescription>
            Visualisasi data pertumbuhan balita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center">
                  <Scale className="h-4 w-4 mr-2" />
                  Berat Badan
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 bg-gradient-card flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-10 w-10 mx-auto mb-2" />
                  <p className="text-sm">Grafik Berat Badan Berdasarkan Usia</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center">
                  <Ruler className="h-4 w-4 mr-2" />
                  Tinggi Badan
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 bg-gradient-card flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-10 w-10 mx-auto mb-2" />
                  <p className="text-sm">Grafik Tinggi Badan Berdasarkan Usia</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Lingkar Kepala
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 bg-gradient-card flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-10 w-10 mx-auto mb-2" />
                  <p className="text-sm">Grafik Lingkar Kepala Berdasarkan Usia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default GrowthMonitoring; 