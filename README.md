This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Folder Structure
```
.
├── components               # Any global and reusable components
├── hooks                    # Custom hooks
├── lib                      # Configuration & initialization for libraries
│   ├── firebase             # Configuration for firebase (auth)
│   └── graphql              # GraphQL config (SSR & Client) & Queries
├── pages                    # Web pages, routing using [Next's router] (https://nextjs.org/docs/routing/introduction)
├── public                   # Default Next's public folder.
│   └── assets               # Static images
└── styles                   # Global styling using SCSS & Chakra Theme

pages
├── ...
├── component's name
│   └── components           # Component for specific page. Can be use for reusability or to avoid fat parent component
└── ...
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
