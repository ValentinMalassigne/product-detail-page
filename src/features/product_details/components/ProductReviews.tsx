import React from 'react';
import { Box, Typography, Divider, Paper, Rating, Avatar, Grid } from '@mui/material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Review {
  note: number;
  title: string;
  author: { firstName: string };
  date: number;
  description: string;
}

interface ProductReviewsProps {
  globalRating: {
    score: number;
    nbReviews: number;
  };
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ globalRating, reviews }) => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, mt: 4 }} id="reviews-section">
      <Box mb={3}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
          Avis clients ({globalRating.nbReviews})
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={globalRating.score} precision={0.5} readOnly sx={{ mr: 1 }} />
          <Typography variant="body1">
            {globalRating.score.toFixed(1)}/5 ({globalRating.nbReviews} avis)
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {reviews && reviews.length > 0 ? (
          <Box>
            {reviews.map((review, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                  <Grid >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {review.author.firstName.charAt(0)}
                    </Avatar>
                  </Grid>
                  <Grid >
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="subtitle1" component="span">
                        {review.author.firstName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 2 }}>
                        {format(new Date(review.date), 'd MMMM yyyy', { locale: fr })}
                      </Typography>
                    </Box>
                    
                    <Rating value={review.note} precision={0.5} readOnly size="small" sx={{ mb: 1 }} />
                    
                    {review.title && (
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        {review.title}
                      </Typography>
                    )}
                    
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                      {review.description}
                    </Typography>
                  </Grid>
                </Grid>
                
                {index < reviews.length - 1 && <Divider sx={{ my: 3 }} />}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
            Aucun avis détaillé disponible pour ce produit.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ProductReviews;