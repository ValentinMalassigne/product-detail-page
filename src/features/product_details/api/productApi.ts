import { Product } from '../../../types/product'

export async function fetchProductById(productId: string) {
  const response = await fetch(`https://api-rakuten-vis.koyeb.app/product/${productId}`)
  
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  
  const responseData = await response.json()
  const data = responseData.data

  const product: Product = {
    imagesUrls: data.imagesUrls,
    headline: data.headline,
    contributor: data.contributor.caption,
    description: data.description,
    bestPrice: data.bestPrice,
    collapseBestPrice: data.collapseBestPrice,
    collectibleBestPrice: data.collectibleBestPrice,
    newBestPrice: data.newBestPrice,
    newBestPriceByCluster: data.newBestPriceByCluster,
    summaryBestPrice: data.summaryBestPrice,
    summaryNewBestPrice: data.summaryNewBestPrice,
    usedBestPrice: data.usedBestPrice,
    clusterProducts: data.clusterProducts,
    breadcrumbs: data.breadcrumbs,
    edito: data.edito,
    declinationGroupsFromMFP: data.declinationGroupsFromMFP,
    firstSelectorInternalLabel: data.firstSelectorInternalLabel,
    firstSelectorLabel: data.firstSelectorLabel,
    id: data.id,
    globalRating: data.globalRating,
    adverts: data.adverts,
    reviews: data.reviews,
  }
  return product
}
