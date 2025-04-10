import { Adverts } from "./adverts";
import { Breadcrumbs } from "./breadcrumbs";
import { ClusterProduct } from "./clusterProduct";
import { DeclinationGroupsFromMFP } from "./declinationGroupsFromMFP";
import { Review } from "./review";

export interface Product {
    id: number,
    imagesUrls: string[],
    headline: string,
    contributor: string,
    description: string,
    edito: string,
    declinationGroupsFromMFP: DeclinationGroupsFromMFP,
    bestPrice: number,
    clusterProducts: ClusterProduct[],
    breadcrumbs: Breadcrumbs[],
    collapseBestPrice: string,
    collectibleBestPrice: number,
    newBestPrice: number,
    newBestPriceByCluster: string,
    summaryBestPrice: string,
    summaryNewBestPrice: string,
    usedBestPrice: number,
    firstSelectorInternalLabel: string,
    firstSelectorLabel: string,
    globalRating: {score: number, nbReviews: number},
    reviews:Review[]
    adverts: Adverts[],
}