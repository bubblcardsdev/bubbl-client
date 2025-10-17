import PostLoginLayout from "../../src/components/layout/postLoginLayout";
import MyDevice from "../../src/components/mydevice/index"

interface Props {
  query: { [key: string]: string };
}
export default function MyDevicepage() {
  const pageData = {
    title: "MyDevice",
    name: "mydevice",
  };
  return (
    <PostLoginLayout currentPage={pageData}>
      <MyDevice />
    </PostLoginLayout>
  );
}
 
MyDevicepage.getInitialProps = ({ query }: Props) => {
  return { query };
};