import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import { Adverts } from '../../../../types/adverts';
import PriceSection from './PriceSection';
import ShippingSection from './ShippingSection';
import SellerSection from './SellerSection';

interface AdvertCardProps {
  advert: Adverts;
}

const AdvertCard: React.FC<AdvertCardProps> = ({ advert }) => {
  return (
    <Card sx={{ width: '100%', boxShadow: 2, overflow: 'hidden' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <PriceSection 
              salePrice={advert.salePrice}
              monthlyPayments={advert.monthlyPayments}
              refurbished={advert.refurbished}
              type={advert.type}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ShippingSection 
              availableShippingTypes={advert.availableShippingTypes}
              shippingAmount={advert.shippingAmount}
              expressDeliveryDate={advert.expressDeliveryDate}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <SellerSection 
              seller={advert.seller}
              crewDetails={advert.crewDetails}
              sellerComment={advert.sellerComment}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AdvertCard;