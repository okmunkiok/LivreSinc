// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
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
  
  // 기본 미디어 쿼리
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 600px 미만
  const isTablet = useMediaQuery(theme.breakpoints.down('md')); // 900px 미만
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 900px 이상
  
  // 화면 크기 직접 감지
  const [screenOrientation, setScreenOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }
    return 'portrait';
  });

  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setScreenOrientation(isPortraitMode ? 'portrait' : 'landscape');
    };

    // 초기 설정
    handleResize();

    // 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // 세로 레이아웃 사용 조건 (더 명확하게)
  const useVerticalLayout = isMobile || (isTablet && screenOrientation === 'portrait') || (!isDesktop && screenOrientation === 'portrait');
  
  const { devMode, setDevMode, showCharacter, setShowCharacter } = useAppSettings();
  const [user, setUser] = useState<null | { name: string }>(null);

  const handleLogin = () => {
    setUser({ name: '사용자' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // 공통 패딩값 설정
  const commonPadding = { xs: 2, sm: 3 };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 전체를 감싸는 컨테이너로 좌우 패딩 통일 */}
      <Box sx={{ px: commonPadding, pt: 1, pb: 0 }}>
        {/* 헤더 - margin 제거하고 borderRadius 유지 */}
        <AppBar 
          position="static" 
          sx={{ 
            bgcolor: '#8BC34A',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Toolbar sx={{ height: { xs: 56, sm: 64 }, minHeight: 0 }}>
            {/* 로고/타이틀 with 캐릭터 */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1,
                cursor: 'pointer',
                height: '100%',
                '&:hover': {
                  opacity: 0.9
                }
              }}
              onClick={() => navigate('/')}
            >
              {showCharacter && (
                <Box sx={{ 
                  height: '100%',
                  display: 'flex', 
                  alignItems: 'center',
                }}>
                  <CharacterMascot 
                    page="homepage"
                    emotion="header"
                    height="100%"
                    style={{ 
                      marginRight: '8px',
                      height: '100%',
                      width: 'auto'
                    }}
                  />
                </Box>
              )}
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
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
                  size="small"
                  sx={{ 
                    color: 'white',
                    '&.Mui-checked': { color: 'white' },
                    padding: '4px'
                  }}
                />
              }
              label="캐릭터 표시"
              sx={{ 
                color: 'white',
                mr: 1,
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
            />

            {/* 개발자 모드 체크박스 */}
            <FormControlLabel
              control={
                <Checkbox 
                  checked={devMode} 
                  onChange={(e) => setDevMode(e.target.checked)}
                  size="small"
                  sx={{ 
                    color: 'white',
                    '&.Mui-checked': { color: 'white' },
                    padding: '4px'
                  }}
                />
              }
              label="개발자 모드"
              sx={{ 
                color: 'white',
                mr: 1,
                '& .MuiFormControlLabel-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
            />

            {/* 로그인/로그아웃 버튼 */}
            {user ? (
              <Button 
                color="inherit" 
                onClick={handleLogout}
                size="small"
                sx={{ 
                  border: '1px solid white',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  py: 0.5,
                  px: { xs: 0.75, sm: 1 },
                  minWidth: 'auto',
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
                size="small"
                sx={{ 
                  border: '1px solid white',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  py: 0.5,
                  px: { xs: 0.75, sm: 1 },
                  minWidth: 'auto',
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
      </Box>

      {/* 메인 컨텐츠 - 동일한 좌우 패딩 */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          px: commonPadding,
          py: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: useVerticalLayout ? '1fr' : 'repeat(3, 1fr)', // 명확한 조건
            gridAutoRows: 'minmax(100px, auto)',
            gap: { xs: '8px', sm: '12px', md: '16px' },
            width: '100%',
            maxWidth: '1200px',
            height: (!useVerticalLayout) ? 'auto' : '100%',
          }}
        >
          {/* 총괄 대시보드 버튼 - 노란색 */}
          <Button 
            variant="contained" 
            size="large"
            sx={{
              width: '100%',
              height: '100%',
              py: { 
                xs: 'clamp(1rem, 3vh, 2rem)', 
                sm: 'clamp(1.5rem, 3vh, 3rem)', 
                md: 3 
              },
              px: { xs: 2, sm: 2.5, md: 3 },
              fontSize: { 
                xs: 'clamp(1rem, 4vw, 1.375rem)',
                sm: 'clamp(1.25rem, 3vw, 1.75rem)', 
                md: 'clamp(1.5rem, 2.5vw, 2rem)'
              },
              fontWeight: 'bold',
              bgcolor: '#FFD54F',
              color: 'rgba(0, 0, 0, 0.87)',
              display: 'flex',
              flexDirection: useVerticalLayout ? 'row' : 'column', // 명확한 조건
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: { xs: 1.5, md: 1.5 },
              boxShadow: 2,
              borderRadius: 2,
              minHeight: { 
                xs: '80px', 
                sm: '100px', 
                md: (!useVerticalLayout) ? '120px' : '140px' 
              },
              '&:hover': {
                bgcolor: '#FFC107',
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.2s'
            }}
          >
            {showCharacter && (
              <Box sx={{ 
                flex: useVerticalLayout ? '0 0 auto' : '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: useVerticalLayout ? 'auto' : '100%',
                height: useVerticalLayout ? '90%' : 'auto',
                maxWidth: useVerticalLayout ? '35%' : '100%',
              }}>
                <CharacterMascot 
                  page="homepage"
                  emotion="dashboard"
                  height={useVerticalLayout ? '100%' : 'auto'}
                  style={{ 
                    width: useVerticalLayout ? 'auto' : '90%',
                    height: useVerticalLayout ? '100%' : 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
            )}
            <Typography sx={{ 
              flex: useVerticalLayout ? '1 1 auto' : '0 0 auto',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              whiteSpace: 'nowrap'
            }}>
              총괄 대시보드
            </Typography>
          </Button>
          
          {/* 목차 학습 버튼 - 밝은 갈색 */}
          <Button 
            variant="contained" 
            size="large"
            sx={{
              width: '100%',
              height: '100%',
              py: { 
                xs: 'clamp(1rem, 3vh, 2rem)', 
                sm: 'clamp(1.5rem, 3vh, 3rem)', 
                md: 3 
              },
              px: { xs: 2, sm: 2.5, md: 3 },
              fontSize: { 
                xs: 'clamp(1rem, 4vw, 1.375rem)',
                sm: 'clamp(1.25rem, 3vw, 1.75rem)', 
                md: 'clamp(1.5rem, 2.5vw, 2rem)'
              },
              fontWeight: 'bold',
              bgcolor: '#A1887F',
              color: 'white',
              display: 'flex',
              flexDirection: useVerticalLayout ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: { xs: 1.5, md: 1.5 },
              boxShadow: 2,
              borderRadius: 2,
              minHeight: { 
                xs: '80px', 
                sm: '100px', 
                md: (!useVerticalLayout) ? '120px' : '140px' 
              },
              '&:hover': {
                bgcolor: '#8D6E63',
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.2s'
            }}
          >
            {showCharacter && (
              <Box sx={{ 
                flex: useVerticalLayout ? '0 0 auto' : '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: useVerticalLayout ? 'auto' : '100%',
                height: useVerticalLayout ? '90%' : 'auto',
                maxWidth: useVerticalLayout ? '35%' : '100%',
              }}>
                <CharacterMascot 
                  page="homepage"
                  emotion="ordo"
                  height={useVerticalLayout ? '100%' : 'auto'}
                  style={{ 
                    width: useVerticalLayout ? 'auto' : '90%',
                    height: useVerticalLayout ? '100%' : 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
            )}
            <Typography sx={{ 
              flex: useVerticalLayout ? '1 1 auto' : '0 0 auto',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              whiteSpace: 'nowrap'
            }}>
              목차 학습
            </Typography>
          </Button>
          
          {/* 페이지 학습 버튼 - 밝은 분홍보라 */}
          <Button 
            variant="contained" 
            size="large"
            sx={{
              width: '100%',
              height: '100%',
              py: { 
                xs: 'clamp(1rem, 3vh, 2rem)', 
                sm: 'clamp(1.5rem, 3vh, 3rem)', 
                md: 3 
              },
              px: { xs: 2, sm: 2.5, md: 3 },
              fontSize: { 
                xs: 'clamp(1rem, 4vw, 1.375rem)',
                sm: 'clamp(1.25rem, 3vw, 1.75rem)', 
                md: 'clamp(1.5rem, 2.5vw, 2rem)'
              },
              fontWeight: 'bold',
              bgcolor: '#E91E63',
              color: 'white',
              display: 'flex',
              flexDirection: useVerticalLayout ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: { xs: 1.5, md: 1.5 },
              boxShadow: 2,
              borderRadius: 2,
              minHeight: { 
                xs: '80px', 
                sm: '100px', 
                md: (!useVerticalLayout) ? '120px' : '140px' 
              },
              '&:hover': {
                bgcolor: '#C2185B',
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.2s'
            }}
          >
            {showCharacter && (
              <Box sx={{ 
                flex: useVerticalLayout ? '0 0 auto' : '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: useVerticalLayout ? 'auto' : '100%',
                height: useVerticalLayout ? '90%' : 'auto',
                maxWidth: useVerticalLayout ? '35%' : '100%',
              }}>
                <CharacterMascot 
                  page="homepage"
                  emotion="pagina"
                  height={useVerticalLayout ? '100%' : 'auto'}
                  style={{ 
                    width: useVerticalLayout ? 'auto' : '90%',
                    height: useVerticalLayout ? '100%' : 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
            )}
            <Typography sx={{ 
              flex: useVerticalLayout ? '1 1 auto' : '0 0 auto',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              whiteSpace: 'nowrap'
            }}>
              페이지 학습
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* Footer with 저작권 표시 */}
      {showCharacter && (
        <Box 
          component="footer"
          sx={{ 
            textAlign: 'center', 
            py: { xs: 0.25, sm: 0.5 },
            px: 0.5,
            bgcolor: '#f5f5f5',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: { 
                xs: 'clamp(0.375rem, 1vw, 0.5rem)',
                sm: 'clamp(0.45rem, 1vw, 0.55rem)', 
                md: '0.6rem'
              },
              lineHeight: 1.2,
              display: 'block',
              maxWidth: '98%',
              mx: 'auto'
            }}
          >
            본 저작물은 경기도에서 공공누리 제4유형으로 개방한 
            봉공이 캐릭터를 이용하였으며, 
            해당 저작물은 경기도, https://www.gg.go.kr 에서 무료로 다운받으실 수 있습니다.
          </Typography>
        </Box>
      )}

      {/* 개발자 모드 표시 - 디버깅 정보 추가 */}
      {devMode && (
        <Box 
          sx={{ 
            position: 'fixed',
            bottom: showCharacter ? { xs: 25, sm: 35, md: 45 } : 10,
            left: '50%',
            transform: 'translateX(-50%)',
            p: 0.5, 
            bgcolor: '#f5f5f5', 
            borderRadius: 1,
            boxShadow: 2,
            maxWidth: '90vw',
            zIndex: 1000
          }}
        >
          <Typography sx={{ fontSize: { xs: '0.5rem', sm: '0.625rem', md: '0.75rem' } }}>
            개발자 모드 활성화됨 - 더미 데이터 사용 중
            <br />
            화면: {window.innerWidth}x{window.innerHeight} | 
            방향: {screenOrientation} | 
            레이아웃: {useVerticalLayout ? '세로' : '가로'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
