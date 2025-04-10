export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(price);
};

export const formatDeliveryDate = (timestamp: number): string => {
  if (!timestamp) return 'Date de livraison indisponible';
  
  const date = new Date(timestamp);
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
};

export const stripHtmlAndTruncate = (html: string, maxLength: number): string => {
  if (!html) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
  if (textContent.length <= maxLength || maxLength <= 0) {
    return textContent;
  }
  
  return textContent.substring(0, maxLength) + '...';
};