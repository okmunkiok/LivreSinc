import { Box, Button, Typography, Container } from '@mui/material';

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh', // 화면 전체 높이를 차지하도록
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          LivreSinc
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          목차와 페이지 암기를 위한 SRS 시스템
        </Typography>

        <Box
          sx={{
            display: 'flex',
            // 화면 너비가 900px 이상(md)이면 가로(row)로, 그 이하면 세로(column)로 배열
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2, // 버튼 사이의 간격
          }}
        >
          <Button variant="contained" size="large">
            총괄 대시보드
          </Button>
          <Button variant="contained" size="large">
            목차 학습 (Ordo)
          </Button>
          <Button variant="contained" size="large">
            페이지 학습 (Pagina)
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
