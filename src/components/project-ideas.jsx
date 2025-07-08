import { useState, useEffect } from "react";
import { Plus, ArrowRight } from "lucide-react";
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
import axios from "axios";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
export default function ProjectIdeas({ urlApi }) {
  const [listIdeas, setListIdeas] = useState([]);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState("");
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");

  function getProjectIdea() {
    axios
      .get(`${urlApi}manager/g/project-idea`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setListIdeas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleAddProjectIdea() {
    // setLoading(true);
    // setError("");

    const project_idea = {
      title: ideaTitle,
      description: ideaDescription,
      type_id: 1,
    };

    toast.promise(
      axios
        .post(`${urlApi}manager/i/add-project-idea`, project_idea, {
          headers: {
            "Content-Type": "application/json",
            // "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setIdeaTitle("");
            setIdeaDescription("");
            // setLoading(false);
            getProjectIdea();
            return "Idea agregada con éxito";
          } else {
            throw new Error(
              "Error al agregar la idea: " + response.data.message
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

  async function handleActivateProject(idActivate) {
    // if (!idActivate) {
    //   setError("No hay un curso válido para actualizar");
    //   return;
    // }

    // setLoading(true);
    // setError("");

    const activate = {
      id: idActivate,
    };

    toast.promise(
      axios
        .put(`${urlApi}manager/u/active-idea`, activate, {
          headers: {
            "Content-Type": "application/json",
            // "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            // setLoading(false);
            getProjectIdea();
            return "Idea activada con éxito";
          } else {
            throw new Error("Error al activar la idea");
          }
        }),
      {
        loading: "Activando idea...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de activación",
      }
    );
  }

  const handleConfirmDelete = (idActivate) => {
  const confirmed = window.confirm("¿Estás seguro de eliminar este elemento?");
  if (confirmed) {
    handleActivateProject(idActivate)
  }
};

  useEffect(() => {
    getProjectIdea();
  }, []);

  return (
    <div className="space-y-6">
      <div className="items-center justify-between">
        <h1 className="text-3xl font-bold">Ideas de proyectos</h1>
        <p className="text-muted-foreground">
          Transforma tus ideas en proyectos activos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Añadir nueva idea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="idea-title">Título</Label>
            <Input
              id="idea-title"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              placeholder="Introduzca el título del proyecto"
            />
          </div>
          <div>
            <Label htmlFor="idea-description">Descripción</Label>
            <Textarea
              id="idea-description"
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              placeholder="Describe your project idea"
            />
          </div>
          <Button
            onClick={handleAddProjectIdea}
            disabled={!ideaTitle.trim() || !ideaDescription.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir idea
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* eslint-disable-next-line react/prop-types */}
        {listIdeas.map((idea) => (
          <Card key={idea.id}>
            <CardHeader>
              <CardTitle className="text-lg">{idea.title}</CardTitle>
              <CardDescription>{idea.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleConfirmDelete(idea.id)}
                className="w-full"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Activar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
