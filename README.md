# Pull Request Count

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## API

To call the API directly, go to [http://localhost:3000/api/pull-requests?owner=lodash&repo=lodash](http://localhost:3000/api/pull-requests?owner=lodash&repo=lodash)

This will show you the number of pull requests for the lodash repo.

Parameters are:
- owner
  - required
  - the username or org that owns the repo
- repo
  - the repository you wish to count pull requests for
- state
  - optional, defaults to `all`
  - options are `all`', `open`, `closed`

To see the pull requests for any repo, change owner to the owner of a repo and change repo to the name of the repo

## GUI

Alternatively, you can use the GUI on the main page.

Open [http://localhost:3000](http://localhost:3000)

To use the GUI, type in the owner and repo with a slash `/` in between (eg `owner/repo`) and change the state by clicking any of the buttons
