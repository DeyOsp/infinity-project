import { useState, useEffect } from "react";
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
import axios from "axios";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
export function FreelanceProjects({ urlApi }) {

  const [listFreelance, setListFreelance] = useState([]);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState("");
  const [freelanceTitle, setFreelanceTitle] = useState("");
  const [freelanceDescription, setFreelanceDescription] = useState("");

  function getProjectFreelance() {
    axios
      .get(`${urlApi}manager/g/project-freelance`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setListFreelance(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const getStatusLabel = (progress) => {
    if (progress <= 25) return { label: "Empezando", color: "bg-blue-500" };
    if (progress <= 75) return { label: "En curso", color: "bg-yellow-500" };
    return { label: "Finalizando", color: "bg-green-500" };
  };

  async function handleAddProjectFreelance() {
    // setLoading(true);
    // setError("");

    const project_freelance = {
      title: freelanceTitle,
      description: freelanceDescription,
      type_id: 2,
      status: "starting",
      activate: 1,
    };

    toast.promise(
      axios
        .post(`${urlApi}manager/i/add-project-freelance`, project_freelance, {
          headers: {
            "Content-Type": "application/json",
            // "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setFreelanceTitle("");
            setFreelanceDescription("");
            // setLoading(false);
            getProjectFreelance();
            return "Proyecto freelance agregado con éxito";
          } else {
            throw new Error(
              "Error al agregar el proyecto freelance: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de guardado",
      }
    );
  }

  useEffect(() => {
    getProjectFreelance();
  }, []);

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
              value={freelanceTitle}
              onChange={(e) => setFreelanceTitle(e.target.value)}
              placeholder="Introduzca el nombre del proyecto"
            />
          </div>
          <div>
            <Label htmlFor="project-description">Descripción</Label>
            <Textarea
              id="project-description"
              value={freelanceDescription}
              onChange={(e) => setFreelanceDescription(e.target.value)}
              placeholder="Describe el proyecto freelance"
            />
          </div>
          <Button
            onClick={handleAddProjectFreelance}
            disabled={!freelanceTitle.trim() | !freelanceDescription.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar proyecto
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listFreelance.map((project) => {
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
