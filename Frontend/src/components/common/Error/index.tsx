import { Wrapper } from './style';

import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('error: ', error);
    // It will update the state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // It will catch errors in any component below. You can also log the error to an error reporting service.
    console.error('Error info:', info);
    console.error('Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <div className="heading">
            <h1>Oops, Something is wrong ...</h1>
            <h3>Please Refresh</h3>
            <a href="/">
              <button className="glow-on-hover" type="button">
                Go Back
              </button>
            </a>
          </div>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}
