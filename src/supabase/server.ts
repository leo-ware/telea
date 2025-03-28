import 'server-only'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { Database } from './types'
import { cookies } from 'next/headers'

export const createClient = () => {
    // @ts-ignore
    const cookieStore = cookies()

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    // @ts-ignore
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        // @ts-ignore
                        cookieStore.set({ name, value, ...options })
                        // The `set` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                    catch (error) {
                        console.error("Error setting cookie: ", error)
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        // @ts-ignore
                        cookieStore.set({ name, value: '', ...options })
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}