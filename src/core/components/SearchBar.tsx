import React, { useState, useEffect, useRef } from 'react';
import { InputBase, IconButton, Paper, Box, Typography, ClickAwayListener } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { sampleProducts } from '../data/sampleProducts';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<typeof sampleProducts>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowResults(true);
    } else {
      setFilteredProducts([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(true);
    }
  };

  const handleProductClick = (id: string) => {
    setShowResults(false);
    setSearchTerm('');
    navigate(`/product/${id}`);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowResults(false)}>
      <Box sx={{ 
        position: 'relative', 
        width: { xs: '100%', sm: '60%', md: '40%' },
        p: 2,
        zIndex: 1300
      }} ref={searchRef}>
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: 'flex',
            border: '1px solid #e0e0e0',
            boxShadow: 'none',
            zIndex: 1301, 
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Rechercher dans le catalogue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.trim() && setShowResults(true)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {showResults && filteredProducts.length > 0 && (
          <Paper
            sx={{
              position: 'absolute',
              mr: 2,
              zIndex: 1302, 
              maxHeight: 350,
              overflowY: 'auto',
              mt: 0.5,
              boxShadow: 3
            }}
          >
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: 'contain',
                    mr: 2,
                    border: '1px solid #eee',
                    borderRadius: 1,
                    p: 0.5,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textAlign: 'left',
                  }}
                >
                  {product.name}
                </Typography>
              </Box>
            ))}
          </Paper>
        )}

        {showResults && searchTerm.trim() && filteredProducts.length === 0 && (
          <Paper
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              mr: 2,
              ml: 2,
              zIndex: 1302,
              p: 2,
              mt: 0.5,
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Aucun résultat trouvé pour "{searchTerm}"
            </Typography>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;