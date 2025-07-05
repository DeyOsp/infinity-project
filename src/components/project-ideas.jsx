import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// eslint-disable-next-line react/prop-types
export function ProjectIdeas({ projectIdeas, onAddIdea, onActivateIdea }) {
  const [newIdea, setNewIdea] = useState({ title: "", description: "" });

  const handleAddIdea = () => {
    if (newIdea.title && newIdea.description) {
      onAddIdea(newIdea);
      setNewIdea({ title: "", description: "" });
    }
  };

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
              value={newIdea.title}
              onChange={(e) =>
                setNewIdea({ ...newIdea, title: e.target.value })
              }
              placeholder="Introduzca el título del proyecto"
            />
          </div>
          <div>
            <Label htmlFor="idea-description">Descripción</Label>
            <Textarea
              id="idea-description"
              value={newIdea.description}
              onChange={(e) =>
                setNewIdea({ ...newIdea, description: e.target.value })
              }
              placeholder="Describe your project idea"
            />
          </div>
          <Button
            onClick={handleAddIdea}
            disabled={!newIdea.title.trim() || !newIdea.description.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir idea
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectIdeas.map((idea) => (
          <Card key={idea.id}>
            <CardHeader>
              <CardTitle className="text-lg">{idea.title}</CardTitle>
              <CardDescription>{idea.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => onActivateIdea(idea)} className="w-full">
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
