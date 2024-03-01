import { NextRequest, NextResponse } from "next/server";
import { getTotalPullRequests, TotalPullRequestsProps } from "@/lib/GitHubApi";
import getSearchParamsAsObject from "@/lib/getSearchParamsAsObject";

type TotalPullRequestsParams = {
  [P in keyof TotalPullRequestsProps]?: TotalPullRequestsProps[P] 
}

export async function GET(request: NextRequest) {
  const {owner, repo, state} = getSearchParamsAsObject(request.nextUrl.searchParams) as TotalPullRequestsParams;

  if (! owner || ! repo) {
    const missingOwnerText = ! owner ? 'owner param required. ' : '';
    const missingRepoText = ! repo ? 'repo param required.' : '';
    const statusText = `${missingOwnerText}${missingRepoText}`
    return NextResponse.json({}, {status: 400, statusText});
  }

  const validStates = ['all', 'closed', 'open'];
  if (state && ! validStates.includes(state)) {
    const statusText = `state param must be one of: ${validStates.join(', ')}`
    return NextResponse.json({}, {status: 400, statusText})
  }

  const totalPullRequests = await getTotalPullRequests({owner, repo, state})
  return NextResponse.json({ totalPullRequests }, { status: 200 });
}
