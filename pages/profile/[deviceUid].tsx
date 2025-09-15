import Profile from "@/src/components/profile";
import { q } from "framer-motion/client";

interface Props{
  query:{
    deviceUid: string
  }
}

export default function ProfilePage(props:Props) {
  // return <Profile deviceUid={props?.query?.deviceUid || ""}/>;
  return<h1>Profile {props?.query?.deviceUid}</h1>
}

ProfilePage.getInitialProps = (({query}:Props)=>{
  return {query}
})