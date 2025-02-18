import { Team } from "@/types/team";
import Image from "next/image";

const SingleTeam = ({ team }: { team: Team }) => {
  const { name, designation, image } = team;

  return (
    <div className="wow fadeInUp group text-center">
      <div className="team-img-gradient group-hover:before:gradient-3 relative mx-auto mb-7.5 h-50 w-full max-w-50 rounded-full">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover object-center"
        />
      </div>
      <h3 className="mb-2.5 text-heading-6 font-semibold text-white">{name}</h3>
      <p className="mb-6 font-medium">
        {designation.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );

};

export default SingleTeam;