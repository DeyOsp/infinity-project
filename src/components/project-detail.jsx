/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Plus, MoreHorizontal, ArrowLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Badge } from "@components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "sonner";

export default function ProjectDetail({
  urlApi,
  project,
  onBack,
  collaborators,
  onProgressChange, // ✅ nueva prop para enviar el porcentaje al padre
}) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssigned, setTaskAssigned] = useState("");

  const [tasks, setTasks] = useState({
    pending: [],
    inProgress: [],
    completed: [],
  });

  function getProjectDetails() {
    axios
      .get(`${urlApi}manager/g/project-details/${project.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const organized = {
          pending: [],
          inProgress: [],
          completed: [],
        };

        response.data.forEach((task) => {
          if (organized[task.status]) {
            organized[task.status].push(task);
          }
        });

        setTasks(organized);

        // ✅ Calcular porcentaje solo para el front
        const total =
          organized.pending.length +
          organized.inProgress.length +
          organized.completed.length;

        const completado = organized.completed.length;
        const porcentaje = total > 0 ? (completado / total) * 100 : 0;

        if (onProgressChange) {
          onProgressChange(Number(porcentaje.toFixed(2)));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleAddTask() {
    const project_task = {
      project_id: project.id,
      title: taskTitle,
      description: taskDescription,
      assigned_to: taskAssigned,
      status: "pending",
    };

    toast.promise(
      axios
        .post(`${urlApi}manager/i/add-project-task`, project_task, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            setTaskTitle("");
            setTaskDescription("");
            setTaskAssigned("");
            getProjectDetails();
            return "Tarea agregada con éxito";
          } else {
            throw new Error(
              "Error al agregar la tarea: " + response.data.message
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

  async function onMoveTask(idTask, statusTask) {
    const moveIn = {
      id: idTask,
      status: statusTask,
    };

    toast.promise(
      axios
        .put(`${urlApi}manager/u/status-task`, moveIn, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            getProjectDetails();
            return "Tarea movida con éxito";
          } else {
            throw new Error("Error al mover la tarea");
          }
        }),
      {
        loading: "Moviendo tarea...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de activación",
      }
    );
  }

  useEffect(() => {
    getProjectDetails();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft /> Volver
        </Button>
        <h1 className="text-3xl font-bold">{project?.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agregar nueva tarea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <div>
              <Label htmlFor="task-name">Nombre de la tarea</Label>
              <Input
                id="task-name"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Describe el proyecto freelance"
              />
            </div>
            <div>
              <Label htmlFor="task-description">Descripción</Label>
              <Input
                id="task-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Descripción de la tarea"
              />
            </div>
            <div>
              <Label htmlFor="task-assignee">Asignado</Label>
              <Select
                value={taskAssigned}
                onValueChange={(value) => setTaskAssigned(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar asignación" />
                </SelectTrigger>
                <SelectContent>
                  {collaborators.map((collaborator) => (
                    <SelectItem key={collaborator.id} value={collaborator.id}>
                      {collaborator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() => handleAddTask()}
            disabled={
              !taskTitle.trim() || !taskDescription.trim() || !taskAssigned
            }
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar tarea
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {["pending", "inProgress", "completed"].map((column) => (
          <Card key={column}>
            <CardHeader>
              <CardTitle className="capitalize">
                {column === "inProgress" ? "In Progress" : column}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks[column].map((task) => (
                <Card key={task.id} className="p-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{task.assigned_to}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {column !== "pending" && (
                            <DropdownMenuItem
                              onClick={() => onMoveTask(task.id, "pending")}
                            >
                              Mover a Pendiente
                            </DropdownMenuItem>
                          )}
                          {column !== "inProgress" && (
                            <DropdownMenuItem
                              onClick={() => onMoveTask(task.id, "inProgress")}
                            >
                              Mover a En progreso
                            </DropdownMenuItem>
                          )}
                          {column !== "completed" && (
                            <DropdownMenuItem
                              onClick={() => onMoveTask(task.id, "completed")}
                            >
                              Mover a Completado
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
