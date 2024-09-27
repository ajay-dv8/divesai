'use client'

import { useThemeMode } from "@/hooks/settings/use-settings"
import { SectionLabel } from "../section-label";
import { cn } from "@/lib/utils";
import { SystemMode } from "../themes-placeholder/systemmode";
import { DarkMode } from "../themes-placeholder/darkmode";
import { LightMode } from "../themes-placeholder/lightmode";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useThemeMode();
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
      <div className="lg:col-span-1">
        <SectionLabel 
          label="Interface theme"
          message="Select your preferred theme"
        />
      </div>

      <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:flex-row">
        <div className={cn('rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
          theme == 'system' && 'border-green' 
          )}
          onClick={() => setTheme('system')}
        >
          <SystemMode />
        </div>

        <div className={cn('rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
          theme == 'system' && 'border-green' 
          )}
          onClick={() => setTheme('dark')}
        >
          <DarkMode />
        </div>

        <div className={cn('rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
          theme == 'system' && 'border-green' 
          )}
          onClick={() => setTheme('light')}
        >
          <LightMode />
        </div>
      </div>
    </div>
  )
}
