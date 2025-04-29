'use client';

import Link from "next/link";
import { Container } from "@/app/components/ui/layout/container";

export default function VerifyRequestPage() {
  return (
    <div className="flex flex-col">
      <section className='hero bg-gradient-to-br py-24 md:py-32'>
        <div className="hero-content w-full">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full">
                <div className="max-w-md">
                  <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    
                    <div className="card-body p-6">
                      <h1 className="card-title text-xl font-bold">Magic Link Sent!</h1>
                      <p className="mt-2 text-base-content/70">
                        Check your email for the magic link. If you don&apos;t see it, check your spam folder or try a different email.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
                        <Link
                          href="/auth/magic-link"
                          className="btn btn-outline btn-sm w-full"
                        >
                          Try a different email
                        </Link>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="card card-border bg-base-100 w-full">
               <div className="card-body">
                  &nbsp;
                </div>
              </div>
              <div className="w-full">
                &nbsp;
              </div>

            </div>
          </Container>
        </div>
      </section>
    </div>
  );
} 