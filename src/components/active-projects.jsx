import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Progress } from "@components/ui/progress";
import { Badge } from "@components/ui/badge";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function ActiveProjects({ urlApi }) {
  const [listActive, setListActive] = useState([]);

  function getProjectActive() {
    axios
      .get(`${urlApi}manager/g/project-active`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setListActive(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getStatusLabel = (progress) => {
    if (progress <= 25) return { label: "Iniciado", color: "bg-blue-500" };
    if (progress <= 75) return { label: "En curso", color: "bg-yellow-500" };
    return { label: "Finalizando", color: "bg-green-500" };
  };

  useEffect(() => {
    getProjectActive();
  }, []);

  return (
    <div className="space-y-6">
      <div className="items-center justify-between">
        <h1 className="text-3xl font-bold">Proyectos activos</h1>
        <p className="text-muted-foreground">
          Gestione sus proyectos internos en curso
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listActive.map((project) => {
          const status = getStatusLabel(project.progress);
          return (
            <Card key={project.id}>
              <CardHeader>
                <div className="items-center justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge className={`${status.color} text-white`}>
                    {status.label}
                  </Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
                <Button
                  // onClick={() => onViewProject(project)}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
