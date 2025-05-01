'use client';

import Link from "next/link";
import { Container } from "@/components/ui/layout/container";
import { useParams } from "next/navigation";

export default function VerifyRequestPage() {
  const params = useParams();
  const lang = params.lang as string;
  
  return (
    <div className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
      <section className='hero bg-gradient-to-br py-24 md:py-32'>
        <div className="hero-content w-full">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full">
              <div className="card card-border border-base-300 bg-base-100 w-96">

                    <div className="card-body p-4">
                      <h1 className="card-title text-xl font-bold">Magic Link Sent!</h1>
                      <p className="mt-2 text-base-content/70">
                        Check your email for the magic link. If you don&apos;t see it, check your spam folder or try a different email.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
                        <Link
                          href={`/${lang}/auth/magic-link`}
                          className="btn btn-outline btn-sm w-full"
                        >
                          Try a different email
                        </Link>
                      </div>
                    </div>
                 
                </div>
              </div>
              {/* intentional for layout spacing: */}
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