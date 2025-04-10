import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Box, 
  CircularProgress, 
  Container, 
  Grid, 
  Typography,
  Button,
  Paper,
  Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { RootState, AppDispatch } from '../../redux/store'
import { getProductById } from './redux/productSlice'
import ProductImage from './components/ProductImage'
import ProductInfo from './components/ProductInfo'
import DeclinationSelect from './components/DeclinationSelect'
import FilterButtons from './components/FilterButtons'
import ProductDescription from './components/ProductDescription'
import ProductReviews from './components/ProductReviews'
import BreadcrumbsNavigation from './components/BreadcrumbsNavigation'
import AdvertsList from './components/AdvertsList/AdvertsList'

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const reviewsRef = useRef<HTMLDivElement>(null)
  const { product, loading, error } = useSelector((state: RootState) => state.product)
  
  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId))
    }
  }, [dispatch, productId])

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  if (!product) return null

  const productIdMismatch = parseInt(productId!) !== product.id

  if (productIdMismatch) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          
          <Typography variant="h5">
            Erreur de produit
          </Typography>
          
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              maxWidth: '80%', 
              mx: 'auto',  
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center' 
              }
            }}
          >
            Erreur lors du chargement du produit.
            <br />
            Ce produit n'est plus disponible ou a été remplacé.
          </Alert>
          
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            size="large"
          >
            Retour à la liste des produits
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <BreadcrumbsNavigation breadcrumbs={product.breadcrumbs} />
      </Box>
      
      <Grid container spacing={4}>
        {product.imagesUrls && product.imagesUrls.length > 0 && (
           <Grid size={{ xs: 12, md: 5, lg: 4 }}>
           <ProductImage 
             images={product.imagesUrls}
             name={product.headline} 
           />
         </Grid>
        )}
       
        
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <ProductInfo 
              name={product.headline}
              contributor={product.contributor}
              rating={product.globalRating}
              onRatingClick={scrollToReviews}
            />
            
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 2
            }}>
              {product.clusterProducts && product.clusterProducts.length > 0 && (
                <DeclinationSelect 
                  declinationGroupsFromMFP={product.declinationGroupsFromMFP} 
                  firstSelectorInternalLabel={product.firstSelectorInternalLabel} 
                  productId={product.id} 
                />
              )}
              <FilterButtons productId={product.id} adverts={product.adverts} />
            </Box>

            <AdvertsList adverts={product.adverts} />
          </Box>
        </Grid>
      </Grid>
      
      <ProductDescription 
        description={product.description} 
        edito={product.edito}
      />
      
      {product.reviews.length > 0 && 
        <div ref={reviewsRef}>
          <ProductReviews 
            globalRating={product.globalRating} 
            reviews={product.reviews}
          />
        </div>
      }
    </Container>
  )
}

export default ProductDetailsPage