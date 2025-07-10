import { useState, useEffect } from "react";
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

import ProjectIdeas from "@components/project-ideas";
import ActiveProjects from "@components/active-projects";
import FreelanceProjects from "@components/freelance-projects";
import ProjectDetail from "@components/project-detail";
import Collaborators from "@components/collaborators";
import axios from "axios";

export default function Dashboard() {
  const urlApi = "http://localhost:3000/infinity-manager/server/v1/";

  const [activeView, setActiveView] = useState("project-ideas");
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({ status: "all", type: "all" });
  const [collaborators, setCollaborators] = useState([]);
  const [projectProgress, setProjectProgress] = useState({});

  const handleBackToProjects = () => {
    setActiveView("active-projects");
    setSelectedProject(null);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setActiveView("project-detail");
  };

  const handleProgressChange = (projectId, progress) => {
    setProjectProgress((prev) => ({
      ...prev,
      [projectId]: progress,
    }));
  };

  const sidebarItems = [
    {
      id: 1,
      id_name: "project-ideas",
      title: "Ideas de proyectos",
      icon: Lightbulb,
    },
    {
      id: 2,
      id_name: "active-projects",
      title: "Proyectos activos",
      icon: FolderOpen,
    },
    {
      id: 3,
      id_name: "freelance-projects",
      title: "Proyectos freelance",
      icon: Briefcase,
    },
    { id: 4, id_name: "collaborators", title: "Colaboradores", icon: Users },
  ];

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

  const renderContent = () => {
    switch (activeView) {
      case "project-ideas":
        return <ProjectIdeas urlApi={urlApi} />;
      case "active-projects":
        return (
          <ActiveProjects
            urlApi={urlApi}
            onViewDetails={handleViewProject}
            projectProgress={projectProgress}
          />
        );
      case "project-detail":
        return (
          <ProjectDetail
            urlApi={urlApi}
            project={selectedProject}
            onBack={() => handleBackToProjects()}
            collaborators={collaborators}
            onProgressChange={(progress) =>
              handleProgressChange(selectedProject.id, progress)
            }
          />
        );
      case "freelance-projects":
        return (
          <FreelanceProjects
            urlApi={urlApi}
            onViewDetails={handleViewProject}
          />
        );
      case "collaborators":
        return <Collaborators urlApi={urlApi} collaborators={collaborators} />;
      default:
        return <ProjectIdeas urlApi={urlApi} />;
    }
  };

  useEffect(() => {
    getCollaborators();
  }, []);

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
                  <SidebarMenuItem key={item.id_name}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id_name)}
                      isActive={activeView === item.id_name}
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
