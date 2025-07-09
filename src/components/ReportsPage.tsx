import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Filter, BarChart3 } from 'lucide-react';

export const ReportsPage = () => {
  const [reportType, setReportType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const reports = [
    {
      id: 1,
      title: 'Laporan Imunisasi Bulanan',
      type: 'Imunisasi',
      date: '2024-01-01',
      status: 'Selesai',
      description: 'Laporan lengkap data imunisasi balita bulan Januari'
    },
    {
      id: 2,
      title: 'Laporan Pertumbuhan Balita',
      type: 'Pertumbuhan',
      date: '2024-01-15',
      status: 'Draft',
      description: 'Data monitoring pertumbuhan dan perkembangan balita'
    },
    {
      id: 3,
      title: 'Laporan Kehadiran Posyandu',
      type: 'Kehadiran',
      date: '2024-01-10',
      status: 'Selesai',
      description: 'Statistik kehadiran balita dalam kegiatan posyandu'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Laporan Posyandu</h2>
        <p className="text-muted-foreground">
          Generate dan kelola laporan data posyandu
        </p>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Laporan
          </CardTitle>
          <CardDescription>
            Pilih kriteria untuk generate laporan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="report-type">Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imunisasi">Laporan Imunisasi</SelectItem>
                  <SelectItem value="pertumbuhan">Laporan Pertumbuhan</SelectItem>
                  <SelectItem value="kehadiran">Laporan Kehadiran</SelectItem>
                  <SelectItem value="backup">Laporan Backup Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-from">Tanggal Mulai</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date-to">Tanggal Selesai</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Laporan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Daftar Laporan
          </CardTitle>
          <CardDescription>
            Laporan yang sudah dibuat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                      <Badge variant={report.status === 'Selesai' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;