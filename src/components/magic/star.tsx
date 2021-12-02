import { gql, useMutation } from "@apollo/client";

//wanted to add removing and adding stars, doesnt seem to want to work,
//I can manually add the id into the mutation and it works, but using
//a variable throws errors.

const ADD_STAR = gql`
  mutation StarMutation($repoID: String!) {
    addStar(input: { starrableId: $repoID }) {
      starrable {
        id
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation StarMutation($repoID: String!) {
    __typename
    removeStar(input: { starrableId: $repoID }) {
      starrable {
        id
      }
    }
  }
`;
interface StarInterface {
  isLiked: boolean;
  id: any; //should be string? can't pass it to apollo, I'm sure theres some way to
  //convert from string to apollos types
}
const Star: React.FC<StarInterface> = ({ isLiked, id }) => {
  const [
    addStar,
    //{ data: addStarData, loading: addStarLoading, error: addStarError },
  ] = useMutation(ADD_STAR);
  const [
    removeStar,
    // { data: removeStarData, loading: removeStarLoading, error: removeStarError },
  ] = useMutation(REMOVE_STAR);
  console.log(typeof id);
  if (isLiked) {
    return (
      <button onClick={() => removeStar(id)} disabled={true}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    );
  }
  return (
    <button onClick={() => addStar(id)} disabled={true}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </button>
  );
};
export default Star;
