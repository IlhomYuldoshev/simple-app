export type GetVariationsBody = {
    page: number
    size: number
}

export type GetVariationsResponse = {
    page: number
    items: Variation[]
    total_count: number
}

export type Variation = {
    sku: string
    supplier: string
    supplierId: number
    category: string | null
    id: number
    barcode: string
    lastUpdateTime: string
    showMarket: true
    name: string
    uploadedImages: unknown[]
    innerHitIds: number[] | null
    technicalCard: boolean
    importProperties: unknown[]
}
