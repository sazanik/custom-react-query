import { QueryClient, QueryClientProvider, useQuery } from './miniReactQuery';
import { sleepToShowLoadingStates } from './miniReactQuery/utils';

function useMediaDevices() {
  return useQuery({
    queryKey: ['mediaDevices'],
    queryFn: async () => {
      await sleepToShowLoadingStates(500);
      return navigator.mediaDevices.enumerateDevices();
    },
  });
}

function MediaDevices() {
  const { data, status } = useMediaDevices();

  if (status === 'pending') {
    return <div>loading...</div>;
  }
  if (status === 'error') {
    return <div>We were unable to access your media devices</div>;
  }

  console.log(data);

  return <div>You have {data.length} media devices</div>;
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaDevices />
    </QueryClientProvider>
  );
}
