import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bdcakgabdfzvmckbynqx.supabase.co'

const supabaseKey = 'sb_publishable_BPqTxp4ipJ9wL5kLyPwmPw_Z2iNvdD3'

export const supabase = createClient(supabaseUrl, supabaseKey)