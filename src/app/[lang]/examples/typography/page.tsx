import { 
  H1, H2, H3, H4, H5, H6, 
  Paragraph, Lead, Small, Tiny, Text
} from '@/components/ui/typography';
import { PageContainer } from '@/components/ui/layout';
import { Section } from '@/components/ui/layout';

export default function TypographyExamplesPage() {
  return (
    <PageContainer>
      <Section>
        <H1>Typography Examples (H1)</H1>
        <Lead>This page demonstrates all typography components to ensure they work correctly after fixing font loading issues in production builds.</Lead>
        
        <div className="space-y-8 my-8">
          <div>
            <H2>Headings (H2)</H2>
            <H3>Heading Level 3 (H3)</H3>
            <H4>Heading Level 4 (H4)</H4>
            <H5>Heading Level 5 (H5)</H5>
            <H6>Heading Level 6 (H6)</H6>
          </div>
          
          <div>
            <H2>Text Components (H2)</H2>
            <Paragraph>This is a standard paragraph using the Paragraph component. It should be using the base font size of 16px according to accessibility requirements with appropriate line height.</Paragraph>
            <Paragraph className="mt-4">This is another paragraph with some spacing. The typography system has been updated with proper font fallbacks to ensure consistent display in all environments.</Paragraph>
            <Lead className="mt-6">This is a Lead paragraph which is larger and stands out to introduce content sections.</Lead>
            <div className="mt-4">
              <Small>This is Small text which is used for less important information but still maintains readability.</Small>
            </div>
            <div className="mt-4">
              <Tiny>This is Tiny text used for captions or footnotes but still ensures minimum accessibility standards.</Tiny>
            </div>
          </div>
          
          <div>
            <H2>Generic Text Component (H2)</H2>
            <Text variant="normal">This uses the generic Text component with normal variant.</Text>
            <Text variant="lead" className="mt-4">This uses the generic Text component with lead variant.</Text>
            <Text variant="small" className="mt-4">This uses the generic Text component with small variant.</Text>
            <Text variant="tiny" className="mt-4">This uses the generic Text component with tiny variant.</Text>
            <Text as="div" className="mt-4 font-bold">This uses the Text component rendered as a div element.</Text>
          </div>

          <div className="bg-base-200 p-4 rounded-lg">
            <H2>Font Loading Validation</H2>
            <Paragraph>The typography fixes include:</Paragraph>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Fixed circular CSS variable references for fonts</li>
              <li>Added explicit font display strategy ('swap')</li>
              <li>Included explicit fallback fonts in all typography components</li>
              <li>Added font preconnect links for improved performance</li>
              <li>Applied inline font-family styles to ensure proper font loading</li>
            </ul>

            <div className="mt-4 p-4 bg-base-300 rounded-lg font-mono text-sm">
              <code>font-family: var(--font-sans, var(--font-sans-fallback));</code>
            </div>
          </div>
        </div>
      </Section>
    </PageContainer>
  );
} 