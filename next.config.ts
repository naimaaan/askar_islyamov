import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'standalone',
	trailingSlash: true,
	images: {
		remotePatterns: [],
		unoptimized: false,
	},
}

export default nextConfig
