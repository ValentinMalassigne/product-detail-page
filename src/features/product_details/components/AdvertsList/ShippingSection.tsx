import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { formatPrice, formatDeliveryDate } from './utils';

interface ShippingSectionProps {
  availableShippingTypes: { label: string }[];
  shippingAmount: number;
  expressDeliveryDate?: number;
}

const ShippingSection: React.FC<ShippingSectionProps> = ({
  availableShippingTypes,
  shippingAmount,
  expressDeliveryDate
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        <LocalShippingIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
        Options de livraison
      </Typography>
      
      {availableShippingTypes && availableShippingTypes.length > 0 ? (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {availableShippingTypes.map((type, id) => (
            <Chip key={id} label={type.label} size="small" variant="outlined" sx={{ mb: 1 }} />
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Livraison standarde
        </Typography>
      )}
      
      {shippingAmount > 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Frais: {formatPrice(shippingAmount)}
        </Typography>
      ) : (
        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
          Livraison gratuite
        </Typography>
      )}
      
      {expressDeliveryDate && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Livraison express le : {formatDeliveryDate(expressDeliveryDate)}
        </Typography>
      )}
    </Box>
  );
};

export default ShippingSection;