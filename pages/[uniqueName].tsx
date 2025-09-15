import Profile from "@/src/components/profile";

interface Props {
  query: {
    uniqueName: string;
  };
}
export default function ProfilePage(props: Props) {
  return <Profile uniqueName={props?.query?.uniqueName || ""}/>;
//   return <h1>Profile {props?.query?.uniqueName}</h1>;
}

ProfilePage.getInitialProps = ({ query }: Props) => {
  return { query };
};
