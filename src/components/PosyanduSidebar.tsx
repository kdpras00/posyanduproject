import { useState } from 'react';
import {
  Users,
  Baby,
  Calendar,
  ClipboardList,
  Stethoscope,
  BarChart3,
  Shield,
  UserPlus,
  Activity,
  ChevronRight,
  ChevronDown,
  Database,
  History,
  LineChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

interface PosyanduSidebarProps {
  isOpen: boolean;
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

export const PosyanduSidebar = ({ isOpen, activeItem, onItemClick }: PosyanduSidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['data', 'health']);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: <ClipboardList className="h-5 w-5" />,
      children: [
        {
          id: 'users',
          title: 'Kelola Akun',
          icon: <Users className="h-4 w-4" />,
        },
        {
          id: 'children',
          title: 'Data Balita',
          icon: <Baby className="h-4 w-4" />,
        },
        {
          id: 'childHistory',
          title: 'Riwayat Balita',
          icon: <History className="h-4 w-4" />,
        },
      ],
    },
    {
      id: 'health',
      title: 'Kesehatan',
      icon: <Stethoscope className="h-5 w-5" />,
      children: [
        {
          id: 'immunization',
          title: 'Imunisasi',
          icon: <Shield className="h-4 w-4" />,
        },
        {
          id: 'growth',
          title: 'Pertumbuhan',
          icon: <LineChart className="h-4 w-4" />,
        },
        {
          id: 'checkup',
          title: 'Pemeriksaan',
          icon: <Stethoscope className="h-4 w-4" />,
        },
      ],
    },
    {
      id: 'schedule',
      title: 'Jadwal',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: 'reports',
      title: 'Laporan',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: 'backup',
      title: 'Backup Data',
      icon: <Database className="h-5 w-5" />,
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeItem === item.id;

    return (
      <div key={item.id} className="w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-3 py-2 h-auto font-normal",
            level === 0 ? "text-sm" : "text-xs ml-4",
            isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground",
            "hover:bg-muted/50"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onItemClick(item.id);
            }
          }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {item.icon}
              <span className={cn("transition-all duration-300", !isOpen && "opacity-0")}>{item.title}</span>
            </div>
            {hasChildren && isOpen && (
              <div className="ml-auto">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            )}
          </div>
        </Button>
        
        {hasChildren && isExpanded && isOpen && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 z-40",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 space-y-2">
        {menuItems.map(item => renderMenuItem(item))}
      </div>
    </aside>
  );
};