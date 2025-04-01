import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { vt323 } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import backgroundImage from "@/assets/square_background.png";
import { BsGoogle } from "react-icons/bs";
import db from "@/prisma";

export default function Login() {
  const { data: session, status } = useSession();

  return <div>test</div>;
}
