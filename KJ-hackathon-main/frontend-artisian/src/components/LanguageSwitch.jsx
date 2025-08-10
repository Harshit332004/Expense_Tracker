import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Languages } from 'lucide-react';

const LanguageSwitch = () => {
  const [isHindi, setIsHindi] = useState(false);

  useEffect(() => {
    // Initialize state based on stored preference
    const storedLang = localStorage.getItem('app_language_preference');
    setIsHindi(storedLang === 'hi');
  }, []);

  const toggleLanguage = () => {
    const newLang = isHindi ? 'en' : 'hi';
    setIsHindi(!isHindi);
    localStorage.setItem('app_language_preference', newLang);
  };

  return (
    <div className="flex items-center mr-4">
      <Switch
        id="language-switch"
        checked={isHindi}
        onCheckedChange={toggleLanguage}
      />
      <Label htmlFor="language-switch" className="flex items-center cursor-pointer">
        <Languages className="w-4 h-4 mr-2" />
        {isHindi ? 'हिंदी' : 'English'}
      </Label>
    </div>
  );
};

export default LanguageSwitch;