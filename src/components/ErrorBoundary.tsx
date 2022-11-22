import { PostgrestError } from '@supabase/supabase-js';
import React, { ErrorInfo } from 'react';

export interface ErrorType extends PostgrestError, Error {
  errorCode?: string;
  errorMessage?: string;
}

interface RenderFallbackProps {
  error: ErrorType;
}

type ErrorBoundaryProps = {
  children: React.ReactNode;
  renderFallback: (props: RenderFallbackProps) => React.ReactNode;
};

interface ErrorBoundaryState {
  error: ErrorType | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: ErrorType) {
    return { error };
  }

  componentDidCatch(error: ErrorType, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return this.props.renderFallback({ error: this.state.error });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
