import { useState } from "react";
import { Plus, Eye } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Progress } from "@components/ui/progress";
import { Badge } from "@components/ui/badge";

export function FreelanceProjects({ projects, onAddProject }) {
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const getStatusLabel = (progress) => {
    if (progress <= 25) return { label: "Empezando", color: "bg-blue-500" };
    if (progress <= 75) return { label: "En curso", color: "bg-yellow-500" };
    return { label: "Finalizando", color: "bg-green-500" };
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      onAddProject(newProject);
      setNewProject({ name: "", description: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="items-center justify-between">
        <h1 className="text-3xl font-bold">Proyectos freelance</h1>
        <p className="text-muted-foreground">
          Realice un seguimiento de los proyectos de sus clientes externos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agregar nuevo proyecto freelance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="project-name">Nombre del proyecto</Label>
            <Input
              id="project-name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              placeholder="Introduzca el nombre del proyecto"
            />
          </div>
          <div>
            <Label htmlFor="project-description">Descripción</Label>
            <Textarea
              id="project-description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Describe el proyecto freelance"
            />
          </div>
          <Button
            onClick={handleAddProject}
            disabled={!newProject.name.trim() | !newProject.description.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar proyecto
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const status = getStatusLabel(project.progress);
          return (
            <Card key={project.id}>
              <CardHeader>
                <div className="items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
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
                <Button className="w-full">
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
