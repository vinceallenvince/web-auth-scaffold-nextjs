import { Metadata } from "next";
import MagicLinkForm from "./magic-link-form";
import { Container } from "@/components/ui/layout/container";

export const metadata: Metadata = {
  title: "Magic Link Authentication | Web Auth Scaffold",
  description: "Authenticate with a magic link sent to your email",
};

export default function MagicLinkPage() {
  return (
    <div className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
      <section className='hero bg-gradient-to-br py-24 md:py-32'>
        <div className="hero-content w-full">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full">
                <div className="max-w-md">
                  <MagicLinkForm />
                </div>
              </div>
              <div className="card card-border bg-base-100 w-full">
                <div className="card-body">
                <h1 className="text-3xl font-bold mb-3">Magic Link Login</h1>
                  <p>Secure, convenient authentication without the hassle of passwords</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
} 