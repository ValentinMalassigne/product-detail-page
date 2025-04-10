import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Stack, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Adverts } from '../../../../types/adverts';
import AdvertCard from './AdvertCard';

interface AdvertsListProps {
  adverts: Adverts[];
}

const AdvertsList: React.FC<AdvertsListProps> = ({ adverts }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get('filter');
  const ITEMS_PER_PAGE = 5;
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const filteredAdverts = useMemo(() => {
    if (!filter) return adverts;

    return adverts.filter(advert => {
      switch (filter) {
        case 'neuf':
          return advert.type === 'NEW';
        case 'occasion':
          return advert.type === 'USED' && !advert.refurbished;
        case 'reconditionne':
          return advert.type === 'USED' && advert.refurbished;
        default:
          return true;
      }
    });
  }, [adverts, filter]);

  const handleShowMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredAdverts.length));
  };

  const handleShowLess = () => {
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const advertsToDisplay = filteredAdverts.slice(0, displayCount);

  if (!filteredAdverts || filteredAdverts.length === 0) {
    return (
      <Box sx={{ mt: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Aucunes offres disponible pour le moment
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, width: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        {filteredAdverts.length} Offre{filteredAdverts.length > 1 ? "s" : ""} disponible{filteredAdverts.length > 1 ? "s" : ""} 
      </Typography>
      
      <Stack spacing={2}>
        {advertsToDisplay.map((advert) => (
          <AdvertCard key={advert.advertId} advert={advert} />
        ))}
      </Stack>

      {filteredAdverts.length > ITEMS_PER_PAGE && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          {displayCount < filteredAdverts.length ? (
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleShowMore}
              endIcon={<ExpandMoreIcon />}
            >
              Voir plus d'offres ({filteredAdverts.length - displayCount} restantes)
            </Button>
          ) : (
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleShowLess}
              endIcon={<ExpandLessIcon />}
            >
              Voir moins d'offres
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AdvertsList;