import { ComponentProps } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import SSRSafeSuspence from '../SSRSafeSuspense';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

export interface AsyncBoundaryProps extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  loadingFallback: ComponentProps<typeof SSRSafeSuspence>['fallback'];
  rejectedFallback: ErrorBoundaryProps['renderFallback'];
}

export default function AsyncBoundary({
  loadingFallback,
  rejectedFallback,
  children,
  ...errorBoundaryProps
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary renderFallback={rejectedFallback} {...errorBoundaryProps}>
      <SSRSafeSuspence fallback={loadingFallback}>{children}</SSRSafeSuspence>
    </ErrorBoundary>
  );
}
