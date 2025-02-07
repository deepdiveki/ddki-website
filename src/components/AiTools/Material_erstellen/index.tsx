import React from "react";
import Material_erstellen from "./Material_erstellen";
import SingleExample from "./SingleExample";

const AiToolExample = () => {
  return (
    <div className="grid gap-7.5 pt-7.5 md:grid-cols-2 lg:grid-cols-3">
      {Material_erstellen.map((example, id) => (
        <SingleExample key={id} example={example} />
      ))}
    </div>
  );
};

export default AiToolExample;
