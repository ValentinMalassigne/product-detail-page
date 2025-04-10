import { Box, Button, ButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Adverts } from '../../../types/adverts';

interface FilterButtonsProps {
  productId: number;
  adverts: Adverts[]; 
}

function FilterButtons({ productId, adverts }: FilterButtonsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const searchParams = new URLSearchParams(location.search);
  const currentFilter = searchParams.get('filter') || '';
  
  const newCount = adverts.filter(advert => advert.type === 'NEW').length;
  const usedCount = adverts.filter(advert => advert.type === 'USED' && !advert.refurbished).length;
  const refurbishedCount = adverts.filter(advert => advert.type === 'USED' && advert.refurbished).length;

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(location.search);
    
    if (currentFilter === filter) {
      params.delete('filter');
    } else {
      params.set('filter', filter);
    }
    
    navigate(`/product/${productId}?${params.toString()}`);
  };

  const filterOptions = [
    { id: 'neuf', label: isMobile ? 'Neuf' : 'Neuf', count: newCount },
    { id: 'occasion', label: isMobile ? 'Occ.' : 'Occasion', count: usedCount },
    { id: 'reconditionne', label: isMobile ? 'Recon.' : 'Reconditionné', count: refurbishedCount }
  ];

  return (
    <Box sx={{ 
      ml: { xs: 0, sm: 0 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}>
      <ButtonGroup variant="outlined" sx={{ height: '57px' }}>
        {filterOptions.map(option => (
          <Button 
            key={option.id}
            onClick={() => handleFilterChange(option.id)}
            color={currentFilter === option.id ? 'primary' : 'inherit'}
            disabled={option.count === 0}
            sx={{ 
              fontWeight: currentFilter === option.id ? 'bold' : 'normal',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              '&.MuiButton-outlined': {
                borderColor: currentFilter === option.id ? undefined : 'rgba(0, 0, 0, 0.23)'
              }
            }}
          >
            {option.label} {option.count > 0 && 
              <Typography component="span" sx={{ ml: 0.5, fontSize: '0.8rem' }}>
                ({option.count})
              </Typography>}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default FilterButtons;