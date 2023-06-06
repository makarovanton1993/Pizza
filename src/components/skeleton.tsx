import React from 'react';

import ContentLoader from 'react-content-loader';

function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="140" cy="130" r="130" />
      <rect x="50" y="276" rx="9" ry="9" width="180" height="24" />
      <rect x="0" y="319" rx="24" ry="24" width="280" height="85" />
      <rect x="10" y="416" rx="9" ry="9" width="100" height="33" />
      <rect x="179" y="414" rx="9" ry="9" width="100" height="33" />
    </ContentLoader>
  );
}

export default Skeleton;
