import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { HardDrive, Download, Upload, Calendar, Clock, CheckCircle, AlertCircle, Database, FileText } from 'lucide-react';

export const BackupPage = () => {
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const backupHistory = [
    {
      id: 1,
      type: 'Full Backup',
      date: '2024-01-15 14:30',
      size: '2.5 GB',
      status: 'Success',
      duration: '15 min'
    },
    {
      id: 2,
      type: 'Data Only',
      date: '2024-01-10 09:15',
      size: '850 MB',
      status: 'Success',
      duration: '8 min'
    },
    {
      id: 3,
      type: 'Full Backup',
      date: '2024-01-05 16:45',
      size: '2.3 GB',
      status: 'Failed',
      duration: '12 min'
    }
  ];

  const handleBackup = (type: string) => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackingUp(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Backup & Restore Data</h2>
        <p className="text-muted-foreground">
          Kelola backup data sistem posyandu untuk keamanan data
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <HardDrive className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Backup</p>
                <p className="text-lg font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Berhasil</p>
                <p className="text-lg font-bold">10</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Gagal</p>
                <p className="text-lg font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Size</p>
                <p className="text-lg font-bold">15.2 GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Buat Backup Baru
            </CardTitle>
            <CardDescription>
              Pilih jenis data yang akan di-backup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="default">
                    <Database className="h-4 w-4 mr-2" />
                    Full Backup (Semua Data)
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Full Backup</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah Anda yakin ingin melakukan backup semua data? Proses ini mungkin memakan waktu beberapa menit.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleBackup('full')}>
                      Ya, Lanjutkan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button className="w-full" variant="outline" onClick={() => handleBackup('data')}>
                <FileText className="h-4 w-4 mr-2" />
                Data Only (Data Balita & Imunisasi)
              </Button>

              <Button className="w-full" variant="outline" onClick={() => handleBackup('settings')}>
                <Database className="h-4 w-4 mr-2" />
                Settings Only (Konfigurasi Sistem)
              </Button>
            </div>

            {isBackingUp && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress Backup...</span>
                  <span>{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Restore Data
            </CardTitle>
            <CardDescription>
              Pulihkan data dari file backup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop file backup atau klik untuk pilih
              </p>
              <Button variant="outline" size="sm">
                Pilih File Backup
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              * Hanya file backup dengan format .sql atau .bak yang didukung
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Riwayat Backup
          </CardTitle>
          <CardDescription>
            Daftar backup yang pernah dibuat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupHistory.map((backup) => (
              <div key={backup.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{backup.type}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {backup.date}
                      </span>
                      <span>Size: {backup.size}</span>
                      <span>Durasi: {backup.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={backup.status === 'Success' ? 'default' : 'destructive'}
                      className="flex items-center gap-1"
                    >
                      {backup.status === 'Success' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {backup.status}
                    </Badge>
                    {backup.status === 'Success' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
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

export default BackupPage;