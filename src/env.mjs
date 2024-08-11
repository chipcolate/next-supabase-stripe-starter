// @ts-check

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    SUPABASE_DB_PASSWORD: z.string(),

    STRIPE_SECRET_KEY: z.string(),
    STRIPE_CURRENCY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),

    RESEND_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),

    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),

    NEXT_PUBLIC_LANGUAGE: z.string().optional().default('en'),
  },
  runtimeEnv: {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_DB_PASSWORD: process.env.SUPABASE_DB_PASSWORD,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_CURRENCY: process.env.STRIPE_CURRENCY,

    RESEND_API_KEY: process.env.RESEND_API_KEY,

    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

    NEXT_PUBLIC_LANGUAGE: process.env.NEXT_PUBLIC_LANGUAGE,
  },
});

const vercelHost =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;
const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;
const publicUrl = process.env.NEXT_PUBLIC_URL || vercelUrl;

if (!publicUrl) {
  throw new Error('Missing NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL variables!');
}

// force type inference to string
const _publicUrl = publicUrl;
export { _publicUrl as publicUrl };
