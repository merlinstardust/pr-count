'use client';
import { useEffect, useState } from "react";
import { getTotalPullRequests, PullRequestState } from "@/lib/GitHubApi";
import styles from "./page.module.css";

const pullRequestStates = ['all', 'open', 'closed'];

function capitalize(string: string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`
}

export default function Home() {
  const [ownerAndRepo, setOwnerAndRepo] = useState('lodash/lodash')
  const [pullRequestState, setPullRequestState] = useState<PullRequestState>('all');
  const [totalPullRequests, setTotalPullRequests] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ownerAndRepo) {
        const [owner, repo] = ownerAndRepo.split('/');
        getTotalPullRequests({owner, repo, state: pullRequestState})
          .then((total) => setTotalPullRequests(total))
      }
    }, 1000)
    return () => clearTimeout(timer);
  }, [ownerAndRepo, pullRequestState])

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className="row">
          <input 
            type="text" 
            value={ownerAndRepo} 
            onChange={(event) => setOwnerAndRepo(event.target.value)}
          />
        </div>
        <div className="row">
          {pullRequestStates.map(prState =>
            <button 
              key={prState} 
              className={pullRequestState === prState ? styles.active : styles.inactive}
              disabled={pullRequestState === prState}
              onClick={() => setPullRequestState(prState as PullRequestState)}
            >
              {capitalize(prState)}
            </button>
          )}
        </div>
        <div className="row">
          <p className={styles.total}>
            Total Pull Requests:
            <br />
            {totalPullRequests}
          </p>
        </div>
      </div>
    </main>
  );
}
