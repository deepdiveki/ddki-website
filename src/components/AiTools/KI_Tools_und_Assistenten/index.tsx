import React from "react";
import KI_Tools_und_Assistenten from "./KI_Tools_und_Assistenten";
import SingleExample from "./SingleExample";

const AiToolExample = () => {
  return (
    <div className="grid gap-7.5 pt-7.5 md:grid-cols-2 lg:grid-cols-3">
      {KI_Tools_und_Assistenten.map((example, id) => (
        <SingleExample key={id} example={example} />
      ))}
    </div>
  );
};

export default AiToolExample;
