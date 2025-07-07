import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export function Collaborators({ urlApi }) {
  const [collaborators, setCollaborators] = useState([]);

  function getCollaborators() {
    axios
      .get(`${urlApi}manager/g/collaborators`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCollaborators(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCollaborators();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Colaboradores</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collaborators.map((collaborator) => (
          <Card key={collaborator.id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {collaborator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold">{collaborator.name}</h3>
                  <Badge variant="secondary">{collaborator.department}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
