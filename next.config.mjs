import withTM from 'next-transpile-modules';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose'
  }
};

export default withTM(['react-leaflet-cluster'])(nextConfig);


