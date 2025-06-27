// src/components/CharacterMascot.tsx
import { useState } from 'react';
import { Box } from '@mui/material';

interface CharacterMascotProps {
  page?: 'homepage' | 'dashboard' | 'ordo' | 'pagina';
  emotion?: string;
  height?: string | number | { xs?: string | number; sm?: string | number; md?: string | number };
  style?: React.CSSProperties;
}

export const CharacterMascot = ({ 
  page = 'homepage',
  emotion = 'header',
  height = 'clamp(40px, 10vw, 100px)', // 기본값도 유연하게
  style 
}: CharacterMascotProps) => {
  const [imageError, setImageError] = useState(false);
  
  if (imageError) {
    return null;
  }
  
  const getHeight = () => {
    // string이면 그대로 사용 (clamp 등)
    if (typeof height === 'string' || typeof height === 'number') {
      return height;
    }
    // object면 반응형 처리
    return height;
  };
  
  const imagePath = `${import.meta.env.BASE_URL}assets/mascot/${page}/${emotion}.png`;
  
  return (
    <Box
      component="img"
      src={imagePath}
      alt="봉공이"
      onError={() => setImageError(true)}
      sx={{
        height: getHeight(),
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        ...style
      }}
    />
  );
};
