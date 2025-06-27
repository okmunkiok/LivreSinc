// src/pages/HomePage.tsx
import { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  AppBar, 
  Toolbar, 
  Checkbox, 
  FormControlLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSettings } from '../contexts/AppSettingsContext';
import { CharacterMascot } from '../components/CharacterMascot';

function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { devMode, setDevMode, showCharacter, setShowCharacter } = useAppSettings();
  const [user, setUser] = useState<null | { name: string }>(null);

  const handleLogin = () => {
    setUser({ name: '사용자' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 - 밝은 연두색 */}
      <AppBar position="static" sx={{ bgcolor: '#8BC34A' }}>
        <Toolbar sx={{ minHeight: 'clamp(64px, 8vh, 80px)', py: 0 }}> {/* 헤더도 유연하게 */}
          {/* 로고/타이틀 with 캐릭터 */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.9
              }
            }}
            onClick={() => navigate('/')}
          >
            {showCharacter && (
              <CharacterMascot 
                page="homepage"
                emotion="header"
                height="clamp(56px, 7vh, 76px)" // 더 유연한 크기 조정
                style={{ 
                  marginRight: '12px',
                  marginLeft: '8px'
                }}
              />
            )}
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', // 텍스트도 유연하게
                color: 'white'
              }}
            >
              LivreSinc
            </Typography>
          </Box>

          {/* 캐릭터 표시 체크박스 */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={showCharacter} 
                onChange={(e) => setShowCharacter(e.target.checked)}
                sx={{ 
                  color: 'white',
                  '&.Mui-checked': { color: 'white' },
                  padding: '6px'
                }}
              />
            }
            label="캐릭터 표시"
            sx={{ 
              color: 'white',
              mr: 2,
              '& .MuiFormControlLabel-label': {
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          />

          {/* 개발자 모드 체크박스 */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={devMode} 
                onChange={(e) => setDevMode(e.target.checked)}
                sx={{ 
                  color: 'white',
                  '&.Mui-checked': { color: 'white' },
                  padding: '6px'
                }}
              />
            }
            label="개발자 모드"
            sx={{ 
              color: 'white',
              mr: 2,
              '& .MuiFormControlLabel-label': {
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          />

          {/* 로그인/로그아웃 버튼 */}
          {user ? (
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{ 
                border: '1px solid white',
                '&:hover': { 
                  bgcolor: 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              로그아웃
            </Button>
          ) : (
            <Button 
              color="inherit" 
              onClick={handleLogin}
              sx={{ 
                border: '1px solid white',
                '&:hover': { 
                  bgcolor: 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              로그인
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* 메인 컨텐츠 */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: '#fafafa'
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { 
                xs: '1fr', 
                md: 'repeat(3, minmax(200px, 1fr))'
              },
              gridAutoRows: 'minmax(min-content, 1fr)',
              gap: { xs: '2vh', sm: '3vh', md: '2vw' },
              width: '100%',
              maxWidth: '90vw',
              maxHeight: { 
                xs: '100%',
                md: 'calc(80vh - 80px)' 
              },
            }}
          >
            {/* 총괄 대시보드 버튼 - 밝은 파랑 */}
            <Button 
              variant="contained" 
              size="large"
              sx={{
                width: '100%',
                height: '100%',
                py: 'clamp(1.5rem, 4vh, 4rem)',
                px: 'clamp(1.5rem, 6vw, 6rem)',
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                fontWeight: 'bold',
                minWidth: { xs: 180, sm: 200, md: 250 },
                minHeight: { xs: 60, sm: 80, md: 100 },
                maxHeight: { xs: 200, md: 300 },
                bgcolor: '#29B6F6',
                color: 'white',
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: { xs: 2, sm: 2, md: 2 },
                boxShadow: 2,
                '&:hover': {
                  bgcolor: '#0288D1',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.2s'
              }}
            >
              {showCharacter && (
                <CharacterMascot 
                  page="homepage"
                  emotion="dashboard"
                  height={isMobile ? 'clamp(60px, 10vw, 90px)' : 'clamp(80px, 15vw, 150px)'} // 연속적 크기 변화
                />
              )}
              총괄 대시보드
            </Button>
            
            {/* 목차 학습 버튼 - 밝은 주황 */}
            <Button 
              variant="contained" 
              size="large"
              sx={{
                width: '100%',
                height: '100%',
                py: 'clamp(1.5rem, 4vh, 4rem)',
                px: 'clamp(1.5rem, 6vw, 6rem)',
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                fontWeight: 'bold',
                minWidth: { xs: 180, sm: 200, md: 250 },
                minHeight: { xs: 60, sm: 80, md: 100 },
                maxHeight: { xs: 200, md: 300 },
                bgcolor: '#FFA726',
                color: 'white',
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: { xs: 2, sm: 2, md: 2 },
                boxShadow: 2,
                '&:hover': {
                  bgcolor: '#F57C00',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.2s'
              }}
            >
              {showCharacter && (
                <CharacterMascot 
                  page="homepage"
                  emotion="ordo"
                  height={isMobile ? 'clamp(60px, 10vw, 90px)' : 'clamp(80px, 15vw, 150px)'} // 연속적 크기 변화
                />
              )}
              목차 학습
            </Button>
            
            {/* 페이지 학습 버튼 - 밝은 보라 */}
            <Button 
              variant="contained" 
              size="large"
              sx={{
                width: '100%',
                height: '100%',
                py: 'clamp(1.5rem, 4vh, 4rem)',
                px: 'clamp(1.5rem, 6vw, 6rem)',
                fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                fontWeight: 'bold',
                minWidth: { xs: 180, sm: 200, md: 250 },
                minHeight: { xs: 60, sm: 80, md: 100 },
                maxHeight: { xs: 200, md: 300 },
                bgcolor: '#AB47BC',
                color: 'white',
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: { xs: 2, sm: 2, md: 2 },
                boxShadow: 2,
                '&:hover': {
                  bgcolor: '#8E24AA',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.2s'
              }}
            >
              {showCharacter && (
                <CharacterMascot 
                  page="homepage"
                  emotion="pagina"
                  height={isMobile ? 'clamp(60px, 10vw, 90px)' : 'clamp(80px, 15vw, 150px)'} // 연속적 크기 변화
                />
              )}
              페이지 학습
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer with 저작권 표시 */}
      {showCharacter && (
        <Box 
          component="footer"
          sx={{ 
            textAlign: 'center', 
            py: { xs: 1, sm: 1.5 },
            px: 2,
            bgcolor: '#f5f5f5',
            borderTop: '1px solid #e0e0e0',
            mt: 'auto'
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: { 
                xs: '0.65rem',
                sm: '0.7rem', 
                md: '0.75rem' 
              },
              lineHeight: 1.3,
              display: 'block',
              maxWidth: '95%',
              mx: 'auto'
            }}
          >
            본 저작물은 경기도에서 공공누리 제4유형으로 개방한 
            봉공이 캐릭터를 이용하였으며, 
            해당 저작물은 경기도, https://www.gg.go.kr 에서 무료로 다운받으실 수 있습니다.
          </Typography>
        </Box>
      )}

      {/* 개발자 모드 표시 */}
      {devMode && (
        <Box 
          sx={{ 
            position: 'fixed',
            bottom: showCharacter ? { xs: 60, sm: 70, md: 80 } : 20,
            left: '50%',
            transform: 'translateX(-50%)',
            p: 2, 
            bgcolor: '#f5f5f5', 
            borderRadius: 1,
            boxShadow: 2,
            maxWidth: '90vw',
            zIndex: 1000
          }}
        >
          <Typography variant="body2" color="text.secondary">
            개발자 모드 활성화됨 - 더미 데이터 사용 중
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
