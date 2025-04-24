import { 
  H1, H2, H3, H4, H5, H6, 
  Paragraph, Lead, Small, Tiny, Text
} from '@/app/components/ui/typography';
import { Container, Section } from '@/app/components/ui/layout';

export default function TypographyTestPage() {
  return (
    <Container>
      <Section>
        <H1>Typography Test Page (H1)</H1>
        <Lead>This page demonstrates all typography components to ensure they work correctly and meet accessibility standards.</Lead>
        
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
            <Paragraph className="mt-4">This is another paragraph with some spacing. The typography system ensures consistent text styling throughout the application.</Paragraph>
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
        </div>
      </Section>
    </Container>
  );
} 