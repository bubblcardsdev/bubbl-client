// import Profile from "@/src/components/profile";
import Tap from "@/src/components/tap";


interface Props {
  query: {
    deviceUid: string;
  };
}

export default function ProfilePage(props: Props) {
  return <Tap deviceUid={props?.query?.deviceUid || ""} />;
  // return <h1>Profile {props?.query?.deviceUid}</h1>;
}


ProfilePage.getInitialProps = ({ query }: Props) => {
  return { query };
};
