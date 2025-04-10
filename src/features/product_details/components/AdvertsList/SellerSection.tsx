import React, { useState, useMemo } from 'react';
import { Box, Typography, Chip, Avatar, Button, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { stripHtmlAndTruncate } from './utils';

interface SellerSectionProps {
  seller: {
    type: string;
  };
  crewDetails?: {
    brand: {
      cashback: { value: number };
      name: string;
      logo: string;
    };
  };
  sellerComment?: string;
}

const SellerSection: React.FC<SellerSectionProps> = ({
  seller,
  crewDetails,
  sellerComment
}) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const maxLength = 130;
  
  const isCommentTruncated = useMemo(() => {
    if (!sellerComment) return false;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sellerComment;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.length > maxLength;
  }, [sellerComment]);

  const commentText = useMemo(() => {
    if (!sellerComment) return '';
    if (showFullComment) {
      return stripHtmlAndTruncate(sellerComment, 0);
    }
    return stripHtmlAndTruncate(sellerComment, maxLength);
  }, [sellerComment, showFullComment]);

  const toggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  return (
    <Box>
      {crewDetails && crewDetails.brand && (
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {crewDetails.brand.logo && (
                <Avatar 
                  src={crewDetails.brand.logo} 
                  alt={crewDetails.brand.name}
                  sx={{ 
                    height: 40, 
                    width: 40, 
                    mr: 1,
                    '& img': {
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                      padding: '2px'
                    }
                  }}
                />
              )}
              <Typography variant="subtitle2">
                {crewDetails.brand.name}
              </Typography>
            </Box>
            
            <Chip
              label={seller.type}
              size="small"
              variant="outlined"
              color="primary"
            />
          </Box>
          
          {crewDetails.brand.cashback.value > 0 && (
            <Box sx={{ mt: 0.5 }}>
              <Typography 
                variant="body2" 
                color="success.main" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                <img 
                  src="https://images.fr.shopping.rakuten.com/visuels/Club-Rakuten/icon/club-rd1.svg" 
                  alt="Club Rakuten" 
                  style={{ height: 20, marginRight: 8 }} 
                />
                {crewDetails.brand.cashback.value}% de cashback 
                <Link 
                  href="https://fr.shopping.rakuten.com/event/club-rakuten" 
                  color="primary" 
                  sx={{ ml: 1, fontSize: '0.875rem' }}
                  underline="hover"
                >
                  En savoir plus
                </Link>
              </Typography>
            </Box>
          )}
        </Box>
      )}
      
      {(!crewDetails || !crewDetails.brand) && (
        <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          Vendeur {seller.type === "PRO" ? 'Professionnel' : 'Particulier'}
        </Typography>
      )}
      
      {sellerComment && (
        <Box sx={{ mt: 2 }}>
          <Typography 
            variant="subtitle2" 
            gutterBottom 
            sx={{ 
              textAlign: 'left',
            }}
          >
            {commentText}
          </Typography>
          
          {isCommentTruncated && (
            <Button
              size="small"
              color="primary"
              onClick={toggleComment}
              sx={{ mt: 0.5, p: 0, minWidth: 'auto', textTransform: 'none', fontWeight: 'normal' }}
              endIcon={showFullComment ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            >
              {showFullComment ? 'Voir moins' : 'Voir plus'}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SellerSection;