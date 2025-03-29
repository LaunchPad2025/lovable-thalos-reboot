import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";

const Violations = () => {
  // Mock data for violations
  const violations = [
    { id: 1, name: "John Doe", violation: "Missed training deadline", date: "2023-10-01" },
    { id: 2, name: "Jane Smith", violation: "Incomplete certification", date: "2023-09-15" },
  ];

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle title="Training Violations" />
        <p className="text-muted-foreground">
          Review and manage training violations for compliance purposes.
        </p>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Violation</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((violation) => (
              <tr key={violation.id}>
                <td className="border border-gray-300 px-4 py-2">{violation.name}</td>
                <td className="border border-gray-300 px-4 py-2">{violation.violation}</td>
                <td className="border border-gray-300 px-4 py-2">{violation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
};

export default Violations;
