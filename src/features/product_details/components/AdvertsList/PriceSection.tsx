import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CachedIcon from '@mui/icons-material/Cached';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import { formatPrice } from './utils';

interface PriceSectionProps {
  salePrice: number;
  monthlyPayments?: {
    description: string;
    image: string;
    monthlyAmount: number;
    title: string;
  }[];
  refurbished: boolean;
  type: string;
}

const PriceSection: React.FC<PriceSectionProps> = ({ 
  salePrice, 
  monthlyPayments, 
  refurbished,
  type 
}) => {
  const getConditionChip = () => {
    if (type === 'NEW') {
      return (
        <Chip 
          label="Neuf" 
          size="small" 
          color="default" 
          sx={{ mb: 1, maxWidth: 'fit-content' }} 
        />
      );
    } else if (type === 'USED') {
      if (refurbished) {
        return (
          <Chip 
            icon={<CachedIcon />} 
            label="Reconditionné" 
            size="small" 
            color="info" 
            sx={{ mb: 1, maxWidth: 'fit-content' }} 
          />
        );
      } else {
        return (
          <Chip 
            icon={<HistoryIcon />} 
            label="Occasion" 
            size="small" 
            color="success" 
            sx={{ mb: 1, maxWidth: 'fit-content' }} 
          />
        );
      }
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '165px', justifyContent: 'space-between' }}>
      {getConditionChip()}
      
      <Typography variant="h5" component="div" color="primary" fontWeight="bold">
        {formatPrice(salePrice)}
      </Typography>
      
      {monthlyPayments && monthlyPayments.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
            <CreditCardIcon fontSize="small" sx={{ mr: 1 }} />
            Paiement en plusieurs fois
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dès {formatPrice(monthlyPayments[0].monthlyAmount)} par mois
          </Typography>
        </Box>
      )}
      
      <Button 
        variant="contained" 
        startIcon={<ShoppingCartIcon />}
        sx={{ mt: 2 }}
        fullWidth
      >
        Ajouter au panier
      </Button>
    </Box>
  );
};

export default PriceSection;