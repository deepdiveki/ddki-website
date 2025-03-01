import SectionTitle from "@/components/Common/SectionTitle";
import SingleTeam from "./SingleTeam";
import teamData from "./teamData";

const Team = () => {
  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Triff unser Team"
          title="Unser Team"
          paragraph="Wir sind ein junges Team aus Hamburg mit einer Leidenschaft für Künstliche Intelligenz und Bildung. Unsere Vision ist es, KI für alle zugänglich zu machen und den Einsatz von KI im Bildungsbereich zu fördern."
        />

<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-center">
  {teamData.map((team) => (
    <SingleTeam key={team.id} team={team}  />
  ))}
</div>
      </div>
    </section>
  );
};

export default Team;
