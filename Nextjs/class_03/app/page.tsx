import Link from "next/link";

export default function Home(){
  return (
    <div className="text-xl font-bold w-screen h-screen flex items-center justify-center">
   <div>
    Task Management
    <br/>

    <Link className="text-md border m-2" href="/signin">SignIn</Link>
    <br/>
     <Link className="text-md border" href="/signup">SignUp</Link>
    <br/>
   </div>



    </div>
  )
}