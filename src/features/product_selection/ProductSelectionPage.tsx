import { Link } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { sampleProducts } from '../../core/data/sampleProducts';

function ProductSelectionPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 2, py: 2 }}>
      <Grid container spacing={4}>
        {sampleProducts.map(product => (
          <Grid size={{ xs: 12, sm: 6 }} key={product.id}>
            <Card 
              sx={{ 
                height: '100%', 
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              <CardActionArea component={Link} to={`/product/${product.id}`} sx={{ height: '100%', 
              }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "contain", padding: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" textAlign={"center"}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold" textAlign={"center"}>
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductSelectionPage