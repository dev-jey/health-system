export interface Scheme {
    created_at: string,
    file: string,
    id: number
    name: string
    scheme: {
        id: number, scheme_code: string, scheme_name: string, payer_id: number, corp_id: number, anniv: number,
        claim_limit: number
        client: number
        created_at: string
        end_date: string
        legal_entity: number
        max_children: number
        max_disabled_children: number
        max_spouse: number
        preauth_limit: number
        primary_authentication: number
        renewal_end_date?: string
        renewal_start_date?: string
        scheme_category: number
        start_date: string
        uid_limit: number
        updated_at: string
    }
    scheme_id: number
    updated_at: string
}