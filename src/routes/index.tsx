import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'IdeaHub - Browse Ideas' }],
  }),
  component: App,
});

function App() {
  return <>My App</>;
}
