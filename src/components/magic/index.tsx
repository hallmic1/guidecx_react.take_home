import { gql } from "@apollo/client";
import { useState } from "react";
import Star from "./star";
import "./magic-page.scss";

export const MagicFragment = gql`
  fragment MagicPage_MagicFragment on Repository {
    id
    description
    name: nameWithOwner
    updatedAt
    url
    viewerHasStarred
    visibility
    issues(first: 10) {
      nodes {
        body
        url
      }
    }
  }
`;
interface Repo {
  id: string;
  description?: string;
  name: string;
  updatedAt: Date;
  url: string;
  visibility: string;
  viewerHasStarred: boolean;
  issues: {
    nodes: (Issues | Repo)[];
  };
}

interface Issues {
  body: string;
  url: string;
}
interface Props {
  repos: Repo[];
}

const MagicPage: React.FC<Props> = ({ repos = [] }) => {
  let [searchTerm, setSearchTerm] = useState("");
  console.log(JSON.stringify(repos, undefined, 2));
  let filteredList = repos.filter((repo) => repo.name.includes(searchTerm));
  return (
    <div className="user-repos flex flex-col mx-8 w-full ">
      <h3 className="text-3xl mb-6 font-semibold">Search</h3>
      <div className="p-4 grid xlg:grid-cols-3 grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-900 rounded shadow-md mb-16">
        <input
          type="text"
          className="col-span-2 p-4 text-2xl bg-white dark:bg-gray-700 shadow-md rounded shadow-md h-full"
          value={searchTerm}
          placeholder="..."
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        {filteredList.length > 0 ? (
          filteredList.map((repo) => (
            <div
              key={repo.id}
              className="flex flex-col justify-center p-4 px-8 border rounded border-gray-700"
            >
              <div className="flex flex-row justify-between items-center">
                <a className="text-2xl" href={repo.url}>
                  {repo.name}
                </a>
                <Star isLiked={repo.viewerHasStarred} id={repo.id} />
              </div>
              <div className="space-x-2 text-thin italic">
                <span>Updated: {new Date(repo.updatedAt).toDateString()}</span>
                <span>Visibility: {repo.visibility}</span>
                {repo.issues.nodes.length > 0 && (
                  <details>
                    <summary>Issues</summary>
                    <ul>
                      {repo.issues.nodes.map((issue: any, index: number) => {
                        return <li key={repo.id + index}>{issue.body}</li>;
                      })}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 justify-center p-4 px-8">
            <p className="text-2xl">No Repos Found</p>
            <div className="space-x-2 text-thin italic">
              <span>Check your filters and try again</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicPage;
