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
  FormControlLabel 
} from '@mui/material';

function HomePage() {
  const [devMode, setDevMode] = useState(false);
  const [user, setUser] = useState<null | { name: string }>(null); // 임시 사용자 상태

  const handleLogin = () => {
    // 나중에 Google OAuth로 교체
    setUser({ name: '사용자' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <AppBar position="static" sx={{ bgcolor: '#4CAF50' }}> {/* 연두색 헤더 */}
        <Toolbar>
          {/* 로고/타이틀 */}
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              cursor: 'pointer' 
            }}
          >
            LivreSinc
          </Typography>

          {/* 개발자 모드 체크박스 */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={devMode} 
                onChange={(e) => setDevMode(e.target.checked)}
                sx={{ 
                  color: 'white',
                  '&.Mui-checked': { color: 'white' }
                }}
              />
            }
            label="개발자 모드"
            sx={{ 
              color: 'white',
              mr: 2 
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
          // 컨테이너가 화면을 넘어가지 않도록
          maxHeight: 'calc(100vh - 64px)', // 헤더 높이를 뺀 나머지
          overflow: 'auto'
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
          {/* CSS Grid with flexible height */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { 
                xs: '1fr', 
                md: 'repeat(3, minmax(200px, 1fr))' // 최소 너비 보장
              },
              gridAutoRows: 'minmax(min-content, 1fr)', // 내용에 맞춰 유연하게
              gap: { xs: '2vh', sm: '3vh', md: '2vw' },
              width: '100%',
              maxWidth: '90vw',
              // 뷰포트 높이에서 헤더와 여백을 뺀 만큼만 사용
              maxHeight: { 
                xs: '100%',
                md: 'calc(80vh - 64px)' 
              },
            }}
          >
            <Button 
              variant="contained" 
              size="large"
              sx={{
                width: '100%',
                height: '100%',
                // 동적 패딩 - 화면이 작으면 패딩도 줄어듦
                py: 'clamp(1.5rem, 4vh, 4rem)',
                px: 'clamp(1.5rem, 6vw, 6rem)',
                // 동적 폰트 크기 - 최소값을 더 작게
                fontSize: 'clamp(0.875rem, 2.5vw, 2rem)',
                fontWeight: 'bold',
                // 최소/최대 크기 조정
                minWidth: { xs: 180, sm: 200, md: 250 },
                minHeight: { xs: 60, sm: 80, md: 100 },
                maxHeight: { xs: 200, md: 300 },
                bgcolor: '#2196F3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  bgcolor: '#1976D2',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.2s'
              }}
            >
              총괄 대시보드
            </Button>
            
            <Button 
              variant="contained" 
              size="large"
              sx={{
                width: '100%',
                height: '100%',
                py: 'clamp(1.5rem, 4vh, 4rem)',
                px: 'clamp(1.5rem, 6vw, 6rem)',
                fontSize: 'clamp(0.875rem, 2.5vw, 2rem)',
                fontWeight: 'bold',
                minWidth: { xs: 180, sm: 200, md: 250 },
                minHeight: { xs: 60, sm: 80, md: 100 },
                maxHeight: { xs: 200, md: 300 },
                bgcolor: '#FF9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  bgcolor: '#F57C00',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.2s'
              }}
            >
              목차 학습 (Ordo)
            </Button>
            
            <Button 
              variant="contained" 
              size="large"
              sx={{
                width: '100%',
                height: '100%',
                py: 'clamp(1.5rem, 4vh, 4rem)',
                px: 'clamp(1.5rem, 6vw, 6rem)',
                fontSize: 'clamp(0.875rem, 2.5vw, 2rem)',
                fontWeight: 'bold',
                minWidth: { xs: 180, sm: 200, md: 250 },
                minHeight: { xs: 60, sm: 80, md: 100 },
                maxHeight: { xs: 200, md: 300 },
                bgcolor: '#9C27B0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&:hover': {
                  bgcolor: '#7B1FA2',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.2s'
              }}
            >
              페이지 학습 (Pagina)
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 개발자 모드 활성화 시 표시되는 정보 */}
      {devMode && (
        <Box 
          sx={{ 
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            p: 2, 
            bgcolor: '#f5f5f5', 
            borderRadius: 1,
            boxShadow: 2,
            maxWidth: '90vw',
            zIndex: 1000 // 다른 요소 위에 표시
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
