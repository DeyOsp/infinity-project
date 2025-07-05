import { useState } from "react";
import { Users, Lightbulb, FolderOpen, Briefcase, Filter } from "lucide-react";

import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";

import { ProjectIdeas } from "@components/project-ideas";
import { ActiveProjects } from "@components/active-projects";
import { FreelanceProjects } from "@components/freelance-projects";
import { ProjectDetail } from "@components/project-detail";
import { Collaborators } from "@components/collaborators";

// Sample data
const initialProjectIdeas = [
  {
    id: 1,
    title: "Programador de tareas con tecnología de IA",
    description:
      "Un sistema de programación de tareas inteligente que aprende del comportamiento del usuario",
  },
  {
    id: 2,
    title: "Pizarra colaborativa",
    description: "Pizarra colaborativa en tiempo real para equipos remotos",
  },
  {
    id: 3,
    title: "Rastreador de gastos inteligente",
    description: "Seguimiento automatizado de gastos con escaneo de recibos",
  },
];

const initialActiveProjects = [
  {
    id: 1,
    name: "Plataforma de E-commerce",
    description: "Tienda online moderna con funciones avanzadas",
    progress: 65,
    type: "internal",
  },
  {
    id: 2,
    name: "Aplicación de banca móvil",
    description: "Solución de banca móvil segura",
    progress: 30,
    type: "internal",
  },
  {
    id: 3,
    name: "Panel de control de atención médica",
    description: "Sistema de gestión de pacientes",
    progress: 85,
    type: "internal",
  },
];

const initialFreelanceProjects = [
  {
    id: 1,
    name: "Sitio web del restaurante",
    description: "Sitio web de restaurante moderno con pedidos en línea",
    progress: 45,
    type: "freelance",
  },
  {
    id: 2,
    name: "Sitio de portafolio",
    description: "Portafolio personal para un fotógrafo",
    progress: 90,
    type: "freelance",
  },
];

const collaborators = [
  { id: 1, name: "Deymer Ospina", role: "Frontend Developer" },
  { id: 2, name: "Daniel Muñoz", role: "Backend Developer" },
];

const initialTasks = {
  pending: [
    {
      id: 1,
      name: "Diseño de interfaz de usuario",
      description: "Crear maquetas para el panel principal",
      assignee: "Deymer Ospina",
    },
  ],
  inProgress: [
    {
      id: 2,
      name: "Implementar la autenticación",
      description: "Agregar inicio de sesión y registro de usuario",
      assignee: "Deymer Ospina",
    },
  ],
  completed: [
    {
      id: 3,
      name: "Configuración del proyecto",
      description: "Inicializar la estructura del proyecto",
      assignee: "Deymer Ospina",
    },
  ],
};

export default function Dashboard2() {
  const [activeView, setActiveView] = useState("project-ideas");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectIdeas, setProjectIdeas] = useState(initialProjectIdeas);
  const [activeProjects, setActiveProjects] = useState(initialActiveProjects);
  const [freelanceProjects, setFreelanceProjects] = useState(
    initialFreelanceProjects
  );
  const [tasks, setTasks] = useState(initialTasks);
  const [filters, setFilters] = useState({ status: "all", type: "all" });

  const getStatusLabel = (progress) => {
    if (progress <= 25) return { label: "Empezando", color: "bg-blue-500" };
    if (progress <= 75) return { label: "En curso", color: "bg-yellow-500" };
    return { label: "Finalizando", color: "bg-green-500" };
  };

  const handleAddProjectIdea = (idea) => {
    setProjectIdeas([
      ...projectIdeas,
      {
        id: Date.now(),
        title: idea.title,
        description: idea.description,
      },
    ]);
  };

  const handleActivateIdea = (idea) => {
    setActiveProjects([
      ...activeProjects,
      {
        id: Date.now(),
        name: idea.title,
        description: idea.description,
        progress: 0,
        type: "internal",
      },
    ]);
    setProjectIdeas(projectIdeas.filter((p) => p.id !== idea.id));
  };

  const handleAddFreelanceProject = (project) => {
    setFreelanceProjects([
      ...freelanceProjects,
      {
        id: Date.now(),
        name: project.name,
        description: project.description,
        progress: 0,
        type: "freelance",
      },
    ]);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setActiveView("project-detail");
  };

  const handleAddTask = (task) => {
    setTasks({
      ...tasks,
      pending: [
        ...tasks.pending,
        {
          id: Date.now(),
          name: task.name,
          description: task.description,
          assignee: task.assignee,
        },
      ],
    });
  };

  const handleMoveTask = (taskId, fromColumn, toColumn) => {
    const task = tasks[fromColumn].find((t) => t.id === taskId);
    if (task) {
      setTasks({
        ...tasks,
        [fromColumn]: tasks[fromColumn].filter((t) => t.id !== taskId),
        [toColumn]: [...tasks[toColumn], task],
      });
    }
  };

  const handleBackToProjects = () => {
    setActiveView("active-projects");
    setSelectedProject(null);
  };

  const filteredActiveProjects = activeProjects.filter((project) => {
    if (filters.status !== "all") {
      const status = getStatusLabel(project.progress)
        .label.toLowerCase()
        .replace(" ", "-");
      if (filters.status !== status) return false;
    }
    if (filters.type !== "all" && filters.type !== project.type) return false;
    return true;
  });

  const filteredFreelanceProjects = freelanceProjects.filter((project) => {
    if (filters.status !== "all") {
      const status = getStatusLabel(project.progress)
        .label.toLowerCase()
        .replace(" ", "-");
      if (filters.status !== status) return false;
    }
    return true;
  });

  const sidebarItems = [
    { id: "project-ideas", title: "Ideas de proyectos", icon: Lightbulb },
    { id: "active-projects", title: "Proyectos activos", icon: FolderOpen },
    { id: "freelance-projects", title: "Proyectos freelance", icon: Briefcase },
    { id: "collaborators", title: "Colaboradores", icon: Users },
  ];

  const renderContent = () => {
    switch (activeView) {
      case "project-ideas":
        return (
          <ProjectIdeas
            projectIdeas={projectIdeas}
            onAddIdea={handleAddProjectIdea}
            onActivateIdea={handleActivateIdea}
          />
        );
      case "active-projects":
        return (
          <ActiveProjects
            projects={filteredActiveProjects}
            onViewProject={handleViewProject}
          />
        );
      case "project-detail":
        return (
          <ProjectDetail
            project={selectedProject}
            tasks={tasks}
            collaborators={collaborators}
            onAddTask={handleAddTask}
            onMoveTask={handleMoveTask}
            onBack={handleBackToProjects}
          />
        );
      case "freelance-projects":
        return (
          <FreelanceProjects
            projects={filteredFreelanceProjects}
            onAddProject={handleAddFreelanceProject}
          />
        );
      case "collaborators":
        return <Collaborators collaborators={collaborators} />;
      default:
        return (
          <ProjectIdeas
            projectIdeas={projectIdeas}
            onAddIdea={handleAddProjectIdea}
            onActivateIdea={handleActivateIdea}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold">Infinity Manager</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-3 px-2">
              <div>
                <Label htmlFor="status-filter" className="text-xs">
                  Estado
                </Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="starting">Empezando</SelectItem>
                    <SelectItem value="in-progress">En curso</SelectItem>
                    <SelectItem value="finalizing">Finalizando</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type-filter" className="text-xs">
                  Tipo
                </Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) =>
                    setFilters({ ...filters, type: value })
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="internal">Interno</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex-1 p-6">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
