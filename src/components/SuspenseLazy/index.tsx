import {Suspense, lazy, ComponentType} from 'react';

const SuspenseLazy = (loader: () => Promise<{default: ComponentType<any>}>) => {
    const LazyComponent = lazy(loader);

    return (
        <Suspense fallback={<></>}>
            <LazyComponent />
        </Suspense>
    );
};

export default SuspenseLazy;
