"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2, Shield, Terminal } from "lucide-react";

export function ModeSwitcher() {
  const [mode, setMode] = React.useState("magical");

  const modes = [
    { value: "magical", label: "Magical", icon: <Wand2 className="mr-2 h-4 w-4" /> },
    { value: "jarvis", label: "Jarvis", icon: <Shield className="mr-2 h-4 w-4" /> },
    { value: "cli", label: "CLI", icon: <Terminal className="mr-2 h-4 w-4" /> },
  ];

  const selectedMode = modes.find((m) => m.value === mode);

  return (
    <Select value={mode} onValueChange={setMode}>
      <SelectTrigger className="w-[150px] font-medium">
        <div className="flex items-center">
            {selectedMode?.icon}
            <SelectValue placeholder="Select mode" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {modes.map((m) => (
          <SelectItem key={m.value} value={m.value}>
            <div className="flex items-center">
                {m.icon}
                {m.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
