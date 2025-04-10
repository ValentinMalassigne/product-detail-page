import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { DeclinationGroupsFromMFP } from '../../../types/declinationGroupsFromMFP'

interface ClusterButtonsProps {
  declinationGroupsFromMFP: DeclinationGroupsFromMFP;
  firstSelectorInternalLabel: string;
  productId: number;
}

export default function DeclinationSelect({ 
  declinationGroupsFromMFP, 
  firstSelectorInternalLabel,
  productId 
}: ClusterButtonsProps) {
  
  const findDefaultSelectedGroup = () => {
    for (const group of declinationGroupsFromMFP.groups) {
      const matchingProduct = group.groupProducts.find(product => product.id === productId);
      if (matchingProduct) {
        return group.groupKeyValue;
      }
    }
    return declinationGroupsFromMFP.groups[0]?.groupKeyValue || '';
  };

  const defaultValue = findDefaultSelectedGroup();

  return (
    <Box sx={{ 
      my: { xs: 0, sm: 0 } // Reduce vertical margins
    }}>
      <FormControl 
        variant="outlined" 
        sx={{ 
          width: { xs: '100%', sm: '40%', md: '40%', lg: '40%' },
          minWidth: '250px',
        }}
      >
        <InputLabel id="product-variant-select-label" sx={{ textAlign: 'left' }}>
          {firstSelectorInternalLabel}
        </InputLabel>
        <Select
          labelId="product-variant-select-label"
          id="product-variant-select"
          defaultValue={defaultValue}
          label={firstSelectorInternalLabel}
          MenuProps={{
            disableScrollLock: true
          }}
        >
          {declinationGroupsFromMFP.groups.map((group) => {
            const isDefault = group.groupKeyValue === defaultValue;
            
            return (
              <MenuItem 
                    value={group.groupKeyValue}
                    disabled={!isDefault}
                    sx={{
                      opacity: isDefault ? 1 : 0.6,
                    }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                    {group.groupKeyValue}
                  </Typography>
                  <Typography>
                    {isDefault ? (group.newBestPriceForGroupProduct.toFixed(2) +" €"): "Indisponible"}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
