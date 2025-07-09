import { useState } from 'react';
import { Heart, Menu, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PosyanduHeaderProps {
  onMenuToggle: () => void;
  currentUser?: {
    name: string;
    role: string;
  };
  onLogout: () => void;
}

export const PosyanduHeader = ({ onMenuToggle, currentUser, onLogout }: PosyanduHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-primary border-b border-border shadow-card">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="text-primary-foreground hover:bg-primary-glow/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary-foreground/20 rounded-full">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">
                  POSYANDU SEHAT
                </h1>
                <p className="text-sm text-primary-foreground/80">
                  Sistem Informasi Posyandu
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser && (
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-primary-foreground">
                {currentUser.name}
              </p>
              <p className="text-xs text-primary-foreground/80">
                {currentUser.role}
              </p>
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-glow/20"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};