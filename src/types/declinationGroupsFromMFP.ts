export interface DeclinationGroupsFromMFP {
    groups: {
        groupKeyValue: string,
        newBestPriceForGroupProduct: number,
        groupProducts: {
            id: number,
            title: string,
            newBPrice: number,
            url: string,
            imgUrl: string,
        }[],
    }[],

}