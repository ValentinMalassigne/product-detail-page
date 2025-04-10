import { Box, Typography, Rating, Stack, Link } from '@mui/material'

interface ProductInfoProps {
  name: string
  contributor: string
  rating?: {
    score: number
    nbReviews: number
  }
  onRatingClick?: () => void
}

function ProductInfo({ name, contributor, rating, onRatingClick }: ProductInfoProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ wordWrap: 'break-word', overflowWrap: 'break-word', textAlign: 'left' }}>
        {name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ textAlign: 'left' }}>
        Produit de {contributor}
      </Typography>
      
      {rating && rating.nbReviews > 0 && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <Rating 
            value={rating.score} 
            precision={0.5} 
            readOnly 
          />
          <Link 
            component="button"
            variant="body2"
            onClick={onRatingClick}
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            ({rating.nbReviews} avis)
          </Link>
        </Stack>
      )}
    </Box>
  )
}

export default ProductInfo