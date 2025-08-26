import Profile from "@/src/components/profile";

interface Props{
  query:{
    deviceUid: string
  }
}

export default function ProfilePage(props:Props) {
  return <Profile deviceUid={props?.query?.deviceUid || ""}/>;
}

ProfilePage.getInitialProps = (({query}:Props)=>{
  return {query}
})