import { gql, useQuery } from "@apollo/client";
import React from "react";
import Profile, { UserFragment } from "../../components/profile";
import DefaultLayout from "../../layouts/default";
import MagicPage, { MagicFragment } from "../../components/magic";
const CURRENT_USER = gql`
  query CurrentUser {
    viewer {
      id
      ...Profile_UserFragment
      repositories(first: 50, orderBy: { field: STARGAZERS, direction: DESC }) {
        nodes {
          id
          ...MagicPage_MagicFragment
        }
      }
    }
  }

  ${UserFragment}
  ${MagicFragment}
`;

const Magic: React.FC = () => {
  const { data } = useQuery(CURRENT_USER);

  return (
    <DefaultLayout className="app-container">
      <div className="h-full flex flex-row">
        <div className="pt-3 w-1/4">
          <Profile user={data?.viewer} />
        </div>
        <MagicPage repos={data?.viewer?.repositories?.nodes || []} />{" "}
        {/*change to my page */}
      </div>
    </DefaultLayout>
  );
};

export default Magic;
