"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/general/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Akshay K M",
    role: "Junior Developer",
    bio: "Akshay is new to web development but eager to learn and explore more!",
    image: "/akshay.jpeg",
    linkedin: "https://www.linkedin.com/in/akshay-k-m-227804304/",
  },
  {
    name: "Anurag Rao U",
    role: "Lead Developer",
    bio: "Anurag is the one that actually gets things to work. He is a backend developer with a passion for coding!",
    image: "anurag.jpeg",
    linkedin: "https://www.linkedin.com/in/anurag-rao-u-0846761b2/",
  },
  {
    name: "S Arjun Sai",
    role: "Junior Developer",
    bio: "Arjun is new to web development and is looking forward to learn new things along the way!",
    image: "arjun.jpeg",
    linkedin: "https://www.linkedin.com/in/arjun-sai/",
  },
];

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <h1 className="text-4xl font-bold text-center py-6">
        Meet Our Team
      </h1>
      <h2 className="text-lg font-light text-muted-foreground text-center max-w-2xl mx-auto mb-6">
        The minds behind IIITB Compass, working tirelessly to make your experience better!
      </h2>
      <div className="flex flex-col justify-center items-center py-4 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage
                    src={member.image}
                    alt={member.name}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-semibold">
                  {member.name}
                </CardTitle>
                <p className="text-muted-foreground">{member.role}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm mb-4">{member.bio}</p>
                <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="bg-[#0A66C2] hover:bg-[#004182] text-white"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect on LinkedIn
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
