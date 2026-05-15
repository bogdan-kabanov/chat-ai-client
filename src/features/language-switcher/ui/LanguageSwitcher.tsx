import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (_: React.MouseEvent<HTMLElement>, newLang: string | null) => {
    if (newLang) {
      i18n.changeLanguage(newLang);
      localStorage.setItem('app-language', newLang);
    }
  };

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      onChange={handleChange}
      size="small"
      sx={{
        '& .MuiToggleButton-root': {
          color: 'rgba(255,255,255,0.5)',
          borderColor: 'rgba(255,255,255,0.15)',
          fontSize: '0.75rem',
          px: 1.5,
          py: 0.5,
          '&.Mui-selected': {
            color: '#90caf9',
            bgcolor: 'rgba(25,118,210,0.2)',
            borderColor: 'rgba(25,118,210,0.4)',
            '&:hover': {
              bgcolor: 'rgba(25,118,210,0.3)',
            },
          },
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.05)',
          },
        },
      }}
    >
      <ToggleButton value="ru">RU</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
