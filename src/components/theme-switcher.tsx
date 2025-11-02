'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
        <Sun className="h-5 w-5" />
        <Switch
            id="theme-switch"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => {
            setTheme(checked ? 'dark' : 'light');
            }}
        />
        <Moon className="h-5 w-5" />
    </div>
  );
}
