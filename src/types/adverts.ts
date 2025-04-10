export interface Adverts {
    advertId: number,
    availableShippingTypes: {label:string}[],
    expressDeliveryDate: number,
    imagesUrls: string[],
    monthlyPayments: {
        description: string,
        image: string,
        monthlyAmount: number,
        title: string,
    }[],
    refurbished: boolean,
    salePrice: number,
    shippingAmount: number,
    seller: {
        type: string,
    },
    crewDetails: {
        brand: {
            cashback: {value: number},
            name: string,
            logo: string,
        }
    }
    sellerComment: string,
    type: string,
}