import Profile from "@/src/components/profile";

interface Props {
  query: {
    profileId: string;
  };
}

const ProfilePage = (props: Props) => {
  // return <Profile profileId={props?.query?.profileId || ""}/>;
    return <Profile profileId={props?.query?.profileId || ""}/>;

};

ProfilePage.getInitialProps = ({ query }: Props) => {
  return { query };
};

export default ProfilePage;
