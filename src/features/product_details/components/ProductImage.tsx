import { useState } from 'react'
import { Paper, CardMedia, Box } from '@mui/material'

interface ProductImageProps {
  images: string[]
  name: string
}

function ProductImage({ images = [], name }: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <CardMedia
        component="img"
        height="400"
        image={selectedImage}
        alt={name}
        loading="lazy"
        sx={{ objectFit: "contain", mb: 2 }}
      />
      
      {images.length > 1 && (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center'
        }}>
          {images.map((img, index) => (
            <Box 
              key={index}
              onClick={() => setSelectedImage(img)}
              sx={{
                width: 60,
                height: 60,
                cursor: 'pointer',
                border: img === selectedImage ? '2px solid #1976d2' : '1px solid #ddd',
                borderRadius: 1,
                p: 0.5,
                transition: 'all 0.2s'
              }}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`${name} - image ${index + 1}`}
                loading="lazy"
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: "contain" 
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  )
}

export default ProductImage