import React from "react";

const ProcessSection = ({ data }) => {
  // Check for `data.items` instead of `data.steps`
  if (!data || !Array.isArray(data.items)) {
    console.error("ProcessSection: Missing or invalid data format.", data);
    return null;
  }

  return (
    <section className="process-section">
      <h2>{data.heading || data.title || "Our Process"}</h2>
      <p>{data.paragraph || "Learn how we deliver results."}</p>
      <ol className="process-steps">
        {data.items.map((step, index) => (
          <li key={index} className="process-step">
            <h3>{step.name}</h3>
            <p>{step.description}</p>
            {step.featuredImage && <img src={step.featuredImage} alt={step.name} />}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ProcessSection;
