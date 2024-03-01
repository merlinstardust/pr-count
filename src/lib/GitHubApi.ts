import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import getSearchParamsAsObject from "@/lib/getSearchParamsAsObject";

const OctokitWithPlugins = Octokit.plugin(restEndpointMethods);

const octokit = new OctokitWithPlugins();

type GitHubApiRequiredProps = {
  owner: string,
  repo: string,
}

export type TotalPullRequestsProps = GitHubApiRequiredProps & {
  state?: 'all' | 'closed' | 'open'
}

export async function getTotalPullRequests({owner, repo, state = 'all'}: TotalPullRequestsProps) {
  const pullRequestsResponse = await octokit.rest.pulls.list({
    owner, 
    repo,
    state,
    per_page: 1,
  });

  // If there's a link in headers, the first page will have a next link and a last link.
  // Since each page only has one result, the last page number is the number of PRs.
  // rel="next" and rel="last" should be in order
  if (pullRequestsResponse.headers.link) {
    const [, last] = pullRequestsResponse.headers.link.split(',');
    const [bracketedUrl] = last.trim().split(';');
    const urlString = bracketedUrl.replace(/[<>]/g, '');
    const url = new URL(urlString);
    const {page} = getSearchParamsAsObject(url.searchParams)

    return Number(page);
  }

  // If there's no link and either no data or data has length of 0,
  // Then there are no PRs on this repository.
  if (!pullRequestsResponse.data || pullRequestsResponse.data.length === 0) {
    return 0;
  }

  // If there's no link, but there is data, its length must be 1
  // Thus there is 1 PR on the repository
  return 1;
};
