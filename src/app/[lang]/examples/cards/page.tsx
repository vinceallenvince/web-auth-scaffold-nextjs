"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDivider,
  CardGrid
} from "@/components/ui";
import { PageContainer } from "@/components/ui/layout";

export default function CardExamplesPage() {
  
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert('Card clicked!');
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-8">Card Component Examples</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Card Variants</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>This is a default card with no specific variant.</p>
            </CardBody>
            <CardFooter>
              <small>Card footer content</small>
            </CardFooter>
          </Card>
          
          <Card variant="outlined" className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>This card uses the outlined variant with a border.</p>
            </CardBody>
            <CardFooter>
              <small>Card footer content</small>
            </CardFooter>
          </Card>
          
          <Card variant="elevated" className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>This card uses the elevated variant with a shadow effect.</p>
            </CardBody>
            <CardFooter>
              <small>Card footer content</small>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Card Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card color="primary" className="w-full">
            <CardHeader>
              <CardTitle>Primary Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>Card with primary color.</p>
            </CardBody>
          </Card>
          
          <Card color="secondary" className="w-full">
            <CardHeader>
              <CardTitle>Secondary Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>Card with secondary color.</p>
            </CardBody>
          </Card>
          
          <Card color="accent" className="w-full">
            <CardHeader>
              <CardTitle>Accent Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>Card with accent color.</p>
            </CardBody>
          </Card>
          
          <Card color="info" className="w-full">
            <CardHeader>
              <CardTitle>Info Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>Card with info color.</p>
            </CardBody>
          </Card>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Interactive Cards</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Card 
            interactive 
            onClick={handleCardClick} 
            className="w-full md:w-1/2"
          >
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>This card is interactive. Click or press Enter when focused to trigger an action.</p>
            </CardBody>
            <CardFooter>
              <small>Click me or press Enter when focused</small>
            </CardFooter>
          </Card>
          
          <Card 
            interactive 
            variant="elevated" 
            onClick={handleCardClick} 
            className="w-full md:w-1/2"
          >
            <CardHeader>
              <CardTitle>Interactive Elevated Card</CardTitle>
            </CardHeader>
            <CardBody>
              <p>This elevated card is also interactive with hover and focus states.</p>
            </CardBody>
            <CardFooter>
              <small>Click me or press Enter when focused</small>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Card with Divider</h2>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Card with Divider</CardTitle>
          </CardHeader>
          <CardBody>
            <p>This is the content above the divider.</p>
            <CardDivider />
            <p className="mt-2">This is the content below the divider.</p>
          </CardBody>
          <CardFooter>
            <small>Card footer</small>
          </CardFooter>
        </Card>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Card Grid Layout</h2>
        <CardGrid 
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          gap="gap-6"
        >
          {["intro", "features", "pricing", "benefits", "testimonials", "contact"].map((section, index) => (
            <Card key={section} variant={index % 2 === 0 ? "elevated" : "outlined"}>
              <CardHeader>
                <CardTitle>{section.charAt(0).toUpperCase() + section.slice(1)}</CardTitle>
              </CardHeader>
              <CardBody>
                <p>This card is part of a responsive grid layout that adjusts based on screen size.</p>
              </CardBody>
              <CardFooter>
                <small>Card in grid</small>
              </CardFooter>
            </Card>
          ))}
        </CardGrid>
      </section>
    </PageContainer>
  );
} 