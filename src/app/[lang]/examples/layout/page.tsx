import { Container, Grid, GridItem, Section, Divider, Spacer, Stack } from '@/components/ui/layout';

export default function LayoutExamplesPage() {
  return (
    <div className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
      <Section size="md" container>
        <h1 className="text-3xl font-bold mb-4">Layout Components</h1>
        <p className="text-lg mb-8">This page demonstrates the various layout components available in the application.</p>
      </Section>
      
      <Divider />
      
      <Section size="lg">
        <Container>
          <h2 className="text-2xl font-semibold mb-4">Container Component</h2>
          <p className="mb-4">The container provides consistent horizontal padding and max-width.</p>
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
            This content is wrapped in a container.
          </div>
        </Container>
      </Section>
      
      <Divider />
      
      <Section size="lg" container>
        <h2 className="text-2xl font-semibold mb-4">Grid Component</h2>
        <p className="mb-4">The grid component provides a responsive grid layout.</p>
        
        <h3 className="text-xl font-medium mb-2">2-Column Grid</h3>
        <Grid cols={2} className="mb-8">
          <GridItem className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            Grid Item 1
          </GridItem>
          <GridItem className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            Grid Item 2
          </GridItem>
        </Grid>
        
        <h3 className="text-xl font-medium mb-2">3-Column Grid</h3>
        <Grid cols={3} className="mb-8">
          <GridItem className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            Grid Item 1
          </GridItem>
          <GridItem className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            Grid Item 2
          </GridItem>
          <GridItem className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            Grid Item 3
          </GridItem>
        </Grid>
        
        <h3 className="text-xl font-medium mb-2">Grid with Different Column Spans</h3>
        <Grid cols={4} className="mb-8">
          <GridItem span={2} className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            Spans 2 columns
          </GridItem>
          <GridItem className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            1 column
          </GridItem>
          <GridItem className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            1 column
          </GridItem>
          <GridItem span="full" className="p-4 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800">
            Spans full width
          </GridItem>
        </Grid>
      </Section>
      
      <Divider />
      
      <Section size="lg" container>
        <h2 className="text-2xl font-semibold mb-4">Section Component</h2>
        <p className="mb-4">The section component provides consistent vertical spacing.</p>
        
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-4">
          <h3 className="text-xl font-medium">This is a section with container=true</h3>
          <p>The section wraps its content in a container.</p>
        </div>
        
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-xl font-medium">Section Sizes</h3>
          <p>Sections come in different sizes: sm, md, lg, xl.</p>
        </div>
      </Section>
      
      <Section size="sm" className="bg-purple-100 dark:bg-purple-900">
        <Container>
          <p>This is a small section.</p>
        </Container>
      </Section>
      
      <Section size="md" className="bg-purple-200 dark:bg-purple-800">
        <Container>
          <p>This is a medium section.</p>
        </Container>
      </Section>
      
      <Section size="lg" className="bg-purple-300 dark:bg-purple-700">
        <Container>
          <p>This is a large section.</p>
        </Container>
      </Section>
      
      <Divider />
      
      <Section size="lg" container>
        <h2 className="text-2xl font-semibold mb-4">Spacing Components</h2>
        
        <h3 className="text-xl font-medium mb-2">Spacer Component</h3>
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800">
          <p>Content before spacer</p>
          <Spacer size="md" />
          <p>Content after spacer</p>
        </div>
        
        <Spacer size="lg" />
        
        <h3 className="text-xl font-medium mb-2">Stack Component</h3>
        <Stack space="md" className="p-4 bg-red-100 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800 mb-4">
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Item 1</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Item 2</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Item 3</div>
        </Stack>
        
        <Stack space="md" direction="row" className="p-4 bg-red-100 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800">
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Item 1</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Item 2</div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">Item 3</div>
        </Stack>
      </Section>
    </div>
  );
} 