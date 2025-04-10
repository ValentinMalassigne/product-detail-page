import { Box, Typography, Divider, Paper } from '@mui/material'

interface ProductDescriptionProps {
  description: string
  edito: string
}

function ProductDescription({ description, edito }: ProductDescriptionProps) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, mt: 4 }}>
      {description && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }} />
        </Box>
      )}
      
      {edito && (
        <>
          {description && <Divider sx={{ my: 3 }} />}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
              Notes du fabriquant
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: edito }} />
          </Box>
        </>
      )}
    </Paper>
  )
}

export default ProductDescription