import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserPlus, Calendar as CalendarIcon, Save, Eye, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const RegistrationPage = () => {
  const [birthDate, setBirthDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    gender: '',
    birthPlace: '',
    motherName: '',
    fatherName: '',
    address: '',
    phone: '',
    notes: ''
  });

  const recentRegistrations = [
    {
      id: 1,
      name: 'Muhammad Fariz',
      nik: '3201234567890123',
      birthDate: '2023-08-15',
      gender: 'Laki-laki',
      status: 'Active',
      registeredDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Siti Aisyah',
      nik: '3201234567890124', 
      birthDate: '2023-09-20',
      gender: 'Perempuan',
      status: 'Active',
      registeredDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Ahmad Rizki',
      nik: '3201234567890125',
      birthDate: '2023-07-10',
      gender: 'Laki-laki',
      status: 'Pending',
      registeredDate: '2024-01-12'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Registrasi Balita Baru</h2>
        <p className="text-muted-foreground">
          Daftarkan balita baru ke sistem posyandu
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Form Registrasi Balita
              </CardTitle>
              <CardDescription>
                Lengkapi data balita untuk registrasi baru
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap Balita</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="nik">NIK Balita</Label>
                  <Input
                    id="nik"
                    value={formData.nik}
                    onChange={(e) => handleInputChange('nik', e.target.value)}
                    placeholder="16 digit NIK"
                    maxLength={16}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="birth-place">Tempat Lahir</Label>
                  <Input
                    id="birth-place"
                    value={formData.birthPlace}
                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                    placeholder="Tempat lahir"
                  />
                </div>
                <div>
                  <Label>Tanggal Lahir</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !birthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "dd/MM/yyyy") : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={setBirthDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mother-name">Nama Ibu</Label>
                  <Input
                    id="mother-name"
                    value={formData.motherName}
                    onChange={(e) => handleInputChange('motherName', e.target.value)}
                    placeholder="Nama lengkap ibu"
                  />
                </div>
                <div>
                  <Label htmlFor="father-name">Nama Ayah</Label>
                  <Input
                    id="father-name"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                    placeholder="Nama lengkap ayah"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Alamat lengkap tempat tinggal"
                    rows={3}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Catatan Khusus</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Catatan khusus (opsional)"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Data
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Registrations */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Registrasi Terbaru
              </CardTitle>
              <CardDescription>
                Balita yang baru didaftarkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRegistrations.map((registration) => (
                  <div key={registration.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm">{registration.name}</h3>
                        <Badge 
                          variant={registration.status === 'Active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {registration.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>NIK: {registration.nik}</p>
                        <p>Lahir: {registration.birthDate}</p>
                        <p>Jenis Kelamin: {registration.gender}</p>
                        <p>Terdaftar: {registration.registeredDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  );
};

export default RegistrationPage;