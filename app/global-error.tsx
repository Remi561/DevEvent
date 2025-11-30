'use client'

const GlobalError = ({ error }: { error: Error }) => {
  return <div>global-error: {error.message}</div>;
};

export default GlobalError