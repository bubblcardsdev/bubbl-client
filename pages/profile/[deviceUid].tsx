import Tap from "@/src/components/tap";

interface Props {
  query: {
    deviceUid: string;
  };
}

export default function ProfilePage(props: Props) {
  return <Tap deviceUid={props?.query?.deviceUid || ""} />;
}


ProfilePage.getInitialProps = ({ query }: Props) => {
  return { query };
};
